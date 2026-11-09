import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const tabs = [['home', 'home-outline', 'Home'], ['results', 'bar-chart-outline', 'Results'], ['courses', 'book-outline', 'Courses'], ['announcements', 'notifications-outline', 'Updates'], ['profile', 'person-outline', 'Profile']];
export function BottomNavigation({ screen, onNavigate }) {
  return <View style={{ flexDirection: 'row', backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 9 }}>
    {tabs.map(([key, icon, label]) => <Pressable key={key} onPress={() => onNavigate(key)} style={{ flex: 1, alignItems: 'center' }}>
      <Ionicons name={screen === key ? icon.replace('-outline', '') : icon} size={21} color={screen === key ? colors.teal : colors.muted} />
      <Text style={{ color: screen === key ? colors.teal : colors.muted, fontSize: 10, fontWeight: '700', marginTop: 2 }}>{label}</Text>
    </Pressable>)}
  </View>;
}
