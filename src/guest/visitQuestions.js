const { evaluateGuideQuestion } = require('./guideEvaluation');

// Stable menu IDs select only question forms already covered by the guide evaluation.
const VISIT_QUESTIONS = Object.freeze([
  { id: 'prepare-appointment', category: 'Before your visit', question: 'How can I prepare for a healthcare visit?', guideId: 'prepare-visit' },
  { id: 'bring-medicines-list', category: 'Before your visit', question: 'Should I bring a medicines list to my appointment?', guideId: 'prepare-visit' },
  { id: 'ask-about-test', category: 'Tests & results', question: 'What questions should I ask about a test?', guideId: 'test-questions' },
  { id: 'test-preparation', category: 'Tests & results', question: 'Who can I ask about test preparation?', guideId: 'test-questions' },
  { id: 'delayed-results', category: 'Tests & results', question: 'Who should I contact if my test results are delayed?', guideId: 'test-questions' },
  { id: 'before-leaving', category: 'Next steps', question: 'What should I confirm before leaving my appointment?', guideId: 'before-you-leave' },
].map(Object.freeze));

async function answerVisitQuestion(id, catalog, options = {}) {
  const prompt = VISIT_QUESTIONS.find((item) => item.id === id);
  const unavailable = () => ({ kind: 'unavailable', prompt: prompt || null });
  if (!prompt || !catalog) return unavailable();
  try {
    const result = await evaluateGuideQuestion(prompt.question, { ...options, catalog });
    if (result.kind !== 'draft' || result.statements.some((item) => item.guideId !== prompt.guideId)) return unavailable();
    const guide = catalog.guides.find((item) => item.id === prompt.guideId);
    const sources = [...new Map(result.statements.flatMap((item) => item.sources).map((source) => [source.url, source])).values()];
    return { kind: 'answer', prompt, guide: { id: guide.id, title: guide.title },
      passages: result.statements.map((item) => ({ id: item.evidenceId, text: item.text })),
      sources, checkedAt: guide.review.checkedAt };
  } catch { return unavailable(); }
}

module.exports = { VISIT_QUESTIONS, answerVisitQuestion };
