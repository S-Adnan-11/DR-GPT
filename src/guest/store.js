const { VISIT_QUESTIONS, answerVisitQuestion } = require('./visitQuestions');

const STORAGE_KEY = '@drgpt/guest/v1';
const QUESTIONS = [
  { id: 'question-0', text: 'What would I like to understand?' },
  { id: 'question-1', text: 'What questions do I want to ask?' },
  { id: 'question-2', text: 'What happens after this visit?' },
];
const empty = () => ({ version: 1, guides: [], facilities: [], checklist: [], visitQuestions: [] });
const savedId = (id) => typeof id === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/.test(id);

function createGuestStore({ storage, catalog, assertEnabled }) {
  const allowed = {
    guides: new Set(catalog.guides.map((guide) => guide.id)),
    facilities: new Set(catalog.facilities.map((facility) => facility.id)),
    checklist: new Set(QUESTIONS.map((question) => question.id)),
  };
  const knownVisitQuestions = new Set(VISIT_QUESTIONS.map((question) => question.id));
  const eligibleVisitQuestions = new Set();
  let state = empty(), status = 'ready', loading, writes = Promise.resolve();
  const snapshot = () => ({ ...state, guides: state.guides.filter((id) => allowed.guides.has(id)), unavailableGuides: state.guides.filter((id) => !allowed.guides.has(id)), facilities: state.facilities.filter((id) => allowed.facilities.has(id)), unavailableFacilities: state.facilities.filter((id) => !allowed.facilities.has(id)), checklist: [...state.checklist], visitQuestions: state.visitQuestions.filter((id) => eligibleVisitQuestions.has(id)), unavailableVisitQuestions: state.visitQuestions.filter((id) => !eligibleVisitQuestions.has(id)), status });

  function ready() {
    assertEnabled();
    if (!loading) loading = (async () => {
      const answers = await Promise.all(VISIT_QUESTIONS.map((question) => answerVisitQuestion(question.id, catalog)));
      answers.forEach((answer, index) => { if (answer.kind === 'answer') eligibleVisitQuestions.add(VISIT_QUESTIONS[index].id); });
      try {
        const raw = await storage.getItem(STORAGE_KEY);
        if (raw === null) return;
        const parsed = JSON.parse(raw);
        // Earlier guide/checklist saves may predate the facility collection.
        if (parsed?.version === 1 && !Object.prototype.hasOwnProperty.call(parsed, 'facilities')) parsed.facilities = [];
        if (parsed?.version !== 1 || !Object.keys(allowed).every((key) => Array.isArray(parsed[key]) && parsed[key].every((id) => typeof id === 'string'))) throw new Error('Unreadable saved items.');
        state = { version: 1 };
        for (const key of Object.keys(allowed)) state[key] = [...new Set(parsed[key].filter((id) => key === 'checklist' ? allowed[key].has(id) : savedId(id)))];
        // Invalid optional selections must not discard earlier saved items or progress.
        const selections = Object.prototype.hasOwnProperty.call(parsed, 'visitQuestions') ? parsed.visitQuestions : [];
        state.visitQuestions = Array.isArray(selections) ? [...new Set(selections.filter(savedId))] : [];
        if (!Array.isArray(selections) || !selections.every(savedId)) status = 'unreadable';
      } catch {
        state = empty(); status = 'unreadable';
      }
    })();
    return loading;
  }

  function change(update) {
    assertEnabled();
    const operation = writes.then(async () => {
      await ready();
      await update();
      try { await storage.setItem(STORAGE_KEY, JSON.stringify(state)); status = 'ready'; }
      catch { status = 'session'; }
      return snapshot();
    });
    writes = operation.catch(() => {});
    return operation;
  }

  return {
    async load() { await ready(); await writes; return snapshot(); },
    toggle(kind, id) {
      assertEnabled();
      if (!Object.prototype.hasOwnProperty.call(allowed, kind) || !allowed[kind].has(id)) throw new Error('Only known guest item IDs can be saved.');
      return change(() => { state[kind] = state[kind].includes(id) ? state[kind].filter((value) => value !== id) : [...state[kind], id]; });
    },
    addVisitQuestion(id) {
      assertEnabled();
      if (!knownVisitQuestions.has(id)) throw new Error('Only known visit question IDs can be added.');
      return change(() => {
        if (!eligibleVisitQuestions.has(id)) throw new Error('This visit question is unavailable.');
        if (!state.visitQuestions.includes(id)) state.visitQuestions = [...state.visitQuestions, id];
      });
    },
    removeVisitQuestion(id) {
      assertEnabled();
      if (!savedId(id)) throw new Error('Only valid visit question IDs can be removed.');
      return change(() => { state.visitQuestions = state.visitQuestions.filter((value) => value !== id); });
    },
    clearSaved: () => change(() => { state.guides = []; state.facilities = []; }),
    removeUnavailableFacilities: () => change(() => { state.facilities = state.facilities.filter((id) => allowed.facilities.has(id)); }),
    removeUnavailableGuides: () => change(() => { state.guides = state.guides.filter((id) => allowed.guides.has(id)); }),
    clearChecklist: () => change(() => { state.checklist = []; state.visitQuestions = []; }),
  };
}

module.exports = { STORAGE_KEY, QUESTIONS, createGuestStore };
