import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, CardLink, Heading, Notice, Paragraph, Picture, Pill, Subheading, TextLink } from './components';
import { illustrations, topics, recordImage } from './illustrations';
import s from './styles';
const { filterFacilities, searchGuides } = require('../catalog/catalog');
const { QUESTIONS } = require('./store');

export function Home({ go }) {
  return <>
    <Heading eyebrow="A good place to start">Your health,{ '\n' }at your pace.</Heading>
    <Paragraph muted>Understand a little more. Feel more prepared for what comes next.</Paragraph>
    <View style={s.hero}><Picture source={illustrations.library} label="Original library photograph" /><View style={s.heroBody}>
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

export function Learn({ catalog, go, guideQuery, setGuideQuery }) {
  const { fontScale } = useWindowDimensions();
  const guides = searchGuides(catalog.guides, guideQuery);
  return <>
    <Heading eyebrow="Learn">A little more understanding.</Heading>
    <Text style={s.label}>Search guides</Text><TextInput accessibilityLabel="Search guides" placeholder="Try ‘visit’" placeholderTextColor="#68758b" value={guideQuery} onChangeText={setGuideQuery} style={s.input} maxLength={100} autoCorrect={false} />
    <Paragraph muted small>{guides.length} {guides.length === 1 ? 'guide' : 'guides'}</Paragraph>
    {guides.length ? guides.map((guide) => <CardLink key={guide.id} title={guide.title} description={guide.summary} onPress={() => go('guide', guide.id)} />) : <View style={s.empty}><Subheading>No matching guides</Subheading><Paragraph>Try “visit” or browse a topic below.</Paragraph><Button secondary title="Clear guide search" onPress={() => setGuideQuery('')} /></View>}
    <Subheading>Explore a topic</Subheading><View style={s.topics}>{topics.map((topic) => <TouchableOpacity key={topic.id} accessibilityRole="button" onPress={() => go('topic', topic.id)} style={[s.topic, fontScale > 1.4 && { flexBasis: '100%' }]}><View style={[s.picture, s.topicImage]}><Image source={illustrations[topic.id]} accessible={false} resizeMode="cover" style={s.fillImage} /></View><Text style={s.topicText}>{topic.title}</Text></TouchableOpacity>)}</View>
    <Paragraph muted small>Original topic illustrations. Full topic content is awaiting review.</Paragraph>
  </>;
}

function SaveButton({ kind, id, saved, busy, update }) {
  const selected = saved?.[kind].includes(id) || false;
  return <Button secondary selected={selected} disabled={!saved || busy} title={selected ? 'Saved on this device · Remove' : `Save ${kind === 'guides' ? 'guide' : 'facility'} on this device`} onPress={() => update('toggle', kind, id)} />;
}

export function Guide(props) {
  const guide = props.catalog.guides.find((item) => item.id === props.route.id);
  return <>
    <Heading eyebrow="Learn · Offline guide">{guide.title}</Heading><Pill draft>Draft · Not reviewed</Pill><Paragraph muted>{guide.summary}</Paragraph>
    <Picture source={recordImage(guide)} label="Library shelves, original article-header photograph" article />
    <SaveButton {...props} kind="guides" id={guide.id} />
    {guide.body.map((section) => <View key={section.heading} style={{ gap: 10 }}><Subheading>{section.heading}</Subheading><Paragraph>{section.text}</Paragraph></View>)}
    <Notice>This general preparation draft has not had a content review.</Notice><Subheading>Sources & review</Subheading><Paragraph muted small>No references attached yet. Review date: not reviewed.</Paragraph>
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
    <Pill>Fictional</Pill><Text style={s.h3}>{facility.name}</Text><Paragraph muted small>{facility.facilityType} · {facility.area}</Paragraph><Paragraph small>{facility.address}</Paragraph><Paragraph muted small>{facility.serviceTags?.join(' · ') || 'Services not supplied'}</Paragraph>
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
    <Paragraph muted small>Snapshot: 8 Nov 2026 · Fictional data. Map and device location are unavailable; addresses remain in the list.</Paragraph>
  </>;
}

export function Facility(props) {
  const facility = props.catalog.facilities.find((item) => item.id === props.route.id);
  return <><Heading eyebrow="Facility detail">{facility.name}</Heading><View style={s.row}><Pill>{facility.facilityType}</Pill><Pill>{facility.area}</Pill></View>
    <Notice info>Fictional facility. This record demonstrates the page and is not a real place to get care.</Notice><SaveButton {...props} kind="facilities" id={facility.id} />
    <Subheading>Location</Subheading><Paragraph>{facility.address}</Paragraph><View style={s.card}><Text style={s.h3}>Address available without a map</Text><Paragraph muted small>Map pin and directions are unavailable for this sample. No location permission is needed.</Paragraph></View>
    <Subheading>Services</Subheading><Paragraph>{facility.serviceTags?.join(' · ') || 'Not supplied'}</Paragraph><Subheading>Contact & hours</Subheading><Paragraph muted small>Official contact: not supplied. Opening hours: not supplied.</Paragraph>
    <Subheading>Source & verification</Subheading><Paragraph muted small>Bundled fictional fixture · Not verified against a real facility. Snapshot dated 8 Nov 2026.</Paragraph>
    <View style={s.rule} /><CardLink title="Prepare for a visit" description="Think through the questions you want to ask." icon="✓" onPress={() => props.go('prepare')} />
  </>;
}

export function Prepare({ saved, busy, update }) {
  return <><Heading eyebrow="Visit preparation">A few questions to take with you.</Heading><Paragraph muted>Use this as a general planning checklist. You do not need to enter health details.</Paragraph>
    {QUESTIONS.map((question) => { const checked = saved?.checklist.includes(question.id) || false; return <TouchableOpacity key={question.id} accessibilityRole="checkbox" accessibilityLabel={question.text} aria-checked={checked} aria-disabled={!saved || busy} disabled={!saved || busy} onPress={() => update('toggle', 'checklist', question.id)} style={[s.card, s.cardRow]}><Text accessible={false} allowFontScaling={false} style={[s.checkbox, checked && s.checked]}>{checked ? '✓' : ''}</Text><View style={s.grow}><Paragraph>{question.text}</Paragraph></View></TouchableOpacity>; })}
    <Notice info>Checklist choices stay on this device. A checklist is not an appointment confirmation.</Notice><TextLink title="Clear checklist" onPress={() => update('clearChecklist')} />
  </>;
}

export function Saved({ catalog, saved, go, update }) {
  const guides = catalog.guides.filter((item) => saved?.guides.includes(item.id));
  const facilities = catalog.facilities.filter((item) => saved?.facilities.includes(item.id));
  return <><Heading eyebrow="Saved">Keep what helps you.</Heading><Paragraph muted>Saved on this device. No account or sync.</Paragraph><Subheading>Guides</Subheading>
    {guides.length ? guides.map((guide) => <CardLink key={guide.id} title={guide.title} description="Available offline" onPress={() => go('guide', guide.id)} />) : <Paragraph muted small>No saved guides yet.</Paragraph>}
    <Subheading>Facilities</Subheading>{facilities.length ? facilities.map((facility) => <FacilityCard key={facility.id} facility={facility} go={go} />) : <Paragraph muted small>No saved facilities yet.</Paragraph>}
    <CardLink title="Your visit checklist" description={`${saved?.checklist.length || 0} questions checked`} icon="✓" onPress={() => go('prepare')} /><View style={s.rule} />
    <TextLink danger title="Clear saved guides and facilities" onPress={() => update('clearSaved')} /><Paragraph muted small>The bundled guides remain available in Learn.</Paragraph>
  </>;
}

export function Ask({ go }) {
  return <><Heading eyebrow="Ask AI">Understand a guide together.</Heading><View style={s.card}><Subheading>AI is unavailable.</Subheading><Paragraph>You can read the guide or search the library offline.</Paragraph><Paragraph muted small>A connected guide will need reviewed source material. Diagnosis, treatment choices and clinical triage are outside this feature.</Paragraph></View><Button title="Read the guide" onPress={() => go('guide', 'prepare-visit')} /><Button secondary title="Search the library" onPress={() => go('learn')} /></>;
}

export function Topic({ route, go }) {
  const topic = topics.find((item) => item.id === route.id);
  return <><Heading eyebrow="Learn · Topic">{topic.title}</Heading><Picture source={illustrations[topic.id]} label={`Original ${topic.title} illustration`} article /><Pill draft>Draft · Not reviewed</Pill><View style={s.card}><Subheading>Topic content is awaiting review.</Subheading><Paragraph>The original illustration is retained for private placement review. The reading flow is available in the preparation guide.</Paragraph></View><Button title="Open the preparation guide" onPress={() => go('guide', 'prepare-visit')} /></>;
}
