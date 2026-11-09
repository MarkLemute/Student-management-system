import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { courses } from '../mockData';
import { colors, styles } from '../theme';
export default function CoursesScreen() {
  return <ScrollView contentContainerStyle={styles.content}><Text style={{ color: colors.muted }}>Your registered courses for Semester 1, 2026.</Text>{courses.map((course) => <View key={course.code} style={{ backgroundColor: colors.white, borderRadius: 14, padding: 16, marginTop: 12 }}><Text style={{ color: colors.teal, fontWeight: '800' }}>{course.code}</Text><Text style={{ color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 4 }}>{course.name}</Text><Text style={{ color: colors.muted, marginTop: 6 }}>{course.schedule}</Text></View>)}</ScrollView>;
}
