import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Field, PrimaryButton } from '../components/PrimaryButton';
import { colors, styles } from '../theme';
import { validateProfile } from '../validation';

export default function ProfileScreen({ profile, onSave, onLogout, lastSaved }) {
  const [draft, setDraft] = useState(profile);
  useEffect(() => setDraft(profile), [profile]);
  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  const save = async () => {
    const error = validateProfile(draft);
    if (error) return Alert.alert('Check your details', error);
    await onSave(draft);
  };
  return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={styles.content}>
    <View style={{ alignItems: 'center', paddingBottom: 8 }}><View style={{ width: 74, height: 74, borderRadius: 37, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.white, fontSize: 30, fontWeight: '800' }}>{draft.fullName.charAt(0)}</Text></View><Text style={{ color: colors.text, fontSize: 21, fontWeight: '800', marginTop: 10 }}>{draft.fullName}</Text><Text style={{ color: colors.muted }}>Student ID: {draft.registrationNumber}</Text></View>
    <Text style={styles.sectionTitle}>Personal information</Text>
    <Field label="Student ID (read-only)" value={draft.registrationNumber} editable={false} />
    <Field label="Programme (read-only)" value={draft.programme} editable={false} />
    <Field label="Year (read-only)" value={draft.year} editable={false} />
    <Field label="Full name" value={draft.fullName} onChangeText={(value) => update('fullName', value)} />
    <Field label="Email address" value={draft.email} keyboardType="email-address" onChangeText={(value) => update('email', value)} />
    <Field label="Phone number" value={draft.phone} keyboardType="phone-pad" onChangeText={(value) => update('phone', value)} />
    <PrimaryButton title="Save changes" onPress={save} />
    <Text style={{ color: colors.muted, textAlign: 'center', fontSize: 12, marginTop: 10 }}>{lastSaved ? `Last saved: ${lastSaved}` : 'No profile changes saved yet'}</Text>
    <PrimaryButton title="Log out" onPress={onLogout} />
  </ScrollView></KeyboardAvoidingView>;
}
