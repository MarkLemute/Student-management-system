import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { colors, styles } from '../theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { validateLogin } from '../validation';

export default function LoginScreen({ onLogin }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const submit = () => {
    const message = validateLogin(studentId, password);
    if (message) return setError(message);
    setError('');
    onLogin(studentId.trim().toUpperCase());
  };
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.navy }}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Image source={require('../../assets/ueab-logo.png')} style={{ width: 136, height: 136, borderRadius: 68, backgroundColor: colors.white, marginBottom: 18 }} resizeMode="contain" />
        <Text style={{ color: colors.white, fontSize: 27, fontWeight: '800' }}>UEAB Student Hub</Text>
        <Text style={{ color: '#b9d1df', marginTop: 7, marginBottom: 30, fontSize: 15 }}>Student academic services</Text>
        <View style={{ backgroundColor: colors.white, borderRadius: 20, width: '100%', padding: 22 }}>
          <Text style={styles.label}>Student ID</Text>
          <TextInput style={styles.input} placeholder="e.g. SCHELE2211" placeholderTextColor={colors.muted} autoCapitalize="characters" value={studentId} onChangeText={setStudentId} />
          <Text style={styles.label}>Password</Text>
          <View style={{ justifyContent: 'center' }}>
            <TextInput style={[styles.input, { paddingRight: 64 }]} placeholder="Enter your password" placeholderTextColor={colors.muted} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
            <Pressable onPress={() => setShowPassword((value) => !value)} style={{ position: 'absolute', right: 12, padding: 8 }}><Text style={{ color: colors.teal, fontWeight: '700' }}>{showPassword ? 'Hide' : 'Show'}</Text></Pressable>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <PrimaryButton title="Sign in" onPress={submit} />
          <Text style={{ color: colors.muted, textAlign: 'center', fontSize: 12, marginTop: 13 }}>Prototype login: SCHELE2211 / schele123</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
