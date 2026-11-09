import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { announcements } from '../mockData';
import { colors, styles } from '../theme';
export default function AnnouncementsScreen() {
  return <ScrollView contentContainerStyle={styles.content}>{announcements.map((item) => <View key={item.title} style={{ backgroundColor: colors.white, borderRadius: 15, padding: 16, marginBottom: 12 }}><Text style={{ color: colors.teal, fontSize: 10, fontWeight: '800' }}>NOTICE</Text><Text style={{ color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 8 }}>{item.title}</Text><Text style={{ color: colors.muted, marginTop: 5 }}>{item.date}</Text><Text style={{ color: colors.text, lineHeight: 21, marginTop: 10 }}>{item.text}</Text></View>)}</ScrollView>;
}
