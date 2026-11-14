const test = require('node:test'), assert = require('node:assert/strict');
const catalog = require('../src/catalog/catalog.json');
const { STORAGE_KEY, createGuestStore } = require('../src/guest/store');
const { VISIT_QUESTIONS } = require('../src/guest/visitQuestions');
const copy = () => JSON.parse(JSON.stringify(catalog));
const olderState = () => ({ version: 1, guides: ['prepare-visit', 'retired-guide'],
  facilities: ['fixture-harbour-clinic-a', 'fixture-harbour-clinic-b', 'fixture-retired'], checklist: ['question-0', 'question-2'] });
const memory = (initial) => {
  const values = new Map(initial === undefined ? [] : [[STORAGE_KEY, JSON.stringify(initial)]]), writes = [];
  return { values, writes, async getItem(key) { return values.get(key) ?? null; },
    async setItem(key, value) { writes.push({ key, value }); values.set(key, value); } };
};
const store = (storage, value = catalog) => createGuestStore({ storage, catalog: value, assertEnabled() {} });
const persisted = (storage) => JSON.parse(storage.values.get(STORAGE_KEY));
const assertCore = (actual, expected) => {
  for (const key of ['guides', 'facilities', 'checklist']) assert.deepEqual(actual[key], expected[key]);
};

test('earlier v1 saves load without a migration write and keep all old IDs when a question is added', async () => {
  for (const includeFacilities of [false, true]) {
    const initial = olderState();
    if (!includeFacilities) delete initial.facilities;
    const storage = memory(initial), original = storage.values.get(STORAGE_KEY), current = store(storage);
    const before = await current.load();
    assert.equal(before.status, 'ready'); assert.deepEqual(before.visitQuestions, []); assert.deepEqual(before.unavailableVisitQuestions, []);
    assert.deepEqual(before.checklist, initial.checklist); assert.deepEqual(before.guides, ['prepare-visit']);
    assert.deepEqual(before.unavailableGuides, ['retired-guide']);
    assert.equal(storage.values.get(STORAGE_KEY), original); assert.equal(storage.writes.length, 0);
    await current.addVisitQuestion('prepare-appointment');
    const after = await store(storage).load();
    assert.deepEqual(after.visitQuestions, ['prepare-appointment']);
    assertCore(persisted(storage), { ...initial, facilities: initial.facilities || [] });
    assert.deepEqual(after.checklist, before.checklist); assert.deepEqual(after.facilities, before.facilities);
    assert.deepEqual(after.unavailableFacilities, before.unavailableFacilities);
  }
});

test('all supported questions persist as IDs, with idempotent adds and removals across relaunch', async () => {
  const initial = { ...olderState(), healthHistory: 'Synthetic discarded field', question: 'Synthetic discarded text' };
  const storage = memory(initial), current = store(storage);
  for (const prompt of VISIT_QUESTIONS) {
    await current.addVisitQuestion(prompt.id); await current.addVisitQuestion(prompt.id);
  }
  const selected = VISIT_QUESTIONS.map((prompt) => prompt.id), before = await store(storage).load();
  assert.deepEqual(before.visitQuestions, selected); assert.deepEqual(before.unavailableVisitQuestions, []);
  assert.deepEqual([...storage.values.keys()], [STORAGE_KEY]);
  assert.deepEqual(persisted(storage), { version: 1, guides: initial.guides, facilities: initial.facilities,
    checklist: initial.checklist, visitQuestions: selected });
  for (const prompt of VISIT_QUESTIONS) assert.ok(!storage.values.get(STORAGE_KEY).includes(prompt.question));
  await current.removeVisitQuestion('ask-about-test'); await current.removeVisitQuestion('ask-about-test');
  const after = await store(storage).load();
  assert.deepEqual(after.visitQuestions, selected.filter((id) => id !== 'ask-about-test'));
  assertCore(persisted(storage), initial);
  after.visitQuestions.length = 0;
  assert.deepEqual((await current.load()).visitQuestions, selected.filter((id) => id !== 'ask-about-test'));
});

test('queued adds wait for hydration, deduplicate repeated taps and preserve add/remove ordering', async () => {
  const initial = { ...olderState(), visitQuestions: ['retired-prompt'] }, storage = memory(initial);
  let releaseRead, reads = 0;
  const read = new Promise((resolve) => { releaseRead = resolve; });
  storage.getItem = async (key) => { reads++; await read; return storage.values.get(key) ?? null; };
  const current = store(storage);
  const first = current.addVisitQuestion('prepare-appointment');
  const duplicate = current.addVisitQuestion('prepare-appointment');
  const removed = current.removeVisitQuestion('prepare-appointment');
  const repeatedRemoval = current.removeVisitQuestion('prepare-appointment');
  const last = current.addVisitQuestion('prepare-appointment');
  const other = current.addVisitQuestion('before-leaving');
  const retired = current.removeVisitQuestion('retired-prompt');
  assert.equal(storage.writes.length, 0);
  releaseRead();
  const results = await Promise.all([first, duplicate, removed, repeatedRemoval, last, other, retired]);
  assert.equal(reads, 1);
  assert.deepEqual(results.map((result) => result.visitQuestions), [
    ['prepare-appointment'], ['prepare-appointment'], [], [], ['prepare-appointment'],
    ['prepare-appointment', 'before-leaving'], ['prepare-appointment', 'before-leaving'],
  ]);
  assert.deepEqual((await store(storage).load()).visitQuestions, ['prepare-appointment', 'before-leaving']);
  assert.deepEqual((await current.load()).unavailableVisitQuestions, []);
  assertCore(persisted(storage), initial);
});

test('clearing saved items preserves both checklist collections; clearing the checklist preserves saves', async () => {
  const initial = { ...olderState(), visitQuestions: ['prepare-appointment', 'retired-prompt'] };
  const storage = memory(initial), current = store(storage);
  await current.clearSaved();
  const clearedSaves = await store(storage).load();
  assert.deepEqual(clearedSaves.guides, []); assert.deepEqual(clearedSaves.unavailableGuides, []);
  assert.deepEqual(clearedSaves.facilities, []); assert.deepEqual(clearedSaves.unavailableFacilities, []);
  assert.deepEqual(clearedSaves.checklist, initial.checklist);
  assert.deepEqual(clearedSaves.visitQuestions, ['prepare-appointment']); assert.deepEqual(clearedSaves.unavailableVisitQuestions, ['retired-prompt']);
  await current.toggle('guides', 'prepare-visit'); await current.toggle('facilities', 'fixture-harbour-clinic-b');
  await current.clearChecklist();
  const clearedChecklist = await store(storage).load();
  assert.deepEqual(clearedChecklist.guides, ['prepare-visit']); assert.deepEqual(clearedChecklist.facilities, ['fixture-harbour-clinic-b']);
  assert.deepEqual(clearedChecklist.checklist, []); assert.deepEqual(clearedChecklist.visitQuestions, []);
  assert.deepEqual(clearedChecklist.unavailableVisitQuestions, []); assert.deepEqual(persisted(storage).visitQuestions, []);
});

test('retired selections remain visible and removable while unavailable guides cannot receive new selections', async () => {
  const mutations = [
    (value) => {},
    (value) => { value.guides = value.guides.filter((guide) => guide.id !== 'prepare-visit'); },
    (value) => { value.guides[0].review = { status: 'draft', reviewedAt: null }; },
    (value) => { value.guides[0].sources[0].checkedAt = '2026-02-30'; },
    (value) => { value.guides[0].sources[0].publisher = ''; },
    (value) => { value.guides[0].body[0].heading = 'Unavailable section'; },
  ];
  for (const [index, mutate] of mutations.entries()) {
    const value = copy(); mutate(value);
    const initial = { ...olderState(), visitQuestions: ['retired-prompt', 'prepare-appointment', 'retired-prompt'] };
    const storage = memory(initial), original = storage.values.get(STORAGE_KEY), current = store(storage, value);
    const loaded = await current.load();
    assert.equal(loaded.status, 'ready');
    assert.deepEqual(loaded.visitQuestions, index === 0 ? ['prepare-appointment'] : []);
    assert.deepEqual(loaded.unavailableVisitQuestions, index === 0 ? ['retired-prompt'] : ['retired-prompt', 'prepare-appointment']);
    assert.equal(storage.values.get(STORAGE_KEY), original); assert.equal(storage.writes.length, 0);
    if (index !== 0) await assert.rejects(current.addVisitQuestion('prepare-appointment'), /unavailable/);
    assert.throws(() => current.addVisitQuestion('retired-prompt'), /known visit question/);
    loaded.unavailableVisitQuestions.length = 0;
    assert.ok((await current.load()).unavailableVisitQuestions.includes('retired-prompt'));
    await current.toggle('checklist', 'question-1');
    assert.deepEqual(persisted(storage).visitQuestions, ['retired-prompt', 'prepare-appointment']);
    await current.removeVisitQuestion('retired-prompt'); await current.removeVisitQuestion('prepare-appointment');
    const after = await store(storage, value).load();
    assert.deepEqual(after.visitQuestions, []); assert.deepEqual(after.unavailableVisitQuestions, []);
    assertCore(persisted(storage), { ...initial, checklist: ['question-0', 'question-2', 'question-1'] });
  }
});

test('malformed optional selections keep valid older state and never write during hydration', async () => {
  const values = [null, 3, 'prepare-appointment', { id: 'prepare-appointment' },
    ['prepare-appointment', 'retired-prompt', 'prepare-appointment', 'private words', '../invalid', '', null, 7, { id: 'before-leaving' }, 'x'.repeat(129)]];
  for (const value of values) {
    const initial = { ...olderState(), visitQuestions: value }, storage = memory(initial);
    const original = storage.values.get(STORAGE_KEY), current = store(storage), loaded = await current.load();
    const expected = Array.isArray(value) ? ['prepare-appointment', 'retired-prompt'] : [];
    assert.equal(loaded.status, 'unreadable'); assert.deepEqual(loaded.checklist, initial.checklist);
    assert.deepEqual(loaded.guides, ['prepare-visit']); assert.deepEqual(loaded.unavailableGuides, ['retired-guide']);
    assert.deepEqual(loaded.facilities, ['fixture-harbour-clinic-a', 'fixture-harbour-clinic-b']);
    assert.deepEqual(loaded.unavailableFacilities, ['fixture-retired']);
    assert.deepEqual(loaded.visitQuestions, expected.filter((id) => id === 'prepare-appointment'));
    assert.deepEqual(loaded.unavailableVisitQuestions, expected.filter((id) => id === 'retired-prompt'));
    assert.equal(storage.values.get(STORAGE_KEY), original); assert.equal(storage.writes.length, 0);
    assert.equal((await current.addVisitQuestion('before-leaving')).status, 'ready');
    assert.deepEqual(persisted(storage).visitQuestions, [...expected, 'before-leaving']); assertCore(persisted(storage), initial);
  }
});

test('valid-shaped retired selections deduplicate without marking earlier state unreadable', async () => {
  const initial = { ...olderState(), visitQuestions: ['retired-prompt', 'retired-prompt', 'prepare-appointment', 'prepare-appointment'] };
  const storage = memory(initial), current = store(storage), loaded = await current.load();
  assert.equal(loaded.status, 'ready'); assert.deepEqual(loaded.visitQuestions, ['prepare-appointment']);
  assert.deepEqual(loaded.unavailableVisitQuestions, ['retired-prompt']); assert.equal(storage.writes.length, 0);
  await current.removeVisitQuestion('retired-prompt');
  assert.deepEqual(persisted(storage).visitQuestions, ['prepare-appointment']); assertCore(persisted(storage), initial);
});

test('question methods reject arbitrary new IDs and malformed removals without changing saved state', async () => {
  const storage = memory(olderState()), original = storage.values.get(STORAGE_KEY), current = store(storage);
  for (const id of ['retired-prompt', 'question-0', '../invalid', 'Private question text', '', null, {}, 'x'.repeat(129)]) {
    assert.throws(() => current.addVisitQuestion(id), /known visit question/);
  }
  for (const id of ['../invalid', 'Private question text', '', null, {}, 'x'.repeat(129)]) {
    assert.throws(() => current.removeVisitQuestion(id), /valid visit question/);
  }
  assert.throws(() => current.toggle('visitQuestions', 'prepare-appointment'), /known guest item/);
  await current.load();
  assert.equal(storage.values.get(STORAGE_KEY), original); assert.equal(storage.writes.length, 0);
  await current.removeVisitQuestion('unselected-retired-prompt');
  assert.deepEqual(persisted(storage).visitQuestions, []); assertCore(persisted(storage), olderState());
});

test('failed question writes stay session-only and the next successful write persists the current session', async () => {
  const initial = olderState(), storage = memory(initial), write = storage.setItem;
  let denied = true;
  storage.setItem = async (key, value) => { if (denied) throw Error('Write denied'); return write(key, value); };
  const current = store(storage), selected = await current.addVisitQuestion('prepare-appointment');
  assert.equal(selected.status, 'session'); assert.deepEqual(selected.visitQuestions, ['prepare-appointment']);
  assert.equal((await current.load()).status, 'session'); assert.deepEqual((await store(storage).load()).visitQuestions, []);
  denied = false;
  assert.equal((await current.toggle('checklist', 'question-1')).status, 'ready');
  assert.deepEqual((await store(storage).load()).visitQuestions, ['prepare-appointment']);
  denied = true;
  const removed = await current.removeVisitQuestion('prepare-appointment');
  assert.equal(removed.status, 'session'); assert.deepEqual(removed.visitQuestions, []);
  assert.deepEqual((await store(storage).load()).visitQuestions, ['prepare-appointment']);
  denied = false;
  await current.removeVisitQuestion('prepare-appointment');
  assert.deepEqual((await store(storage).load()).visitQuestions, []);
  assertCore(persisted(storage), { ...initial, checklist: ['question-0', 'question-2', 'question-1'] });
});

test('a read failure keeps question actions usable and corrupt core state still uses existing recovery', async () => {
  const storage = memory();
  storage.getItem = async () => { throw Error('Read denied'); };
  storage.setItem = async () => { throw Error('Write denied'); };
  const current = store(storage);
  assert.equal((await current.load()).status, 'unreadable');
  const selected = await current.addVisitQuestion('prepare-appointment');
  assert.equal(selected.status, 'session'); assert.deepEqual(selected.visitQuestions, ['prepare-appointment']);
  for (const invalid of [null, ['prepare-visit', 4]]) {
    const broken = memory({ ...olderState(), guides: invalid, visitQuestions: ['prepare-appointment'] });
    const loaded = await store(broken).load();
    assert.equal(loaded.status, 'unreadable');
    for (const key of ['guides', 'facilities', 'checklist', 'visitQuestions', 'unavailableVisitQuestions']) assert.deepEqual(loaded[key], []);
    assert.equal(broken.writes.length, 0);
  }
});

test('disabled guest configuration prevents reads and writes through the question methods', async () => {
  let calls = 0;
  const current = createGuestStore({ catalog, assertEnabled() { throw Error('Configuration unavailable'); },
    storage: { async getItem() { calls++; }, async setItem() { calls++; } } });
  assert.throws(() => current.addVisitQuestion('prepare-appointment'), /Configuration unavailable/);
  assert.throws(() => current.removeVisitQuestion('prepare-appointment'), /Configuration unavailable/);
  await assert.rejects(current.load(), /Configuration unavailable/); assert.equal(calls, 0);
});
