const test = require('node:test'), assert = require('node:assert/strict');
const { createRouter, HOME } = require('../src/guest/router');
const catalog = require('../src/catalog/catalog.json');

test('checklist questions keep Saved selected and Back returns through the answer and source', () => {
  const router = createRouter(catalog);
  for (const origin of ['home', 'learn', 'care', 'saved']) {
    let history = router.navigate([HOME], { name: origin });
    history = router.navigate(history, { name: 'prepare' });
    const checklist = history;
    history = router.navigate(history, { name: 'visitQuestion', id: 'prepare-appointment' });
    const answer = history;
    assert.equal(router.activeTab(history.at(-1), history), 'saved');
    history = router.navigate(history, { name: 'guide', id: 'prepare-visit' });
    assert.equal(router.activeTab(history.at(-1), history), 'saved');
    assert.deepEqual(router.back(history), answer);
    assert.deepEqual(router.back(answer), checklist);
    const menu = router.navigate(checklist, { name: 'visitQuestions' });
    assert.equal(router.activeTab(menu.at(-1), menu), 'saved');
    assert.deepEqual(router.back(menu), checklist);
  }
});

test('reopening a question from the checklist keeps its new origin even after earlier answer reading', () => {
  const router = createRouter(catalog);
  let history = router.navigate([HOME], { name: 'learn' });
  history = router.navigate(history, { name: 'visitQuestions' });
  history = router.navigate(history, { name: 'visitQuestion', id: 'prepare-appointment' });
  history = router.navigate(history, { name: 'guide', id: 'prepare-visit' });
  history = router.navigate(history, { name: 'prepare' });
  const checklist = history;
  history = router.navigate(history, { name: 'visitQuestion', id: 'prepare-appointment' });
  const answer = history;
  assert.deepEqual(router.back(answer), checklist);
  assert.equal(router.activeTab(answer.at(-1), answer), 'saved');
  history = router.navigate(history, { name: 'guide', id: 'prepare-visit' });
  const source = history;
  history = router.navigate(history, { name: 'guide', id: 'test-questions' });
  assert.deepEqual(router.back(history), source);
  assert.deepEqual(router.back(source), answer);
  assert.deepEqual(router.navigate(history, { name: 'guide', id: 'prepare-visit' }), source);
});
