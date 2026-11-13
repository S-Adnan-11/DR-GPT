import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import s from './styles';

export const Heading = ({ children, eyebrow }) => <View style={{ gap: 10 }}>{eyebrow ? <Text style={s.eyebrow}>{eyebrow}</Text> : null}<Text accessibilityRole="header" style={s.h1}>{children}</Text></View>;
export const Subheading = ({ children }) => <Text accessibilityRole="header" style={s.h2}>{children}</Text>;
export const Paragraph = ({ children, muted = false, small = false }) => <Text style={[s.text, muted && s.muted, small && s.small]}>{children}</Text>;
export const Picture = ({ source, label, article = false, decorative = false }) => <View accessibilityElementsHidden={decorative} importantForAccessibility={decorative ? 'no-hide-descendants' : 'auto'} style={[s.picture, article && s.articlePicture]}><Image source={source} accessibilityRole={decorative ? undefined : 'image'} accessibilityLabel={decorative ? undefined : label} accessible={!decorative} resizeMode={article ? 'contain' : 'cover'} style={s.fillImage} /></View>;
export const Pill = ({ children, draft = false }) => <View style={[s.pill, draft && s.draft]}><Text style={[s.pillText, draft && s.draftText]}>{children}</Text></View>;
export const Notice = ({ children, info = false }) => <View style={[s.notice, info && s.info]}><Text style={[s.noticeText, info && s.infoText]}>{children}</Text></View>;

export function Button({ title, onPress, secondary = false, selected, disabled = false, hero = false, testID }) {
  return <TouchableOpacity testID={testID} accessibilityRole="button" accessibilityState={{ disabled, ...(selected === undefined ? {} : { selected }) }} disabled={disabled} onPress={onPress} style={[s.primary, secondary && s.secondary, hero && s.heroButton, selected && s.savedButton, disabled && s.disabled]}><Text style={[s.buttonText, secondary && s.secondaryText, hero && s.heroButtonText]}>{title}</Text></TouchableOpacity>;
}
export const TextLink = ({ title, onPress, danger = false }) => <TouchableOpacity accessibilityRole="button" onPress={onPress} style={s.link}><Text style={[s.linkText, danger && s.danger]}>{title}</Text></TouchableOpacity>;

export function CardLink({ title, description, onPress, icon = '?', image }) {
  return <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[s.card, s.cardRow]}>
    {image ? <Image source={image} accessible={false} resizeMode="contain" style={s.aidImage} /> : <Text accessible={false} allowFontScaling={false} style={s.icon}>{icon}</Text>}
    <View style={s.grow}><Text style={s.h3}>{title}</Text><Text style={[s.text, s.muted, s.small]}>{description}</Text></View><Text accessible={false} allowFontScaling={false} style={s.arrow}>›</Text>
  </TouchableOpacity>;
}
