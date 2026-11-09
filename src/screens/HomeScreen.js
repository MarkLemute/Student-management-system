import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { announcements } from '../mockData';
import { colors, styles } from '../theme';

export default function HomeScreen({ profile, appState, onNavigate, onLogout }) {
  const cards = [['profile', 'Profile', 'Personal information', 'PR'], ['results', 'Exam results', 'View your grades', 'ER'], ['announcements', 'Announcements', 'University notices', 'AN'], ['courses', 'Course information', 'Registered classes', 'CR']];
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={{ borderRadius: 18, backgroundColor: colors.navy, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><View><Text style={{ color: '#a8d7d2', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 }}>STUDENT PORTAL</Text><Text style={{ color: colors.white, fontSize: 21, fontWeight: '800', marginTop: 7 }}>Welcome, {profile.fullName}</Text><Text style={{ color: '#c6d9e3', fontSize: 12, marginTop: 5 }}>{profile.programme} · {profile.year}</Text></View><Text style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: colors.teal, color: colors.white, fontSize: 25, fontWeight: '800', textAlign: 'center', textAlignVertical: 'center' }}>{profile.fullName.charAt(0)}</Text></View>
    <View style={{ backgroundColor: colors.pale, borderRadius: 9, padding: 11, marginTop: 13, flexDirection: 'row' }}><Text style={{ color: colors.teal, fontSize: 12, fontWeight: '600' }}>●  App is {appState} · Lifecycle monitor</Text></View>
    <Text style={styles.sectionTitle}>Academic services</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>{cards.map(([key, title, description, icon]) => <Pressable key={key} onPress={() => onNavigate(key)} style={{ backgroundColor: colors.white, borderRadius: 15, padding: 15, width: '48%', minHeight: 145, marginBottom: 12 }}><Text style={{ color: colors.teal, fontWeight: '800', fontSize: 13 }}>{icon}</Text><Text style={{ color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 13 }}>{title}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 5 }}>{description}</Text><Text style={{ color: colors.teal, fontSize: 24, textAlign: 'right' }}>›</Text></Pressable>)}</View>
    <Text style={styles.sectionTitle}>Notice board</Text><Pressable style={{ backgroundColor: colors.white, borderRadius: 15, padding: 16 }} onPress={() => onNavigate('announcements')}><Text style={{ color: colors.teal, fontSize: 10, fontWeight: '800' }}>NOTICE</Text><Text style={{ color: colors.text, fontSize: 17, fontWeight: '800', marginTop: 8 }}>{announcements[0].title}</Text><Text style={{ color: colors.muted, marginTop: 6 }}>{announcements[0].text}</Text><Text style={{ color: colors.teal, fontWeight: '700', marginTop: 13 }}>View all announcements  →</Text></Pressable>
    <Pressable onPress={onLogout} style={{ marginTop: 24, alignItems: 'center' }}><Text style={{ color: colors.error, fontWeight: '700' }}>Log out</Text></Pressable>
  </ScrollView>;
}
