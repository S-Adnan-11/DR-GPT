const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const babel = require('@babel/core');

// Stable topic IDs from the original library inventory. Do not derive IDs from titles.
const TOPICS = {
  GeneralHealth: ['general-health', 'Wellbeing'], MentalHealth: ['mental-health', 'Wellbeing', 'mental'],
  Nutrition: ['nutrition', 'Wellbeing', 'nutrition'], Fitness: ['fitness', 'Wellbeing', 'fitness'],
  Drugs: ['medicines', 'Care & medicines'], DiseaseManagement: ['disease-management', 'Care & medicines'],
  HealthNews: ['health-news', 'Health & society'], Parenting: ['parenting', 'Life stages'],
  WomensHealth: ['womens-health', 'Life stages'], MensHealth: ['mens-health', 'Life stages'],
  SeniorHealth: ['senior-health', 'Life stages'], AlternativeMedicine: ['alternative-medicine', 'Care & medicines'],
  BreathingHeartHealth: ['heart-breathing', 'Wellbeing'], TeethOralHealth: ['oral-health', 'Wellbeing'],
  EnvironmentalHealth: ['environmental-health', 'Health & society'], SexEmotionalHealth: ['sexual-health', 'Wellbeing'],
  TelemedicineTelehealth: ['telehealth', 'Care & medicines'], ImmuneInfectiousDiseases: ['immune-health', 'Care & medicines'],
  SleepHealth: ['sleep-health', 'Wellbeing', 'sleep'], AddictionRecovery: ['addiction-recovery', 'Care & medicines'],
  GeneticsMedicine: ['genetics', 'Health & society'], WorkplaceHealth: ['workplace-health', 'Health & society'],
  AlternativeTherapies: ['alternative-therapies', 'Care & medicines'], HealthyAging: ['healthy-aging', 'Life stages'],
};
const imageId = (relative) => `legacy-${relative.replace(/^assets\//, '').toLowerCase().replace(/[/.]/g, '-')}`;
const parse = (text) => babel.parseSync(text, { configFile: false, babelrc: false, parserOpts: { plugins: ['jsx'] } });
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (visit(node) === false) return;
  for (const [key, value] of Object.entries(node)) {
    if (['loc', 'comments', 'tokens'].includes(key)) continue;
    if (Array.isArray(value)) value.forEach((child) => walk(child, visit));
    else if (value && typeof value === 'object') walk(value, visit);
  }
}
function tag(node) {
  const name = node.openingElement.name;
  return name.type === 'JSXIdentifier' ? name.name : `${name.object.name}.${name.property.name}`;
}
// Match JSX's rendered whitespace. Preserve punctuation, words and list markers.
function jsxText(value) {
  const lines = value.split(/\r\n|\n|\r/);
  let last = 0;
  lines.forEach((line, i) => { if (/[^ \t]/.test(line)) last = i; });
  return lines.map((line, i) => {
    let text = line.replace(/\t/g, ' ');
    if (i) text = text.replace(/^ +/, '');
    if (i !== lines.length - 1) text = text.replace(/ +$/, '');
    return text && i !== last ? text + ' ' : text;
  }).join('');
}
function textOf(node) {
  return node.children.map((child) => {
    if (child.type === 'JSXText') return jsxText(child.value);
    if (child.type === 'JSXExpressionContainer' && child.expression.type === 'JSXEmptyExpression') return '';
    if (child.type === 'JSXExpressionContainer' && child.expression.type === 'StringLiteral') return child.expression.value;
    throw new Error('Unsupported article text structure; inspect it before conversion.');
  }).join('').trim();
}
function attribute(node, name) { return node.openingElement.attributes.find((item) => item.name?.name === name)?.value; }
function originalAsset(root, filename, request) {
  const relative = path.relative(root, path.resolve(path.dirname(filename), request)).replace(/\\/g, '/');
  if (!relative.startsWith('assets/LibraryPhotos/') || !fs.existsSync(path.join(root, relative))) throw new Error(`Missing original article image: ${relative}`);
  return relative;
}
function convertArticle(root, route, metadata) {
  const sourcePath = `src/screens/MedicalLibrary/${route}.js`, filename = path.join(root, sourcePath);
  const source = fs.readFileSync(filename, 'utf8'), ast = parse(source);
  const body = [], text = [], assets = [], sources = [];
  const addSource = (url, title = url) => { if (!sources.some((item) => item.url === url)) sources.push({ title, url, status: 'legacy-unverified' }); };
  let article;
  walk(ast, (node) => {
    if (node.type === 'JSXElement' && tag(node) === 'ScrollView') { if (article) throw new Error('Multiple articles require inspection.'); article = node; return false; }
    if (node.type === 'CallExpression' && node.callee.property?.name === 'openURL') {
      if (node.arguments[0]?.type !== 'StringLiteral') throw new Error('Nonstatic legacy destination.');
      addSource(node.arguments[0].value);
    }
  });
  if (!article) throw new Error(`No active article in ${sourcePath}`);
  walk(article, (node) => {
    if (node.type !== 'JSXElement') return;
    const name = tag(node);
    if (['ImageBackground', 'Image', 'Card.Cover'].includes(name)) {
      const call = attribute(node, 'source')?.expression;
      if (call?.callee?.name !== 'require' || call.arguments[0]?.type !== 'StringLiteral') throw new Error('Nonstatic article image.');
      const relative = originalAsset(root, filename, call.arguments[0].value), id = imageId(relative);
      assets.push(relative);
      body.push({ type: 'image', imageId: id, alt: `Original ${metadata.title} illustration`, fit: 'contain' });
    } else if (['Text', 'Title', 'Paragraph', 'Button'].includes(name)) {
      const value = textOf(node);
      if (!value) return false;
      text.push(value);
      const style = attribute(node, 'style')?.expression?.property?.name;
      if (style === 'sectionTitle' || style === 'headerText' || name === 'Title') body.push({ type: 'heading', text: value });
      else if (style === 'boxText' || style === 'listItem') {
        const previous = body[body.length - 1];
        if (previous?.type === 'list') previous.items.push(value);
        else body.push({ type: 'list', items: [value] });
      } else body.push({ type: 'paragraph', text: value });
      for (const match of value.matchAll(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g)) addSource(match[2], match[1]);
      return false;
    } else if (!['ScrollView', 'View', 'Card', 'Card.Content', 'Card.Actions', 'TouchableOpacity'].includes(name)) throw new Error(`Unsupported article element: ${name}`);
  });
  const [id, category, topic] = TOPICS[route];
  const guide = {
    id, title: metadata.title, summary: metadata.summary, category, topics: [id, ...(topic ? [topic] : [])], body,
    images: [...new Set([imageId(metadata.image), ...assets.map(imageId)])], sources,
    review: { status: 'draft', reviewedAt: null },
    legacy: { sourcePath, sourceSha256: crypto.createHash('sha256').update(source).digest('hex') },
  };
  return { guide, text, assets: [metadata.image, ...assets] };
}
function convertLibrary(root) {
  const ast = parse(fs.readFileSync(path.join(root, 'src/screens/MedicalLibraryScreen.js'), 'utf8'));
  let categories;
  walk(ast, (node) => { if (node.type === 'VariableDeclarator' && node.id.name === 'categories') categories = node.init.elements; });
  if (categories?.length !== Object.keys(TOPICS).length) throw new Error('The legacy topic count changed; inspect coverage.');
  const converted = categories.map((node) => {
    const fields = Object.fromEntries(node.properties.map((item) => [item.key.name, item.value]));
    const route = fields.link.value;
    if (!Object.hasOwn(TOPICS, route)) throw new Error(`Unmapped topic: ${route}`);
    return convertArticle(root, route, { title: fields.title.value, summary: fields.description.value,
      image: originalAsset(root, path.join(root, 'src/screens/MedicalLibraryScreen.js'), fields.image.arguments[0].value) });
  });
  if (new Set(converted.map((item) => item.guide.id)).size !== converted.length) throw new Error('Duplicate legacy topic.');
  return converted;
}
function prepareGuestContent(root) {
  const folder = path.join(root, '.expo/guest-content'), dataFile = path.join(folder, 'legacy-guides.json');
  const imageFile = path.join(folder, 'legacy-images.js');
  const converted = convertLibrary(root);
  fs.mkdirSync(folder, { recursive: true });
  const write = (filename, value) => { if (!fs.existsSync(filename) || fs.readFileSync(filename, 'utf8') !== value) fs.writeFileSync(filename, value); };
  write(dataFile, JSON.stringify(converted.map((item) => item.guide), null, 2) + '\n');
  const assets = [...new Set(converted.flatMap((item) => item.assets))];
  write(imageFile, 'module.exports = {\n' + assets.map((relative) => `  ${JSON.stringify(imageId(relative))}: require(${JSON.stringify('../../' + relative.replace('LibraryPhotos/men_health.png', 'LibraryPhotos/men_health.jpg'))}),`).join('\n') + '\n};\n');
  return { dataFile, imageFile, converted, assets };
}
module.exports = { TOPICS, imageId, convertLibrary, convertArticle, prepareGuestContent };
if (require.main === module) {
  const result = prepareGuestContent(path.resolve(process.argv[2] || path.join(__dirname, '..')));
  console.log(`Prepared ${result.converted.length} legacy drafts with ${result.assets.length} original images in private staging.`);
}
