const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const textList = (value) => Array.isArray(value) && value.every(nonempty);
const date = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const https = (value) => typeof value === 'string' && /^https:\/\/[^\s/?#]+(?:[/?#][^\s]*)?$/.test(value);
const check = (condition, message) => { if (!condition) throw new Error(message); };
const normalized = (value = '') => String(value).trim().toLowerCase();
const usableCoordinates = (point) => Boolean(point && Number.isFinite(point.latitude) && Math.abs(point.latitude) <= 90 && Number.isFinite(point.longitude) && Math.abs(point.longitude) <= 180);
const validId = (value) => typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/.test(value);

function validBlock(block, images) {
  if (!block || typeof block !== 'object') return false;
  // Keep the original preparation-guide sections readable without a migration.
  if (block.type === undefined) return nonempty(block.heading) && nonempty(block.text);
  if (['heading', 'paragraph'].includes(block.type)) return nonempty(block.text);
  if (block.type === 'list') return textList(block.items) && block.items.length > 0;
  return block.type === 'image' && images.includes(block.imageId) && nonempty(block.alt) && block.fit === 'contain';
}

function validateGuide(guide) {
  check(nonempty(guide.title) && nonempty(guide.summary) && textList(guide.topics) && guide.topics.length > 0, 'Guide metadata is incomplete.');
  check(textList(guide.images), 'Guide image IDs must be an array.');
  check(Array.isArray(guide.body) && guide.body.every((block) => validBlock(block, guide.images)), 'Guide body is invalid.');
  if (hasOwn(guide, 'category')) check(nonempty(guide.category), 'Guide category is invalid.');
  check(Array.isArray(guide.sources) && guide.sources.every((source) => nonempty(source.title) && https(source.url)), 'Guide sources must identify HTTPS references.');
  check(['draft', 'source-checked', 'reviewed'].includes(guide.review?.status), 'Guide review status is invalid.');
  if (hasOwn(guide, 'relatedGuides')) check(textList(guide.relatedGuides) && guide.relatedGuides.every(validId), 'Related guide IDs are invalid.');
  if (hasOwn(guide, 'cover')) check(nonempty(guide.cover?.step) && nonempty(guide.cover?.label), 'Guide cover is invalid.');
  if (guide.review.status === 'source-checked') {
    check(!guide.legacy && guide.review.reviewedAt === null && date(guide.review.checkedAt) && guide.body.length > 0 && guide.sources.length > 0 &&
      guide.sources.every((source) => nonempty(source.publisher) && date(source.checkedAt) && source.checkedAt === guide.review.checkedAt), 'Source-checked guides need dated publisher attribution and an editorial source check.');
  }
  if (guide.review.status === 'reviewed') {
    check(date(guide.review.reviewedAt) && guide.sources.length > 0 && guide.body.length > 0, 'Reviewed guides need a review date, body and sources.');
  } else if (guide.review.status === 'draft') {
    check(guide.review.reviewedAt === null, 'Draft guides must not claim a review date.');
  }
}

function validateFacility(facility) {
  for (const field of ['name', 'facilityType', 'area', 'address']) check(nonempty(facility[field]), `Facility ${field} is required.`);
  check(['fixture', 'draft', 'published'].includes(facility.status), 'Facility status is invalid.');
  check(Array.isArray(facility.sources) && facility.sources.length > 0, 'Facility source records are required.');
  for (const source of facility.sources) {
    check(nonempty(source.id) && ['fixture', 'official', 'registration', 'independent'].includes(source.kind) && textList(source.fields), 'Facility source record is invalid.');
    if (source.kind !== 'fixture') check(https(source.url) && date(source.checkedAt), 'Real facility sources need an HTTPS URL and check date.');
  }
  if (hasOwn(facility, 'serviceTags')) check(textList(facility.serviceTags), 'Unknown services must be omitted.');
  if (hasOwn(facility, 'branchLabel')) check(nonempty(facility.branchLabel), 'Facility branch label must be supplied or omitted.');
  if (hasOwn(facility, 'coordinates')) check(usableCoordinates(facility.coordinates), 'Facility coordinates are invalid.');
  for (const field of ['contactUrl', 'bookingUrl']) {
    if (hasOwn(facility, field)) check(https(facility[field]), `Facility ${field} must be an official HTTPS destination.`);
  }
  if (hasOwn(facility, 'hours')) check(nonempty(facility.hours), 'Unknown hours must be omitted.');
  if (facility.status === 'fixture') {
    check(facility.id.startsWith('fixture-') && facility.sources.every((source) => source.kind === 'fixture'), 'Fixture facilities need fictional IDs and sources.');
    check(['coordinates', 'contactUrl', 'bookingUrl', 'hours'].every((field) => !hasOwn(facility, field)), 'Fixture facilities cannot supply real destinations or hours.');
  }
  if (facility.status === 'published') {
    check(facility.sources.every((source) => source.kind !== 'fixture'), 'Fictional sources cannot support a published facility.');
    const fields = ['name', 'facilityType', 'area', 'address', ...['branchLabel', 'serviceTags', 'coordinates', 'hours', 'contactUrl', 'bookingUrl'].filter((field) => hasOwn(facility, field))];
    for (const field of fields) {
      check(facility.sources.some((source) => source.fields.includes(field) &&
        (!['serviceTags', 'hours', 'contactUrl', 'bookingUrl'].includes(field) || source.kind === 'official')), `Published facility ${field} needs supporting evidence; services and contact details need an official source.`);
    }
  }
}

function validateCatalog(catalog) {
  check(catalog?.schemaVersion === 1, 'Unsupported catalog schema.');
  check(['fixture', 'draft', 'published'].includes(catalog.snapshot?.kind) && date(catalog.snapshot.updatedAt) && nonempty(catalog.snapshot.coverage), 'Catalog snapshot metadata is required.');
  const ids = new Set();
  for (const [key, validate] of [['guides', validateGuide], ['firstAid', validateGuide], ['facilities', validateFacility]]) {
    check(Array.isArray(catalog[key]), `Catalog ${key} must be an array.`);
    for (const record of catalog[key]) {
      check(validId(record.id) && !ids.has(record.id), 'Catalog IDs must be valid and unique across all records.');
      ids.add(record.id);
      validate(record);
      if (key === 'facilities') check(catalog.snapshot.kind === 'fixture' ? record.status === 'fixture' : record.status !== 'fixture', 'Snapshot and facility kinds must agree.');
      if (key === 'firstAid') check(record.review.status !== 'source-checked', 'First aid requires qualified review.');
      if (catalog.snapshot.kind === 'published') check(key === 'facilities' ? record.status === 'published' : key === 'guides' ? ['source-checked', 'reviewed'].includes(record.review.status) : record.review.status === 'reviewed', 'Published snapshots cannot contain drafts.');
    }
  }
  for (const guide of catalog.guides) check((guide.relatedGuides || []).every((id) => id !== guide.id && catalog.guides.some((item) => item.id === id)), 'Related guides must resolve in this catalog.');
  return catalog;
}

function filterFacilities(facilities, { query = '', area = '', facilityType = '', service = '' } = {}) {
  const term = normalized(query);
  return facilities.filter((facility) =>
    (!term || [facility.name, facility.branchLabel, facility.address, facility.area, facility.facilityType, ...(facility.serviceTags || [])].some((text) => normalized(text).includes(term))) &&
    (!normalized(area) || normalized(facility.area) === normalized(area)) &&
    (!normalized(facilityType) || normalized(facility.facilityType) === normalized(facilityType)) &&
    (!normalized(service) || (facility.serviceTags || []).some((tag) => normalized(tag) === normalized(service)))
  );
}

// A location preview must use the same branch IDs as the list. Drafts and
// fictional records cannot become pins, even if malformed input adds a point.
function locationCandidates(facilities) {
  return facilities.filter((facility) => facility.status === 'published' && nonempty(facility.id) && usableCoordinates(facility.coordinates) &&
    facility.sources?.some((source) => ['official', 'registration', 'independent'].includes(source.kind) && source.fields?.includes('coordinates') && https(source.url) && date(source.checkedAt)))
    .map((facility) => ({ id: facility.id, name: facility.name, address: facility.address, coordinates: { ...facility.coordinates } }));
}

function searchGuides(guides, query = '', category = '') {
  const term = normalized(query);
  return guides.filter((guide) => (!category || guide.category === category) &&
    [guide.title, guide.summary, guide.category, ...guide.topics].some((text) => normalized(text).includes(term)));
}

function selectPublicCatalog(catalog) {
  validateCatalog(catalog);
  return validateCatalog({
    schemaVersion: 1,
    snapshot: { ...catalog.snapshot, kind: 'published' },
    guides: catalog.guides.filter((guide) => ['reviewed', 'source-checked'].includes(guide.review.status)).map((guide) => ({ ...guide,
      ...(guide.relatedGuides ? { relatedGuides: guide.relatedGuides.filter((id) => catalog.guides.some((item) => item.id === id && ['reviewed', 'source-checked'].includes(item.review.status))) } : {}),
    })),
    firstAid: catalog.firstAid.filter((guide) => guide.review.status === 'reviewed'),
    facilities: catalog.facilities.filter((facility) => facility.status === 'published'),
  });
}

module.exports = { validateCatalog, filterFacilities, locationCandidates, searchGuides, selectPublicCatalog };
