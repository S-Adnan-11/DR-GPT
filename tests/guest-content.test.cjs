const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const babel = require('@babel/core'), React = require('react');
const { convertLibrary, prepareGuestContent, TOPICS, imageId } = require('../scripts/guest-content.cjs');
const { validateCatalog, searchGuides, selectPublicCatalog } = require('../src/catalog/catalog');
const base = require('../src/catalog/catalog.json');
const root = path.resolve(__dirname, '..');
const converted = convertLibrary(root);
const catalog = () => ({ ...base, guides: [...base.guides, ...converted.map((item) => item.guide)] });

test('every catalog guide saves and resolves by the same ID after relaunch alongside facility and checklist data', async () => {
  const { createGuestStore } = require('../src/guest/store');
  const { createRouter, HOME } = require('../src/guest/router');
  const current=catalog();let raw=null;
  const options={catalog:current,assertEnabled(){},storage:{async getItem(){return raw;},async setItem(key,value){raw=value;}}};
  const first=createGuestStore(options);
  await first.toggle('facilities','fixture-harbour-clinic-b');await first.toggle('checklist','question-2');
  for(const guide of current.guides) await first.toggle('guides',guide.id);
  const again=await createGuestStore(options).load();
  assert.deepEqual(again.guides,current.guides.map((guide)=>guide.id));
  assert.deepEqual(again.facilities,['fixture-harbour-clinic-b']);assert.deepEqual(again.checklist,['question-2']);
  const router=createRouter(current),parent=router.navigate([HOME],{name:'saved'});
  for(const id of again.guides) {
    const history=router.navigate(parent,{name:'guide',id});
    assert.equal(history.at(-1).id,id);assert.equal(router.activeTab(history.at(-1),history),'saved');
    assert.deepEqual(router.back(history),parent);
  }
});

test('all 24 legacy topics and the visit collection resolve by unique stable IDs', () => {
  const current = validateCatalog(catalog());
  assert.equal(current.guides.length, 27);
  assert.deepEqual(current.guides[0], base.guides[0]);
  assert.equal(new Set(current.guides.map((guide) => guide.id)).size, 27);
  assert.deepEqual(current.guides.slice(base.guides.length).map((guide) => guide.id).sort(), Object.values(TOPICS).map(([id]) => id).sort());
  assert.deepEqual(current.firstAid, base.firstAid);
  assert.deepEqual(selectPublicCatalog(current).guides, base.guides);
});

// Independently compile the retained JSX to a React tree, without mounting it or
// invoking legacy handlers. Compare every rendered text leaf and image in order.
test('conversion preserves every original rendered text leaf and image occurrence in order', () => {
  const Card = Object.assign(function Card() {}, { Cover: 'Image', Content: 'View', Actions: 'View' });
  for (const item of converted) {
    const filename = path.join(root, item.guide.legacy.sourcePath);
    const code = babel.transformSync(fs.readFileSync(filename, 'utf8'), { configFile: false, babelrc: false,
      plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs'] }).code;
    const exports = {};
    const load = (name) => {
      if (name === 'react') return React;
      if (name === 'react-native') return { ScrollView:'View', View:'View', Text:'Text', ImageBackground:'Image', TouchableOpacity:'View', Linking:{openURL(){throw Error('Legacy action ran');}}, StyleSheet:{create:(value)=>value} };
      if (name === 'react-native-paper') return { Card, Title:'Text', Paragraph:'Text', Button:'Text' };
      if (name.startsWith('../../../assets/')) return path.relative(root, path.resolve(path.dirname(filename), name)).replace(/\\/g, '/');
      throw Error(`Unexpected legacy import: ${name}`);
    };
    vm.runInNewContext(code, { exports, require:load }, { filename });
    const original = [];
    function visit(element) {
      if (!React.isValidElement(element)) return;
      if (element.type === 'Image') original.push({ imageId:imageId(element.props.source) });
      if (element.type === 'Text') {
        const text = React.Children.toArray(element.props.children).join('').trim();
        if (text) original.push({ text });
      } else React.Children.forEach(element.props.children, visit);
    }
    visit(exports.default());
    const actual = item.guide.body.flatMap((block) => block.type === 'image' ? [{imageId:block.imageId}]
      : block.type === 'list' ? block.items.map((text)=>({text})) : [{text:block.text}]);
    assert.deepEqual(actual, original, item.guide.id);
  }
});

test('metadata search combines with categories and clear values restore all guides', () => {
  const guides = catalog().guides;
  assert.deepEqual(searchGuides(guides, ' INSOMNIA ').map((guide)=>guide.id), ['sleep-health']);
  assert.deepEqual(searchGuides(guides, 'sleep', 'Life stages'), []);
  assert.equal(searchGuides(guides, '', 'Life stages').length, 5);
  assert.equal(searchGuides(guides, '').length, 27);
  assert.equal(searchGuides(guides, 'nothing-matches').length, 0);
});

test('malformed IDs and unknown article blocks or images cannot enter the catalog', () => {
  for (const id of ['', 'with spaces', '../escape', 'x'.repeat(129), null]) {
    const current=catalog(); current.guides=[{...current.guides[3],id}]; assert.throws(()=>validateCatalog(current),/IDs/);
  }
  for (const block of [null, {type:'script',text:'x'}, {type:'list',items:[]}, {type:'paragraph',text:''}, {type:'image',imageId:'unknown',alt:'x',fit:'contain'}]) {
    const current=catalog();current.guides=[{...current.guides[3],body:[block]}];assert.throws(()=>validateCatalog(current),/body/);
  }
  const duplicate=catalog();duplicate.guides.push(duplicate.guides[1]);assert.throws(()=>validateCatalog(duplicate),/unique/);
});

test('private staging uses original image paths, preserves bytes and does not rewrite unchanged content', () => {
  const result = prepareGuestContent(root), before=fs.statSync(result.dataFile).mtimeMs;
  assert.ok(result.dataFile.startsWith(path.join(root,'.expo')));
  prepareGuestContent(root);assert.equal(fs.statSync(result.dataFile).mtimeMs,before);
  for (const relative of result.assets) assert.ok(fs.existsSync(path.join(root,relative)),relative);
  for (const {guide} of converted) {
    assert.equal(guide.review.status,'draft');assert.equal(guide.review.reviewedAt,null);
    for (const source of guide.sources) assert.equal(source.status,'legacy-unverified');
    for (const block of guide.body.filter((block)=>block.type==='image')) assert.ok(guide.images.includes(block.imageId));
  }
});
