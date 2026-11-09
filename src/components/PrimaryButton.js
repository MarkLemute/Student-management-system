import React from 'react';
import { Pressable, Text, TextInput } from 'react-native';
import { colors, styles } from '../theme';

export function PrimaryButton({ title, onPress }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.8 }]}><Text style={styles.primaryButtonText}>{title}</Text></Pressable>;
}

export function Field({ label, editable = true, ...props }) {
  return <><Text style={styles.label}>{label}</Text><TextInputWithStyle editable={editable} {...props} /></>;
}

function TextInputWithStyle(props) {
  return <TextInput style={[styles.input, !props.editable && { backgroundColor: colors.pale, color: colors.muted }]} placeholderTextColor={colors.muted} {...props} />;
}
