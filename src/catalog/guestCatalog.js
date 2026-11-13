const { validateCatalog } = require('./catalog');
const base = require('./catalog.json');
// Metro resolves this generated draft file in ignored private staging.
const legacy = require('./legacy-guides.json');
module.exports = validateCatalog({ ...base, guides: [...base.guides, ...legacy] });
