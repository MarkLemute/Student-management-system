import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export function AppHeader({ title, profile, onProfile }) {
  return <View style={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.background }}>
    <View><Text style={{ color: colors.teal, fontSize: 10, fontWeight: '800', letterSpacing: 1.4 }}>UEAB STUDENT HUB</Text><Text style={{ color: colors.text, fontSize: 25, fontWeight: '800', marginTop: 4 }}>{title}</Text></View>
    <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={onProfile} style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.navy, justifyContent: 'center', alignItems: 'center' }}><Ionicons name="person" size={20} color={colors.white} /></Pressable>
  </View>;
}
