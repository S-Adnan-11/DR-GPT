const test = require('node:test');
const assert = require('node:assert/strict');
const catalog = require('../src/catalog/catalog.json');
const { STORAGE_KEY, createGuestStore } = require('../src/guest/store');
const { HOME, createRouter } = require('../src/guest/router');
const memory = () => {
  const values = new Map();
  return { values, getItem: async (key) => values.get(key) ?? null, setItem: async (key, value) => { values.set(key, value); } };
};
const store = (storage, assertEnabled = () => {}) => createGuestStore({ storage, catalog, assertEnabled });

test('guest IDs and checklist selections persist across fresh store instances', async () => {
  const storage = memory(), first = store(storage);
  assert.deepEqual((await first.load()).guides, []);
  await first.toggle('guides', 'prepare-visit');
  await first.toggle('facilities', 'fixture-harbour-clinic-b');
  await first.toggle('checklist', 'question-1');
  const reopened = await store(storage).load();
  assert.deepEqual(reopened.guides, ['prepare-visit']);
  assert.deepEqual(reopened.facilities, ['fixture-harbour-clinic-b']);
  assert.deepEqual(reopened.checklist, ['question-1']);
  assert.deepEqual([...storage.values.keys()], [STORAGE_KEY]);
  assert.deepEqual(Object.keys(JSON.parse(storage.values.get(STORAGE_KEY))).sort(), ['checklist', 'facilities', 'guides', 'version']);
});

test('clear saved items keeps checklist; clear checklist keeps saves; unsave persists', async () => {
  const storage = memory(), first = store(storage);
  await first.toggle('guides', 'prepare-visit'); await first.toggle('checklist', 'question-0');
  await first.clearSaved();
  assert.deepEqual((await store(storage).load()).guides, []);
  assert.deepEqual((await first.load()).checklist, ['question-0']);
  await first.toggle('facilities', 'fixture-meadow-clinic'); await first.clearChecklist();
  assert.deepEqual((await first.load()).facilities, ['fixture-meadow-clinic']);
  assert.deepEqual((await store(storage).load()).checklist, []);
  await first.toggle('facilities', 'fixture-meadow-clinic');
  assert.deepEqual((await store(storage).load()).facilities, []);
});

test('concurrent writes wait for hydration and retain all changes', async () => {
  const storage = memory(), first = store(storage);
  await Promise.all([first.toggle('guides', 'prepare-visit'), first.toggle('facilities', 'fixture-harbour-clinic-a'), first.toggle('checklist', 'question-2')]);
  const result = await store(storage).load();
  assert.equal(result.guides.length + result.facilities.length + result.checklist.length, 3);
  result.guides.length = 0;
  assert.deepEqual((await first.load()).guides, ['prepare-visit']);
});

test('corrupt, missing or unavailable storage keeps the guest usable and reports session-only writes', async () => {
  for (const raw of ['not json', '{"version":2}', '{"version":1,"guides":null}']) {
    const storage = memory(); storage.values.set(STORAGE_KEY, raw);
    const instance = store(storage);
    assert.equal((await instance.load()).status, 'unreadable');
    assert.deepEqual((await instance.load()).guides, []);
    assert.equal((await instance.toggle('guides', 'prepare-visit')).status, 'ready');
  }
  const instance = store({ getItem: async () => { throw Error('Read denied'); }, setItem: async () => { throw Error('Write denied'); } });
  assert.equal((await instance.load()).status, 'unreadable');
  const result = await instance.toggle('guides', 'prepare-visit');
  assert.deepEqual(result.guides, ['prepare-visit']); assert.equal(result.status, 'session');
});

test('unknown IDs and arbitrary personal fields cannot enter saved state', async () => {
  const storage = memory(), instance = store(storage);
  assert.throws(() => instance.toggle('symptoms', 'private text'), /known guest item IDs/);
  assert.throws(() => instance.toggle('facilities', 'unknown'), /known guest item IDs/);
  storage.values.set(STORAGE_KEY, JSON.stringify({ version: 1, guides: ['prepare-visit', 'unknown'], facilities: [], checklist: [], healthHistory: 'Discard me' }));
  await instance.toggle('checklist', 'question-0');
  const saved = JSON.parse(storage.values.get(STORAGE_KEY));
  assert.equal(saved.healthHistory, undefined); assert.deepEqual(saved.guides, ['prepare-visit']);
});

test('invalid runtime configuration prevents local reads and writes', async () => {
  let calls = 0;
  const instance = store({ getItem: async () => { calls++; }, setItem: async () => { calls++; } }, () => { throw Error('Configuration unavailable'); });
  await assert.rejects(instance.load(), /Configuration unavailable/);
  assert.throws(() => instance.toggle('guides', 'prepare-visit'), /Configuration unavailable/);
  assert.equal(calls, 0);
});

test('back navigation preserves details, branch IDs and the four tab destinations', () => {
  const router = createRouter(catalog);
  let history = router.navigate([HOME], { name: 'care' });
  history = router.navigate(history, { name: 'facility', id: 'fixture-harbour-clinic-b' });
  assert.equal(history.at(-1).id, 'fixture-harbour-clinic-b');
  assert.equal(router.activeTab(history.at(-1)), 'care');
  history = router.navigate(history, { name: 'firstAid' });
  history = router.navigate(history, { name: 'firstAidDetail', id: 'cpr-choking' });
  assert.equal(router.back(history).at(-1).name, 'firstAid');
  assert.equal(router.back(router.back(history)).at(-1).id, 'fixture-harbour-clinic-b');
  assert.deepEqual(router.navigate(history, { name: 'saved' }), [HOME, { name: 'saved' }]);
  assert.deepEqual(router.navigate(history, HOME), [HOME]);
  assert.equal(router.navigate(history, { name: 'facility', id: 'unknown' }), history);
  assert.equal(router.navigate(history, { name: 'profile' }), history);
  assert.equal(router.back([HOME]).length, 1);
});
