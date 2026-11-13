# Visit-guide response evaluation

`src/guest/guideEvaluation.js` is an offline evaluation boundary. It is not imported by the guest interface. Ask AI continues to offer the existing reading/search fallback. No provider, account, transport, logging or persistence is added.

`evaluateGuideQuestion(question, options)` accepts a question and returns either an explicitly marked `evaluation-fixture` draft or routes to the preparation guide and library search. The default responder is deterministic; tests can inject a responder with `options.respond`. `options.catalog` permits contract checks, and `options.timeoutMs` bounds a response wait (1–30,000 ms, default 1,000 ms).

The evaluation accepts a small set of complete English question forms about visit preparation, conversation prompts for tests/results and appointment follow-up. It normalizes case, whitespace and final punctuation. Unsupported wording and mixed requests fall back before a responder is called. This intentionally narrow routing is not a diagnosis, treatment or clinical safety classifier.

Evidence comes through the existing publication selector and is limited to the three source-checked visit-guide IDs. A draft or missing guide, malformed catalog or missing expected section returns the fallback. Selected evidence identifies a current body block or list item and carries the guide's publisher, page title, reference URL and editorial check date. Section headings and test-prompt text are matched against the current records, so a missing match requires a routing review.

The responder receives only frozen selected evidence, without the raw question or the private catalog. Its result has this shape:

```js
{
  statements: [
    { evidenceId, text, citations: [sourceUrl] }
  ]
}
```

Every statement must identify evidence selected for that question, retain its exact guide text, and cite at least one source attached to that evidence. Missing/unknown citations, known-but-unselected evidence, extra fields, duplicate evidence/citations and altered text are rejected. Returned source metadata is reconstructed from the selected catalog records. Exceptions, rejected promises and response timeouts also return reading/search. A timeout stops waiting; it cannot cancel an arbitrary injected responder.

This extractive draft contract verifies reference lineage. It does not validate novel paraphrases, establish clinical review, prove a source supports every possible interpretation, or evaluate model quality. A future paraphrasing/provider boundary needs its own supported-claim evaluation and privacy decision. The fixture result must remain outside the public interface as live AI.

Run `npm run test:guest` with the pinned Node version. The new synthetic contract tests cover supported routes, unsupported/mixed requests, citation attribution, publication exclusions and response failures. Existing storage, navigation and public asset behavior are unchanged.
