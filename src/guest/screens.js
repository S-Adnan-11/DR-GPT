import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, CardLink, Heading, Notice, Paragraph, Picture, Pill, Subheading, TextLink } from './components';
import { illustrations, topics, recordImage, imageById } from './illustrations';
import s from './styles';
const { filterFacilities, locationCandidates, searchGuides } = require('../catalog/catalog');
const { QUESTIONS } = require('./store');
const { VISIT_QUESTIONS } = require('./visitQuestions');

export function Home({ go, catalog }) {
  return <>
    <Heading eyebrow="A good place to start">Your health,{ '\n' }at your pace.</Heading>
    <Paragraph muted>Understand a little more. Feel more prepared for what comes next.</Paragraph>
    <View style={s.hero}><GuideCover guide={catalog.guides.find((guide) => guide.id === 'prepare-visit')} /><View style={s.heroBody}>
      <Text style={[s.eyebrow, { color: '#c4d7ff' }]}>Start with a question</Text><Text accessibilityRole="header" style={s.heroHeading}>Make the most of your visit.</Text>
      <Text style={s.heroText}>A few questions can help you prepare for a conversation with care.</Text>
      <Button hero title="Open the preparation guide" onPress={() => go('guide', 'prepare-visit')} />
    </View></View>
    <Subheading>What would help today?</Subheading>
    <CardLink title="Explore the library" description="Browse topics and read at your own pace." icon="≡" onPress={() => go('learn')} />
    <CardLink title="Find a place for care" description="Search by area, facility or service." icon="⌖" onPress={() => go('care')} />
    <View style={s.aidBanner}><Text style={s.h3}>First aid, within reach</Text><Paragraph muted small>A direct route to guidance.</Paragraph><Button secondary title="Open first aid" onPress={() => go('firstAid')} /></View>
    <CardLink title="Ask AI about a guide" description="AI is unavailable. Reading and search are available offline." icon="✧" onPress={() => go('ask')} />
    <Subheading>Keep useful things close.</Subheading><Paragraph muted small>Save a guide or a sample facility on this device. No account needed.</Paragraph><TextLink title="View saved items" onPress={() => go('saved')} />
  </>;
}

function reviewLabel(guide) {
  return guide.legacy ? 'Legacy draft · Not reviewed' : guide.review.status === 'source-checked' ? 'Editorial source check' : guide.review.status === 'draft' ? 'Draft · Not reviewed' : 'Reviewed';
}

function GuideCover({ guide }) {
  if (guide.images.length) return <Picture source={recordImage(guide)} decorative />;
  return guide.cover ? <View style={s.guideCover}><Text style={s.coverStep}>{guide.cover.step}</Text><Text style={s.coverLabel}>{guide.cover.label}</Text></View> : null;
}

function GuideCard(props) {
  const { guide, go } = props;
  return <View style={s.card} testID={`guide-card-${guide.id}`}>
    <TouchableOpacity accessibilityRole="button" accessibilityHint="Open guide" onPress={() => go('guide', guide.id)} style={{ gap: 10 }}>
      <GuideCover guide={guide} />
      <Text style={s.h3}>{guide.title}</Text><Paragraph muted small>{guide.summary}</Paragraph>
      <Pill draft={guide.review.status === 'draft'}>{reviewLabel(guide)}</Pill>
    </TouchableOpacity>
    <SaveButton {...props} kind="guides" id={guide.id} />
  </View>;
}

export function Learn(props) {
  const { catalog, go, guideQuery, setGuideQuery, guideCategory, setGuideCategory, showLegacy, setShowLegacy } = props;
  const { fontScale } = useWindowDimensions();
  const library = catalog.guides.filter((guide) => showLegacy ? Boolean(guide.legacy) : !guide.legacy);
  const guides = searchGuides(library, guideQuery, guideCategory);
  const categories = [...new Set(library.map((guide) => guide.category).filter(Boolean))].sort();
  const legacyCount = catalog.guides.filter((guide) => guide.legacy).length;
  return <>
    <Heading eyebrow="Learn">A little more understanding.</Heading>
    <Paragraph muted small>Read offline and save on this device. Questions to help you prepare, discuss a test and confirm what happens next.</Paragraph>
    {!showLegacy ? <CardLink title="Visit questions" description="Choose a question and read an answer from the guides." onPress={() => go('visitQuestions')} /> : null}
    <Subheading>{showLegacy ? 'Legacy draft library' : 'For your healthcare visit'}</Subheading>
    {showLegacy ? <Notice>These 24 retained articles await editorial and clinical review. Existing saves still open here.</Notice> : null}
    {legacyCount ? <TextLink title={showLegacy ? 'Back to the visit collection' : `Browse legacy drafts (${legacyCount})`} onPress={() => { setShowLegacy(!showLegacy); setGuideCategory(''); }} /> : null}
    <Text style={s.label}>Search guides</Text><TextInput accessibilityLabel="Search guides" placeholder="Title, description or topic" placeholderTextColor="#68758b" value={guideQuery} onChangeText={setGuideQuery} style={s.input} maxLength={100} autoCorrect={false} />
    {guideQuery ? <TextLink title="Clear guide search" onPress={() => setGuideQuery('')} /> : null}
    <Text style={s.label}>Guide category</Text><View style={s.pickerBox}><Picker accessibilityLabel="Guide category" selectedValue={guideCategory} onValueChange={setGuideCategory} style={[s.picker, { minHeight: Math.max(52, 44 * fontScale) }]}><Picker.Item label="All categories" value="" />{categories.map((category) => <Picker.Item key={category} label={category} value={category} />)}</Picker></View>
    <Text accessibilityLiveRegion="polite" style={[s.text, s.muted, s.small]}>{guides.length} {guides.length === 1 ? 'guide' : 'guides'}</Text>
    {guides.length ? guides.map((guide) => <GuideCard key={guide.id} {...props} guide={guide} />) : <View style={s.empty}><Subheading>No matching guides</Subheading><Paragraph>Search checks titles, descriptions and topics in this bundled library. Try another word or category.</Paragraph><Button secondary title="Show all guides" onPress={() => { setGuideQuery(''); setGuideCategory(''); }} /></View>}
    {showLegacy ? <><Subheading>Explore a legacy topic</Subheading><View style={s.topics}>{topics.map((topic) => <TouchableOpacity key={topic.id} accessibilityRole="button" onPress={() => go('topic', topic.id)} style={[s.topic, fontScale > 1.4 && { flexBasis: '100%' }]}><View style={[s.picture, s.topicImage]}><Image source={illustrations[topic.id]} accessible={false} resizeMode="cover" style={s.fillImage} /></View><Text style={s.topicText}>{topic.title}</Text></TouchableOpacity>)}</View>
    <Paragraph muted small>Original topic illustrations. Articles are available as private review drafts.</Paragraph></> : null}
  </>;
}

function SaveButton({ kind, id, saved, busy, update }) {
  const selected = saved?.[kind].includes(id) || false;
  return <Button secondary selected={selected} disabled={!saved || busy} title={selected ? 'Saved on this device · Remove' : `Save ${kind === 'guides' ? 'guide' : 'facility'} on this device`} onPress={() => update('toggle', kind, id)} />;
}

function ArticleBody({ body }) {
  return body.map((block, index) => {
    if (!block.type) return <View key={index} style={{ gap: 10 }}><Subheading>{block.heading}</Subheading><Paragraph>{block.text}</Paragraph></View>;
    if (block.type === 'heading') return <Subheading key={index}>{block.text}</Subheading>;
    if (block.type === 'paragraph') return <Paragraph key={index}>{block.text}</Paragraph>;
    if (block.type === 'image') return <Picture key={index} source={imageById(block.imageId)} label={block.alt} article />;
    return <View key={index} role="list" style={{ gap: 10 }}>{block.items.map((text, item) => <View key={item} role="listitem"><Paragraph>{text}</Paragraph></View>)}</View>;
  });
}

export function Guide(props) {
  const guide = props.catalog.guides.find((item) => item.id === props.route.id);
  if (!guide) return <><Heading>Guide unavailable</Heading><Paragraph>This guide is no longer in the bundled library.</Paragraph><Button title="Open Saved" onPress={() => props.go('saved')} /></>;
  return <>
    <Heading eyebrow="Learn · Offline guide">{guide.title}</Heading><Pill draft={guide.review.status === 'draft'}>{reviewLabel(guide)}</Pill><Paragraph muted>{guide.summary}</Paragraph>
    {guide.legacy ? <Notice>Retained legacy draft. Health claims and inherited references have not been checked for this build. This material is awaiting editorial and qualified clinical review. Old resource actions are shown as text.</Notice> : <GuideCover guide={guide} />}
    <SaveButton {...props} kind="guides" id={guide.id} />
    {guide.review.status === 'source-checked' && VISIT_QUESTIONS.some((prompt) => prompt.guideId === guide.id) ? <CardLink title="Visit questions" description="Choose a question and read an answer from the guides." onPress={() => props.go('visitQuestions')} /> : null}
    <ArticleBody body={guide.body} />
    {!guide.legacy && guide.review.status === 'draft' ? <Notice>This general preparation draft has not had a content review.</Notice> : null}
    <Subheading>Sources & review</Subheading>
    {guide.review.status === 'source-checked' ? <Paragraph muted small>Editorial source check: {guide.review.checkedAt}. The prompts were checked against the pages below. This is not a clinical review.</Paragraph> : <Paragraph muted small>Review date: {guide.review.reviewedAt || 'not reviewed'}.</Paragraph>}
    {guide.sources.length ? <><Paragraph muted small>{guide.legacy ? 'References inherited from the original article; availability, relevance and claims are unverified. External actions remain unavailable offline.' : 'Source details are available offline. Links are shown for reference; this offline build does not open external pages.'}</Paragraph>{guide.sources.map((source) => <View key={source.url} style={{ gap: 4 }}>{source.publisher ? <Paragraph small>{source.publisher}</Paragraph> : null}<Paragraph small>{source.title}</Paragraph><Text selectable style={[s.text, s.small, s.sourceUrl]}>{source.url}</Text>{source.checkedAt ? <Paragraph muted small>Editorial source check: {source.checkedAt}</Paragraph> : null}</View>)}</> : <Paragraph muted small>No references attached yet.</Paragraph>}
    {guide.relatedGuides?.length ? <><Subheading>Keep preparing</Subheading>{guide.relatedGuides.map((id) => props.catalog.guides.find((item) => item.id === id)).filter(Boolean).map((related) => <CardLink key={related.id} title={related.title} description={related.summary} onPress={() => props.go('guide', related.id)} />)}</> : null}
    <View style={s.rule} /><CardLink title="Your visit checklist" description="Keep a short list of general questions." icon="✓" onPress={() => props.go('prepare')} />
    <CardLink title="Ask AI about this guide" description="AI is unavailable. Continue reading or searching." icon="✧" onPress={() => props.go('ask')} />
  </>;
}

export function FirstAid({ catalog, go }) {
  return <><Heading eyebrow="Always easy to find">First aid.</Heading><Paragraph muted>Choose a situation to open its guide.</Paragraph><Picture source={illustrations.firstAid} label="Original first-aid photograph" article />
    <Notice>Guidance is awaiting qualified review. This private test does not provide first-aid instructions or an emergency contact action.</Notice>
    {catalog.firstAid.map((guide) => <CardLink key={guide.id} title={guide.title} description="Awaiting review" image={recordImage(guide)} onPress={() => go('firstAidDetail', guide.id)} />)}
  </>;
}

export function FirstAidDetail({ catalog, route, go }) {
  const guide = catalog.firstAid.find((item) => item.id === route.id);
  return <><Heading eyebrow="First aid">{guide.title}</Heading><Image source={recordImage(guide)} accessibilityLabel="Original first-aid illustration" resizeMode="contain" style={s.aidImage} /><Pill draft>Draft · Not reviewed</Pill>
    <View style={s.card}><Subheading>Reviewed steps will appear here.</Subheading><Paragraph>First-aid content needs qualified review before it can be used.</Paragraph><Paragraph muted small>Regional contact: awaiting verification.</Paragraph></View>
    <Subheading>Sources & review</Subheading><Paragraph muted small>Review date: not reviewed. No approved guidance or contact number is attached.</Paragraph><Button secondary title="Back to first-aid topics" onPress={() => go('firstAid')} />
  </>;
}

export function FacilityCard({ facility, go }) {
  return <TouchableOpacity accessibilityRole="button" onPress={() => go('facility', facility.id)} style={s.card}>
    <Pill>Fictional</Pill><Text style={s.h3}>{facility.name}</Text>{facility.branchLabel ? <Text style={s.label}>{facility.branchLabel}</Text> : null}<Paragraph muted small>{facility.facilityType} · {facility.area}</Paragraph><Paragraph small>{facility.address}</Paragraph><Paragraph muted small>{facility.serviceTags?.length ? `Sample services: ${facility.serviceTags.join(' · ')}` : 'Services not supplied'}</Paragraph>
  </TouchableOpacity>;
}

export function Care({ catalog, go, filters, setFilters }) {
  const { fontScale } = useWindowDimensions();
  const results = filterFacilities(catalog.facilities, filters);
  const reset = () => setFilters({ query: '', area: '', facilityType: '', service: '' });
  const fields = [
    ['area', 'Area', 'All areas', ['Sample area A', 'Sample area B']],
    ['facilityType', 'Facility type', 'All types', ['Clinic', 'Hospital']],
    ['service', 'Service', 'All services', ['General practice', 'Dental care', 'Eye care']],
  ];
  return <><Heading eyebrow="Find care">Find your next point of care.</Heading><Paragraph muted>Start with an area or the service you are looking for.</Paragraph>
    <Notice info>Fictional directory · Sample areas only. These facilities cannot be contacted or visited.</Notice>
    <Text style={s.label}>Search facilities</Text><TextInput accessibilityLabel="Search facilities" placeholder="Name, area or service" placeholderTextColor="#68758b" style={s.input} value={filters.query} onChangeText={(query) => setFilters({ ...filters, query })} maxLength={100} autoCorrect={false} />
    <View style={s.filterRow}>{fields.map(([key, label, all, values]) => <View key={key} style={[s.filterField, (fontScale > 1.3 || key === 'service') && { flexBasis: '100%' }]}><Text style={s.label}>{label}</Text><View style={s.pickerBox}><Picker accessibilityLabel={label} mode="dropdown" selectedValue={filters[key]} onValueChange={(value) => setFilters({ ...filters, [key]: value })} style={[s.picker, { minHeight: Math.max(52, 44 * fontScale) }]}><Picker.Item label={all} value="" />{values.map((value) => <Picker.Item key={value} label={value} value={value} />)}</Picker></View></View>)}</View>
    <TextLink title="Reset filters" onPress={reset} /><Text accessibilityLiveRegion="polite" style={[s.text, s.muted, s.small]}>{results.length} {results.length === 1 ? 'facility' : 'facilities'}</Text>
    {results.length ? results.map((facility) => <FacilityCard key={facility.id} facility={facility} go={go} />) : <View style={s.empty}><Subheading>No matching facilities</Subheading><Paragraph>This sample directory has limited coverage. Try another area or service.</Paragraph><Button secondary title="Clear all filters" onPress={reset} /></View>}
    <Paragraph muted small>Snapshot: {catalog.snapshot.updatedAt} · Fictional data. Map and device location are unavailable; addresses remain in the list.</Paragraph>
  </>;
}

export function Facility(props) {
  const facility = props.catalog.facilities.find((item) => item.id === props.route.id);
  const position = locationCandidates([facility])[0];
  return <><Heading eyebrow="Facility detail">{facility.name}</Heading>{facility.branchLabel ? <Text style={s.h3}>{facility.branchLabel}</Text> : null}<View style={s.row}><Pill>{facility.facilityType}</Pill><Pill>{facility.area}</Pill></View>
    <Notice info>Fictional facility. This record demonstrates the page and is not a real place to get care.</Notice><SaveButton {...props} kind="facilities" id={facility.id} />
    <Subheading>Address for this branch</Subheading><Paragraph>{facility.address}</Paragraph><View style={s.card}><Text style={s.h3}>Address available without a map</Text><Paragraph muted small>No device location is needed to read or save this address.</Paragraph></View>
    <Subheading>Sample services</Subheading><Paragraph>{facility.serviceTags?.length ? facility.serviceTags.join(' · ') : 'Services not supplied for this branch.'}</Paragraph><Paragraph muted small>Fictional examples. Services have not been verified against a real facility.</Paragraph>
    <Subheading>Contact & hours</Subheading><View style={s.card}><Text style={s.h3}>Contact unavailable</Text><Paragraph muted small>No official contact is supplied for this branch. Calling and booking are disabled in this test.</Paragraph><Text style={s.h3}>Opening hours unavailable</Text><Paragraph muted small>Hours have not been supplied. No opening status is assumed.</Paragraph></View>
    <Subheading>Map & directions</Subheading><View style={s.card}><Text style={s.h3}>Map unavailable</Text><Paragraph muted small>{position ? 'A sourced position is recorded, but a map is not enabled in this test.' : 'No verified coordinates are supplied for this branch. No pin is shown.'}</Paragraph><Text style={s.h3}>Directions unavailable</Text><Paragraph muted small>This fictional location cannot be visited. No route or external destination is available.</Paragraph></View>
    <Subheading>Source & verification</Subheading><Paragraph muted small>Bundled fictional fixture · Not verified against a real facility. Snapshot: {props.catalog.snapshot.updatedAt}.</Paragraph>
    <View style={s.rule} /><CardLink title="Prepare for a visit" description="Think through the questions you want to ask." icon="✓" onPress={() => props.go('prepare')} />
  </>;
}

export function Prepare({ saved, busy, update }) {
  return <><Heading eyebrow="Visit preparation">A few questions to take with you.</Heading><Paragraph muted>Use this as a general planning checklist. You do not need to enter health details.</Paragraph>
    {QUESTIONS.map((question) => { const checked = saved?.checklist.includes(question.id) || false; return <TouchableOpacity key={question.id} accessibilityRole="checkbox" accessibilityLabel={question.text} aria-checked={checked} aria-disabled={!saved || busy} disabled={!saved || busy} onPress={() => update('toggle', 'checklist', question.id)} style={[s.card, s.cardRow]}><Text accessible={false} allowFontScaling={false} style={[s.checkbox, checked && s.checked]}>{checked ? '✓' : ''}</Text><View style={s.grow}><Paragraph>{question.text}</Paragraph></View></TouchableOpacity>; })}
    <Notice info>Checklist choices stay on this device. A checklist is not an appointment confirmation.</Notice><TextLink title="Clear checklist" onPress={() => update('clearChecklist')} />
  </>;
}

export function Saved({ catalog, saved, go, update, busy }) {
  const guides = catalog.guides.filter((item) => saved?.guides.includes(item.id));
  const facilities = catalog.facilities.filter((item) => saved?.facilities.includes(item.id));
  return <><Heading eyebrow="Saved">Keep what helps you.</Heading><Paragraph muted>Saved on this device. No account or sync.</Paragraph><Subheading>Guides</Subheading>
    {guides.length ? guides.map((guide) => <CardLink key={guide.id} title={guide.title} description={`${reviewLabel(guide)} · Available offline`} image={recordImage(guide)} onPress={() => go('guide', guide.id)} />) : <Paragraph muted small>No saved guides yet.</Paragraph>}
    {saved?.unavailableGuides.length ? <View style={s.card}><Text style={s.h3}>Saved guide unavailable</Text><Paragraph muted small>{saved.unavailableGuides.length} saved {saved.unavailableGuides.length === 1 ? 'guide is' : 'guides are'} no longer in this library. Other saved items and your checklist are kept.</Paragraph><Button secondary disabled={busy} title="Remove unavailable guides" onPress={() => update('removeUnavailableGuides')} /></View> : null}
    <Subheading>Facilities</Subheading>{facilities.length ? facilities.map((facility) => <FacilityCard key={facility.id} facility={facility} go={go} />) : <Paragraph muted small>No saved facilities yet.</Paragraph>}
    {saved?.unavailableFacilities.length ? <View style={s.card}><Text style={s.h3}>Saved facility unavailable</Text><Paragraph muted small>{saved.unavailableFacilities.length} saved {saved.unavailableFacilities.length === 1 ? 'facility is' : 'facilities are'} no longer in this directory. Other saved items and your checklist are kept.</Paragraph><Button secondary disabled={busy} title="Remove unavailable facilities" onPress={() => update('removeUnavailableFacilities')} /></View> : null}
    <CardLink title="Your visit checklist" description={`${saved?.checklist.length || 0} questions checked`} icon="✓" onPress={() => go('prepare')} /><View style={s.rule} />
    <TextLink danger title="Clear saved guides and facilities" onPress={() => update('clearSaved')} /><Paragraph muted small>The bundled guides remain available in Learn.</Paragraph>
  </>;
}

export function Ask({ go }) {
  return <><Heading eyebrow="Ask AI">Understand a guide together.</Heading><View style={s.card}><Subheading>AI is unavailable.</Subheading><Paragraph>You can read the guide or search the library offline.</Paragraph><Paragraph muted small>A connected guide will need reviewed source material. Diagnosis, treatment choices and clinical triage are outside this feature.</Paragraph></View><Button title="Read the guide" onPress={() => go('guide', 'prepare-visit')} /><Button secondary title="Search the library" onPress={() => go('learn')} /></>;
}

export function Topic(props) {
  const { route, catalog } = props;
  const topic = topics.find((item) => item.id === route.id);
  const guides = catalog.guides.filter((guide) => guide.topics.includes(route.id));
  return <><Heading eyebrow="Learn · Topic">{topic.title}</Heading>{guides.map((guide) => <GuideCard key={guide.id} {...props} guide={guide} />)}</>;
}
