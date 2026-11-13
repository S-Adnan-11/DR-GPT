const { selectPublicCatalog } = require('../catalog/catalog');
const bundledCatalog = require('../catalog/catalog.json');

const GUIDE_IDS = ['prepare-visit', 'test-questions', 'before-you-leave'];
const preparation = ['Choose what matters most', 'Make a note of your concerns', 'Bring your medicines list', 'Check with the facility'];
const leaving = ['Check the next step', 'Ask for instructions you can take away', 'Know who to contact'];
const testPrompts = [/^What is this test for\?$/, /^Does the facility have preparation instructions\?/, /^When should I expect the results,/, /^Which person or office should I contact/];
const references = (guideId, matches) => matches.map((match) => ({ guideId, match }));
const routes = [
  [/^(?:how (?:can|do|should) i prepare for (?:a|my) (?:healthcare )?(?:visit|appointment)|what (?:should|can) i (?:prepare|bring|ask) (?:for|before|to) (?:a|my) (?:healthcare )?(?:visit|appointment)|(?:can you )?explain the visit preparation guide)$/, references('prepare-visit', preparation)],
  [/^what (?:should|can) i (?:note|write down) about (?:my )?concerns (?:before|for) (?:a|my) (?:visit|appointment)$/, references('prepare-visit', [preparation[1]])],
  [/^(?:what (?:should|can) i (?:ask|bring|list) about (?:my )?(?:medicines|supplements|allergies) (?:before|for|at) (?:a|my) (?:visit|appointment)|should i bring (?:a )?(?:medicines|supplements|allergies) list (?:to|for) (?:a|my) (?:visit|appointment))$/, references('prepare-visit', [preparation[2]])],
  [/^(?:what (?:questions (?:should|can) i ask|should i ask) about (?:a|my) test|how (?:can|do) i prepare questions about (?:a|my) test|(?:can you )?explain the test questions guide)$/, references('test-questions', testPrompts)],
  [/^(?:what (?:should|can) i ask about (?:my )?test preparation|who (?:should|can) i ask about (?:my )?test preparation|where (?:can|should) i (?:ask for|check) (?:my )?test preparation instructions)$/, references('test-questions', [testPrompts[1]])],
  [/^(?:what (?:questions (?:should|can) i ask|should i ask) about (?:my )?test results|who (?:should|can) i contact (?:if|when) (?:my )?(?:test )?results are (?:late|delayed)|what (?:should|can) i ask (?:if|when) (?:my )?(?:test )?results are (?:late|delayed)|how (?:can|do) i follow up (?:on|about) (?:my )?test results)$/, references('test-questions', testPrompts.slice(2))],
  [/^(?:what (?:should|can) i (?:ask|confirm|check) before (?:i leave (?:my|the) appointment|leaving (?:my|the) appointment)|what (?:should|can) i ask about (?:the )?next steps? (?:after|at) (?:my|a) (?:visit|appointment)|(?:can you )?explain the before you leave guide)$/, references('before-you-leave', leaving)],
  [/^what happens next after (?:my|a) appointment$/, references('before-you-leave', [leaving[0]])],
  [/^who (?:can|should) i contact (?:with|for) questions after (?:my|a) (?:visit|appointment)$/, references('before-you-leave', [leaving[2]])],
];

function freeze(value) {
  Object.values(value).forEach((child) => { if (child && typeof child === 'object') freeze(child); });
  return Object.freeze(value);
}

function fallback(reason, guideId = 'prepare-visit') {
  return { kind: 'fallback', mode: 'evaluation-fixture', reason,
    reading: { name: 'guide', id: guideId }, search: { name: 'learn' } };
}

function selectEvidence(question, catalog) {
  if (typeof question !== 'string' || !question.trim()) return { reason: 'empty-input' };
  if (question.length > 500) return { reason: 'unsupported-question' };
  const text = question.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ').replace(/[?!.]+$/, '');
  // Full-question matches deliberately leave mixed requests and untested wording unsupported.
  const route = routes.find(([pattern]) => pattern.test(text));
  if (!route) return { reason: 'unsupported-question' };
  let guides;
  try { guides = selectPublicCatalog(catalog).guides.filter((guide) => GUIDE_IDS.includes(guide.id) && guide.review.status === 'source-checked'); }
  catch { return { reason: 'evidence-unavailable' }; }
  const available = guides.flatMap((guide) => guide.body.flatMap((block, index) => {
    const sources = guide.sources.map(({ publisher, title, url, checkedAt }) => ({ publisher, title, url, checkedAt }));
    const item = (body, itemIndex) => ({ evidenceId: `${guide.id}:${index}${itemIndex === undefined ? '' : ':' + itemIndex}`,
      guideId: guide.id, guideTitle: guide.title, heading: block.heading || null, text: body, sources });
    if (!block.type || block.type === 'paragraph') return [item(block.text)];
    return block.type === 'list' ? block.items.map(item) : [];
  }));
  const evidence = route[1].map(({ guideId, match }) => available.find((item) => item.guideId === guideId &&
    (typeof match === 'string' ? item.heading === match : match.test(item.text))));
  if (evidence.some((item) => !item)) return { reason: 'evidence-unavailable' };
  return { evidence: freeze(evidence) };
}

function deterministicFixture({ evidence }) {
  return { statements: evidence.map(({ evidenceId, text, sources }) => ({ evidenceId, text, citations: sources.map((source) => source.url) })) };
}

const record = (value) => Boolean(value && typeof value === 'object' && !Array.isArray(value) &&
  [Object.prototype, null].includes(Object.getPrototypeOf(value)));

function acceptedStatements(response, evidence) {
  if (!record(response) || Object.keys(response).some((key) => key !== 'statements') ||
    !Array.isArray(response.statements) || !response.statements.length || response.statements.length > evidence.length) return null;
  const seen = new Set(), statements = [];
  for (const item of response.statements) {
    if (!record(item)) return null;
    const selected = evidence.find((entry) => entry.evidenceId === item.evidenceId);
    if (!selected || seen.has(item.evidenceId) || Object.keys(item).length !== 3 || Object.keys(item).some((key) => !['evidenceId', 'text', 'citations'].includes(key)) ||
      item.text !== selected.text || !Array.isArray(item.citations) || !item.citations.length ||
      new Set(item.citations).size !== item.citations.length || item.citations.some((url) => !selected.sources.some((source) => source.url === url))) return null;
    seen.add(item.evidenceId);
    statements.push({ evidenceId: selected.evidenceId, guideId: selected.guideId, text: selected.text,
      sources: item.citations.map((url) => ({ ...selected.sources.find((source) => source.url === url) })) });
  }
  return statements;
}

async function evaluateGuideQuestion(question, { catalog = bundledCatalog, respond = deterministicFixture, timeoutMs = 1000 } = {}) {
  const selected = selectEvidence(question, catalog);
  if (!selected.evidence) return fallback(selected.reason);
  const guideId = selected.evidence[0].guideId;
  if (typeof respond !== 'function' || !Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 30000) return fallback('service-unavailable', guideId);
  let timer;
  try {
    const response = await Promise.race([
      Promise.resolve().then(() => respond({ evidence: selected.evidence })),
      new Promise((resolve, reject) => { timer = setTimeout(() => reject(new Error('Response unavailable.')), timeoutMs); }),
    ]);
    const statements = acceptedStatements(response, selected.evidence);
    return statements ? { kind: 'draft', mode: 'evaluation-fixture', explanation: 'You can use these prompts with your care team.', statements }
      : fallback('invalid-response', guideId);
  } catch { return fallback('service-unavailable', guideId); }
  finally { clearTimeout(timer); }
}

module.exports = { evaluateGuideQuestion, deterministicFixture };
