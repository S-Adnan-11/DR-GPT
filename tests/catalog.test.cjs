const test = require('node:test');
const assert = require('node:assert/strict');
const fixture = require('../src/catalog/catalog.json');
const { validateCatalog, filterFacilities, locationCandidates, searchGuides, selectPublicCatalog } = require('../src/catalog/catalog');
const copy = () => JSON.parse(JSON.stringify(fixture));

test('the bundled catalog is explicitly fictional and has no callable destinations', () => {
  assert.equal(validateCatalog(fixture), fixture);
  for (const facility of fixture.facilities) {
    assert.equal(facility.status, 'fixture');
    for (const field of ['coordinates', 'hours', 'contactUrl', 'bookingUrl']) assert.equal(Object.hasOwn(facility, field), false);
  }
});

test('combined directory filters distinguish branches and produce a useful empty result', () => {
  assert.deepEqual(filterFacilities(fixture.facilities, { area: ' sample area a ', facilityType: 'clinic', service: 'general practice' }).map((facility) => facility.id), ['fixture-harbour-clinic-a']);
  assert.deepEqual(filterFacilities(fixture.facilities, { query: 'harbour', area: 'Sample area B', service: 'Dental care' }).map((facility) => facility.id), ['fixture-harbour-clinic-b']);
  assert.deepEqual(filterFacilities(fixture.facilities, { area: 'Sample area A', service: 'Eye care' }), []);
  assert.equal(filterFacilities(fixture.facilities).length, 4);
  assert.equal(filterFacilities(fixture.facilities, { service: 'Dental care' }).length, 2);
});

test('missing optional service/location data keeps a facility available to address search', () => {
  assert.deepEqual(filterFacilities(fixture.facilities, { query: 'example address b2' }).map((facility) => facility.id), ['fixture-meadow-clinic']);
  assert.equal(filterFacilities(fixture.facilities, { query: 'meadow', service: 'General practice' }).length, 0);
  assert.equal(searchGuides(fixture.guides, ' VISIT ').length, 1);
  assert.equal(searchGuides(fixture.guides, 'no match').length, 0);
});

test('duplicate IDs, invalid review dates and invalid optional fields are rejected', () => {
  const cases = [
    (catalog) => { catalog.facilities[1].id = catalog.facilities[0].id; },
    (catalog) => { catalog.guides[0].review = { status: 'reviewed', reviewedAt: '2026-11-08' }; },
    (catalog) => { catalog.guides[0].review.reviewedAt = '2026-11-08'; },
    (catalog) => { catalog.snapshot.updatedAt = '2026-02-30'; },
    (catalog) => { catalog.facilities[0].serviceTags = null; },
    (catalog) => { catalog.facilities[0].coordinates = { latitude: 100, longitude: 3 }; },
    (catalog) => { catalog.facilities[0].contactUrl = 'https://example.invalid'; },
  ];
  for (const mutate of cases) { const catalog = copy(); mutate(catalog); assert.throws(() => validateCatalog(catalog)); }
});

test('draft guidance and fictional facilities are excluded from public content and AI grounding', () => {
  const published = selectPublicCatalog(fixture);
  assert.deepEqual(published.guides, []);
  assert.deepEqual(published.firstAid, []);
  assert.deepEqual(published.facilities, []);
  assert.equal(fixture.snapshot.kind, 'fixture');
  const invalid = copy(); invalid.snapshot.kind = 'published';
  assert.throws(() => validateCatalog(invalid));
});

test('published records need field evidence and registration alone cannot establish services', () => {
  const catalog = copy();
  catalog.snapshot.kind = 'published'; catalog.guides = []; catalog.firstAid = [];
  catalog.facilities = [catalog.facilities[0]];
  const facility = catalog.facilities[0];
  facility.id = 'review-example'; facility.status = 'published';
  facility.sources = [{ id: 'source-example', kind: 'registration', url: 'https://example.invalid/registration', checkedAt: '2026-11-08', fields: ['name', 'branchLabel', 'address', 'area', 'facilityType', 'serviceTags'] }];
  assert.throws(() => validateCatalog(catalog), /serviceTags/);
  facility.sources.push({ id: 'official-example', kind: 'official', url: 'https://example.invalid/services', checkedAt: '2026-11-08', fields: ['serviceTags'] });
  assert.equal(validateCatalog(catalog), catalog);
  facility.hours = 'Example hours';
  assert.throws(() => validateCatalog(catalog), /hours/);
  delete facility.hours;
  facility.sources[0].checkedAt = '2026-02-30';
  assert.throws(() => validateCatalog(catalog), /check date/);
});

test('only sourced, dated reviewed guides can enter a published snapshot', () => {
  const catalog = copy();
  catalog.guides[0].review = { status: 'reviewed', reviewedAt: '2026-11-08' };
  catalog.guides[0].sources = [{ title: 'Example reference for contract testing', url: 'https://example.invalid/reference' }];
  const published = selectPublicCatalog(catalog);
  assert.deepEqual(published.guides.map((guide) => guide.id), ['prepare-visit']);
  assert.deepEqual(published.firstAid, []);
});

test('a draft catalog can hold real unpublished records without exposing them', () => {
  const catalog = copy();
  catalog.snapshot.kind = 'draft';
  catalog.facilities = [catalog.facilities[0]];
  catalog.facilities[0].id = 'unpublished-example';
  catalog.facilities[0].status = 'draft';
  catalog.facilities[0].sources = [{ id: 'official-example', kind: 'official', url: 'https://example.invalid/facility', checkedAt: '2026-11-08', fields: ['name', 'address'] }];
  assert.equal(validateCatalog(catalog), catalog);
  assert.deepEqual(selectPublicCatalog(catalog).facilities, []);
  catalog.facilities[0].status = 'published';
  assert.throws(() => validateCatalog(catalog), /facilityType/);
});

test('branch labels remain searchable with combined filters and require field evidence', () => {
  assert.deepEqual(filterFacilities(fixture.facilities, { query: 'sample area b branch', area: 'Sample area B', facilityType: 'Clinic', service: 'Dental care' }).map((f) => f.id), ['fixture-harbour-clinic-b']);
  const catalog = copy(); catalog.snapshot.kind = 'published'; catalog.guides = []; catalog.firstAid = [];
  catalog.facilities = [{ ...catalog.facilities[0], id:'contract-branch', status:'published', sources:[{id:'contract-source',kind:'official',url:'https://example.invalid/branch',checkedAt:'2026-11-10',fields:['name','address','area','facilityType','serviceTags']}] }];
  assert.throws(() => validateCatalog(catalog), /branchLabel/);
  catalog.facilities[0].sources[0].fields.push('branchLabel');
  assert.equal(validateCatalog(catalog), catalog);
  catalog.facilities[0].branchLabel = '';
  assert.throws(() => validateCatalog(catalog), /branch label/);
});

test('location candidates preserve branch IDs and exclude missing, invalid or unsourced points', () => {
  assert.deepEqual(locationCandidates(fixture.facilities), []);
  const branch = {...fixture.facilities[0],status:'published',coordinates:{latitude:6.5,longitude:3.3},sources:[{id:'contract-map',kind:'official',url:'https://example.invalid/position',checkedAt:'2026-11-10',fields:['coordinates']}]};
  const candidates = locationCandidates([branch, {...fixture.facilities[1],status:'published'}]);
  assert.deepEqual(candidates.map((f)=>f.id), ['fixture-harbour-clinic-a']);
  assert.equal(candidates[0].address, branch.address);
  candidates[0].coordinates.latitude = 0; assert.equal(branch.coordinates.latitude,6.5);
  for (const point of [undefined,null,{latitude:'6.5',longitude:3.3},{latitude:NaN,longitude:3.3},{latitude:6.5,longitude:Infinity},{latitude:91,longitude:3.3},{latitude:6.5,longitude:-181}]) assert.deepEqual(locationCandidates([{...branch,coordinates:point}]),[]);
  for (const change of [{status:'fixture'},{status:'draft'},{sources:[]},{sources:[{...branch.sources[0],fields:['address']}]},{sources:[{...branch.sources[0],checkedAt:'2026-02-30'}]}]) assert.deepEqual(locationCandidates([{...branch,...change}]),[]);
  const catalog=copy();catalog.snapshot.kind='draft';catalog.facilities=[{...branch,id:'contract-position',status:'draft',coordinates:{latitude:6.5,longitude:181}}];
  assert.throws(()=>validateCatalog(catalog),/coordinates/);
});
