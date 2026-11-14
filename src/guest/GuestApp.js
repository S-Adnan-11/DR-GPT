import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Keyboard, ScrollView, StatusBar, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startupError, assertGuestMode, developmentBuild } from './runtime';
import { Home, Learn, Guide, FirstAid, FirstAidDetail, Care, Facility, Prepare, Saved, Ask, Topic } from './screens';
import s, { colors } from './styles';
import { Notice } from './components';
import { VisitQuestions, VisitQuestion } from './VisitQuestionScreens';
const { createGuestStore } = require('./store');
const { createRouter, HOME } = require('./router');
const catalog = require('../catalog/guestCatalog');
const router = createRouter(catalog);
const screens = { home: Home, learn: Learn, guide: Guide, firstAid: FirstAid, firstAidDetail: FirstAidDetail, care: Care, facility: Facility, prepare: Prepare, saved: Saved, ask: Ask, topic: Topic, visitQuestions: VisitQuestions, visitQuestion: VisitQuestion };
const tabs = [['home', 'Home', '⌂'], ['learn', 'Learn', '≡'], ['care', 'Find care', '⌖'], ['saved', 'Saved', '♡']];

function GuestRoot() {
  const [history, setHistory] = useState([HOME]);
  const [saved, setSaved] = useState(null), [busy, setBusy] = useState(false), [feedback, setFeedback] = useState('');
  const [guideQuery, setGuideQuery] = useState('');
  const [guideCategory, setGuideCategory] = useState('');
  const [showLegacy, setShowLegacy] = useState(false);
  const [filters, setFilters] = useState({ query: '', area: '', facilityType: '', service: '' });
  const store = useMemo(() => createGuestStore({ storage: AsyncStorage, catalog, assertEnabled: assertGuestMode }), []);
  const { fontScale } = useWindowDimensions();
  const scroll = useRef(null), route = history[history.length - 1], Screen = screens[route.name];
  const active = router.activeTab(route, history);

  useEffect(() => {
    let mounted = true;
    store.load().then((value) => { if (mounted) setSaved(value); });
    return () => { mounted = false; };
  }, [store]);
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (history.length === 1) return false;
      Keyboard.dismiss(); setHistory((value) => router.back(value)); setFeedback(''); return true;
    });
    return () => subscription.remove();
  }, [history]);
  useEffect(() => { scroll.current?.scrollTo({ y: 0, animated: false }); }, [route.name, route.id]);

  function go(name, id) { Keyboard.dismiss(); setFeedback(''); setHistory((value) => router.navigate(value, id === undefined ? { name } : { name, id })); }
  async function update(operation, ...args) {
    setBusy(true);
    try {
      const next = await store[operation](...args); setSaved(next);
      setFeedback(next.status === 'session' ? 'Device storage is unavailable. Changes last only while this app stays open.' : operation === 'clearSaved' ? 'Saved guides and facilities cleared.' : operation === 'clearChecklist' ? 'Checklist cleared.' : operation === 'removeUnavailableFacilities' ? 'Unavailable saved facilities removed.' : operation === 'removeUnavailableGuides' ? 'Unavailable saved guides removed.' : 'Updated on this device.');
    } catch { setFeedback('Unable to update saved items. You can keep reading and try again.'); }
    finally { setBusy(false); }
  }

  return <View style={s.shell}>
    <View style={s.header}>
      <View style={s.headerRow}><TouchableOpacity accessibilityRole="button" accessibilityLabel="DR. GPT home" onPress={() => go('home')} style={s.brand}><Text accessible={false} allowFontScaling={false} style={s.brandMark}>+</Text><Text style={s.brandText}>DR. GPT</Text></TouchableOpacity><TouchableOpacity accessibilityRole="button" onPress={() => go('firstAid')} style={s.aidAction}><Text style={s.aidText}>First aid</Text></TouchableOpacity></View>
      <Text style={s.privateLabel}>{developmentBuild() ? 'Development · Fictional directory · Metro only' : 'Private guest test · Fictional directory · Offline'}</Text>
      {history.length > 1 ? <TouchableOpacity accessibilityRole="button" accessibilityLabel="Back" style={s.back} onPress={() => { Keyboard.dismiss(); setFeedback(''); setHistory((value) => router.back(value)); }}><Text style={s.backText}>← Back</Text></TouchableOpacity> : null}
    </View>
    <ScrollView ref={scroll} testID="guest-content" style={s.scroll} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      {saved?.status === 'unreadable' ? <Notice>Saved items could not be read. You can continue and save again.</Notice> : null}
      {saved?.status === 'session' ? <Notice>Device storage is unavailable. Changes last only while this app stays open.</Notice> : null}
      {feedback ? <Text accessibilityLiveRegion="polite" style={s.feedback}>{feedback}</Text> : null}
      <Screen {...{ catalog, go, route, saved, busy, update, filters, setFilters, guideQuery, setGuideQuery, guideCategory, setGuideCategory, showLegacy, setShowLegacy }} />
    </ScrollView>
    <View accessibilityRole="tablist" style={s.nav}>{tabs.map(([name, label, symbol]) => <TouchableOpacity key={name} accessibilityRole="tab" accessibilityLabel={label} aria-selected={active === name} onPress={() => go(name)} style={[s.tab, { width: fontScale > 1.4 ? '50%' : '25%' }]}><View style={[s.tabInner, active === name && s.activeTab]}><Text accessible={false} style={[s.tabIcon, active === name && s.activeText]}>{symbol}</Text><Text style={[s.tabText, active === name && s.activeText]}>{label}</Text></View></TouchableOpacity>)}</View>
  </View>;
}

export default function GuestApp() {
  const error = startupError();
  return <SafeAreaProvider initialMetrics={initialWindowMetrics}><SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={s.safe}><StatusBar barStyle="dark-content" backgroundColor={colors.background} />{error ? <View style={s.content}><Text accessibilityRole="header" style={s.h1}>Test configuration unavailable</Text><Text style={s.text}>{error}</Text></View> : <GuestRoot />}</SafeAreaView></SafeAreaProvider>;
}
