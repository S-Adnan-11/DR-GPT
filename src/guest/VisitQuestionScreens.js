import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, CardLink, Heading, Paragraph, Pill, Subheading, TextLink } from './components';
import s from './styles';
const { VISIT_QUESTIONS, answerVisitQuestion } = require('./visitQuestions');

export function VisitQuestions({ go }) {
  const categories = [...new Set(VISIT_QUESTIONS.map((prompt) => prompt.category))];
  return <>
    <Heading eyebrow="Learn · Offline">Visit questions</Heading>
    <Paragraph muted>Pick a question to read a short answer from the visit guides. You can open the full guide and its sources.</Paragraph>
    {categories.map((category) => <View key={category} style={{ gap: 12 }}>
      <Subheading>{category}</Subheading>
      {VISIT_QUESTIONS.filter((prompt) => prompt.category === category).map((prompt) => <CardLink key={prompt.id} title={prompt.question} description="Read an answer from the guides" onPress={() => go('visitQuestion', prompt.id)} />)}
    </View>)}
  </>;
}

export function VisitQuestion({ route, catalog, go, saved, busy, update, setGuideQuery, setGuideCategory, setShowLegacy }) {
  const [state, setState] = useState(null);
  useEffect(() => {
    let current = true;
    answerVisitQuestion(route.id, catalog).then((answer) => { if (current) setState({ id: route.id, catalog, answer }); });
    return () => { current = false; };
  }, [route.id, catalog]);
  const answer = state?.id === route.id && state.catalog === catalog ? state.answer : null;
  const selected = saved?.visitQuestions.includes(route.id) || false;
  if (!answer) return <><Heading eyebrow="Visit questions · Offline">Opening your guide answer…</Heading><Paragraph>Finding the passage in the visit guides.</Paragraph></>;
  if (answer.kind !== 'answer') return <>
    <Heading eyebrow="Visit questions · Offline">Answer unavailable</Heading>
    <Paragraph>The guide information for this question is unavailable. Browse Learn to find another guide.</Paragraph>
    <Button title="Browse Learn" onPress={() => { setGuideQuery(''); setGuideCategory(''); setShowLegacy(false); go('learn'); }} />
    <TextLink title="Choose another visit question" onPress={() => go('visitQuestions')} />
  </>;
  return <>
    <Heading eyebrow="Visit questions · Offline">{answer.prompt.question}</Heading>
    <Pill>From the visit guides</Pill>
    <View style={s.card}>{answer.passages.map((passage) => <Paragraph key={passage.id}>{passage.text}</Paragraph>)}</View>
    <Button secondary selected={selected} disabled={!saved || busy} title={selected ? 'Remove from visit checklist' : 'Add to visit checklist'} onPress={() => update(selected ? 'removeVisitQuestion' : 'addVisitQuestion', route.id)} />
    <TextLink title="Open visit checklist" onPress={() => go('prepare')} />
    <Subheading>Read the source guide</Subheading>
    <CardLink title={answer.guide.title} description="Read the full guide and its sources offline." icon="≡" onPress={() => go('guide', answer.guide.id)} />
    <Subheading>Sources</Subheading>
    <Paragraph muted small>Editorial source check: {answer.checkedAt}. These excerpts come from the sourced visit guides.</Paragraph>
    {answer.sources.map((source) => <View key={source.url} style={{ gap: 4 }}>
      <Paragraph small>{source.publisher}</Paragraph><Paragraph small>{source.title}</Paragraph>
      <Text selectable style={[s.text, s.small, s.sourceUrl]}>{source.url}</Text>
    </View>)}
    <TextLink title="Choose another visit question" onPress={() => go('visitQuestions')} />
  </>;
}
