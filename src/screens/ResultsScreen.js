import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { results } from '../mockData';
import { calculateGpa } from '../gpa';
import { colors, styles } from '../theme';
export default function ResultsScreen() {
  return <ScrollView contentContainerStyle={styles.content}><View style={{ borderRadius: 18, backgroundColor: colors.navy, padding: 20 }}><Text style={{ color: '#a8d7d2', fontSize: 10, fontWeight: '800' }}>CURRENT GPA</Text><Text style={{ color: colors.white, fontSize: 42, fontWeight: '800', marginTop: 4 }}>{calculateGpa(results)}</Text><Text style={{ color: '#c6d9e3' }}>Computed from your credit-weighted results</Text></View><Text style={styles.sectionTitle}>Semester results</Text>{results.map((result) => <View key={result.code} style={{ backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}><View><Text style={{ color: colors.teal, fontWeight: '800' }}>{result.code}</Text><Text style={{ color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 4 }}>{result.name}</Text><Text style={{ color: colors.muted, marginTop: 3 }}>{result.credits} credits</Text></View><Text style={{ color: colors.teal, fontSize: 23, fontWeight: '800' }}>{result.grade}</Text></View>)}</ScrollView>;
}
