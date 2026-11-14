const test = require('node:test'), assert = require('node:assert/strict');
const { VISIT_QUESTIONS, answerVisitQuestion } = require('../src/guest/visitQuestions');
const { deterministicFixture } = require('../src/guest/guideEvaluation');
const { selectPublicCatalog } = require('../src/catalog/catalog');
const { createRouter, HOME } = require('../src/guest/router');
const { createGuestStore, STORAGE_KEY } = require('../src/guest/store');
const catalog = require('../src/catalog/catalog.json');
const copy = () => JSON.parse(JSON.stringify(catalog));

test('the curated menu keeps stable IDs and resolves only sourced visit-guide excerpts', async () => {
  assert.deepEqual(VISIT_QUESTIONS.map((prompt) => prompt.id), ['prepare-appointment', 'bring-medicines-list', 'ask-about-test', 'test-preparation', 'delayed-results', 'before-leaving']);
  const published = selectPublicCatalog(catalog);
  for (const prompt of VISIT_QUESTIONS) {
    const answer = await answerVisitQuestion(prompt.id, catalog);
    assert.equal(answer.kind, 'answer'); assert.equal(answer.guide.id, prompt.guideId);
    const guide = published.guides.find((item) => item.id === answer.guide.id);
    const texts = guide.body.flatMap((block) => block.items || [block.text]).filter(Boolean);
    assert.ok(answer.passages.length > 0);
    assert.ok(answer.passages.every((passage) => texts.includes(passage.text)));
    assert.deepEqual(answer.sources, guide.sources); assert.equal(answer.checkedAt, guide.review.checkedAt);
    assert.ok(!('mode' in answer) && !('explanation' in answer));
  }
  assert.ok(Object.isFrozen(VISIT_QUESTIONS) && VISIT_QUESTIONS.every(Object.isFrozen));
});

test('unknown prompts, absent/unpublished guides and invalid source evidence recover without an answer', async () => {
  assert.equal((await answerVisitQuestion('retired-prompt', catalog)).kind, 'unavailable');
  assert.equal((await answerVisitQuestion('prepare-appointment', null)).kind, 'unavailable');
  for (const mutate of [
    (value) => { value.guides = []; },
    (value) => { value.guides[0].review = { status: 'draft', reviewedAt: null }; },
    (value) => { value.guides[0].sources[0].checkedAt = '2026-02-30'; },
    (value) => { value.guides[0].sources[0].publisher = ''; },
    (value) => { value.guides[0].body[0].heading = 'Unavailable section'; },
  ]) {
    const value = copy(); mutate(value);
    assert.equal((await answerVisitQuestion('prepare-appointment', value)).kind, 'unavailable');
  }
});

test('citation failures, unselected evidence and service failures cannot become menu answers', async () => {
  for (const respond of [
    () => ({ statements: [] }),
    (request) => { const result = deterministicFixture(request); result.statements[0].citations = []; return result; },
    (request) => { const result = deterministicFixture(request); result.statements[0].evidenceId = 'prepare-visit:0'; return result; },
    () => { throw Error('Synthetic failure'); },
  ]) assert.equal((await answerVisitQuestion('delayed-results', catalog, { respond })).kind, 'unavailable');
});

test('private drafts never supply visit answers and stay excluded by the publication selector', async () => {
  const value = copy();
  value.guides.push({ ...value.guides[0], id: 'private-visit-draft', review: { status: 'draft', reviewedAt: null } });
  const answer = await answerVisitQuestion('prepare-appointment', value);
  assert.equal(answer.kind, 'answer'); assert.equal(answer.guide.id, 'prepare-visit');
  assert.ok(!selectPublicCatalog(value).guides.some((guide) => guide.id === 'private-visit-draft'));
});

test('visit answers preserve source Back and the originating Learn or Saved tab, including a repeated guide', () => {
  const router = createRouter(catalog);
  for (const origin of ['learn', 'saved']) {
    let history = router.navigate([HOME], { name: origin });
    history = router.navigate(history, { name: 'guide', id: 'prepare-visit' });
    const original = history;
    history = router.navigate(history, { name: 'visitQuestions' });
    assert.equal(router.activeTab(history.at(-1), history), origin);
    const menu = history;
    history = router.navigate(history, { name: 'visitQuestion', id: 'prepare-appointment' });
    assert.equal(router.activeTab(history.at(-1), history), origin);
    const answer = history;
    history = router.navigate(history, { name: 'guide', id: 'prepare-visit' });
    assert.equal(router.activeTab(history.at(-1), history), origin);
    assert.deepEqual(router.back(history), answer);
    assert.deepEqual(router.back(answer), menu);
    assert.deepEqual(router.back(menu), original);
  }
  assert.equal(router.navigate([HOME], { name: 'visitQuestion', id: '../invalid' }).length, 1);
  assert.equal(router.navigate([HOME], { name: 'visitQuestion', id: 'retired-prompt' }).at(-1).name, 'visitQuestion');
});

test('selecting and reading questions leaves earlier guide, checklist and facility state unchanged', async () => {
  let raw = JSON.stringify({ version: 1, guides: ['prepare-visit'], checklist: ['question-0', 'question-2'], facilities: ['fixture-harbour-clinic-a', 'fixture-harbour-clinic-b'] });
  const original = raw;
  let writes = 0;
  const options = { catalog, assertEnabled() {}, storage: { async getItem(key) { assert.equal(key, STORAGE_KEY); return raw; }, async setItem(key, value) { writes++; raw = value; } } };
  const before = await createGuestStore(options).load();
  for (const prompt of VISIT_QUESTIONS) assert.equal((await answerVisitQuestion(prompt.id, catalog)).kind, 'answer');
  const after = await createGuestStore(options).load();
  assert.deepEqual(after, before); assert.equal(raw, original); assert.equal(writes, 0);
});
