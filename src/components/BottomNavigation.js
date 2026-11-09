import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../theme';

const tabs = [['home', '⌂', 'Home'], ['results', '▤', 'Results'], ['courses', '▥', 'Courses'], ['announcements', '◉', 'Updates'], ['profile', '●', 'Profile']];
export function BottomNavigation({ screen, onNavigate }) {
  return <View style={{ flexDirection: 'row', backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 9 }}>
    {tabs.map(([key, icon, label]) => <Pressable key={key} onPress={() => onNavigate(key)} style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ color: screen === key ? colors.teal : colors.muted, fontSize: 20 }}>{icon}</Text>
      <Text style={{ color: screen === key ? colors.teal : colors.muted, fontSize: 10, fontWeight: '700', marginTop: 2 }}>{label}</Text>
    </Pressable>)}
  </View>;
}
