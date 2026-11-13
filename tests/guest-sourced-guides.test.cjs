const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const catalog = require('../src/catalog/catalog.json');
const { validateCatalog, searchGuides, selectPublicCatalog } = require('../src/catalog/catalog');
const { convertLibrary } = require('../scripts/guest-content.cjs');
const { writePublicContent } = require('../scripts/public-content.cjs');
const { createGuestStore, STORAGE_KEY, QUESTIONS } = require('../src/guest/store');
const legacy = convertLibrary(path.resolve(__dirname, '..')).map((item) => item.guide);
const current = { ...catalog, guides: [...catalog.guides, ...legacy] };
const copy = () => JSON.parse(JSON.stringify(current));

test('the visit collection is searchable with dated editorial attribution and no photo dependencies', () => {
  validateCatalog(current);
  assert.deepEqual(catalog.guides.map((guide) => guide.id), ['prepare-visit', 'test-questions', 'before-you-leave']);
  for (const guide of catalog.guides) {
    assert.equal(guide.review.status, 'source-checked'); assert.equal(guide.review.reviewedAt, null);
    assert.equal(guide.review.checkedAt, '2026-11-13'); assert.deepEqual(guide.images, []);
    assert.ok(searchGuides(current.guides, guide.title, 'Care & medicines').includes(guide));
    for (const source of guide.sources) {
      assert.ok(source.publisher); assert.ok(source.title); assert.match(source.url, /^https:\/\//);
      assert.equal(source.checkedAt, guide.review.checkedAt);
    }
  }
  assert.equal(searchGuides(catalog.guides, 'results')[0].id, 'test-questions');
});

test('incomplete source checks, dangling related guides and editorial-only first aid are rejected', () => {
  for (const mutate of [
    (guide) => { delete guide.sources[0].publisher; },
    (guide) => { guide.sources[0].checkedAt = '2026-02-30'; },
    (guide) => { guide.sources[0].checkedAt = '2026-11-12'; },
    (guide) => { guide.review.checkedAt = null; },
    (guide) => { guide.review.reviewedAt = '2026-11-13'; },
    (guide) => { guide.legacy = {}; },
    (guide) => { guide.relatedGuides = ['missing']; },
    (guide) => { guide.relatedGuides = [guide.id]; },
  ]) { const value = copy(); mutate(value.guides[0]); assert.throws(() => validateCatalog(value)); }
  const value = copy(); value.firstAid = [{ ...value.guides[0], id: 'aid-contract', relatedGuides: [] }];
  assert.throws(() => validateCatalog(value), /qualified review/);
});

test('public content exports omit all legacy drafts, first-aid drafts, fixtures and their assets', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'drgpt-public-'));
  const output = path.join(directory, 'content');
  const selected = writePublicContent(current, output);
  assert.deepEqual(selected.guides.map((guide) => guide.id), catalog.guides.map((guide) => guide.id));
  assert.deepEqual(selected.firstAid, []); assert.deepEqual(selected.facilities, []);
  assert.deepEqual(fs.readdirSync(output), ['catalog.json']);
  assert.ok(!fs.readFileSync(path.join(output, 'catalog.json'), 'utf8').includes('legacy-'));
  assert.throws(() => writePublicContent(current, output), /EEXIST/);
  const value = copy(); value.guides[0].images = ['uncleared-image'];
  assert.throws(() => writePublicContent(value, path.join(directory, 'uncleared')), /cleared file/);
  value.guides[0].relatedGuides.push('sleep-health');
  assert.ok(!selectPublicCatalog(value).guides[0].relatedGuides.includes('sleep-health'));
});

test('an earlier installation retains prepare-visit, legacy guides, checklist IDs and both facility branches', async () => {
  assert.equal(STORAGE_KEY, '@drgpt/guest/v1');
  assert.deepEqual(QUESTIONS.map((question) => question.id), ['question-0', 'question-1', 'question-2']);
  let raw = JSON.stringify({ version: 1, guides: ['prepare-visit', 'sleep-health'], checklist: ['question-0', 'question-2'],
    facilities: ['fixture-harbour-clinic-a', 'fixture-harbour-clinic-b'] });
  const options = { catalog: current, assertEnabled() {}, storage: { async getItem() { return raw; }, async setItem(key, value) { raw = value; } } };
  const store = createGuestStore(options), before = await store.load();
  assert.deepEqual(before.guides, ['prepare-visit', 'sleep-health']);
  for (const id of ['test-questions', 'before-you-leave']) await store.toggle('guides', id);
  const again = await createGuestStore(options).load();
  assert.deepEqual(again.guides, ['prepare-visit', 'sleep-health', 'test-questions', 'before-you-leave']);
  assert.deepEqual(again.checklist, before.checklist); assert.deepEqual(again.facilities, before.facilities);
  const persisted = JSON.parse(raw);
  assert.deepEqual(Object.keys(persisted).sort(), ['checklist', 'facilities', 'guides', 'version']);
  assert.ok(Object.values(persisted).filter(Array.isArray).flat().every((id) => typeof id === 'string'));
});
