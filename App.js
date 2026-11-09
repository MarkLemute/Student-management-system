import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from './src/components/AppHeader';
import { BottomNavigation } from './src/components/BottomNavigation';
import { defaultProfile } from './src/mockData';
import { clearSession, loadProfile, loadSession, saveProfile, saveSession } from './src/storage';
import { useAppLifecycle } from './src/hooks/useAppLifecycle';
import { colors, styles } from './src/theme';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import AnnouncementsScreen from './src/screens/AnnouncementsScreen';
import CoursesScreen from './src/screens/CoursesScreen';

const titles = { home: 'Welcome back', profile: 'My profile', results: 'Exam results', announcements: 'Announcements', courses: 'My courses' };

export default function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [screen, setScreen] = useState('login');
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState('');
  const { appState } = useAppLifecycle();

  useEffect(() => {
    Promise.all([loadProfile(), loadSession()])
      .then(([savedProfile, session]) => {
        if (savedProfile) setProfile({ ...defaultProfile, ...savedProfile });
        if (session) setScreen('home');
      })
      .catch(() => Alert.alert('Storage error', 'Your saved data could not be loaded.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen !== 'home' && screen !== 'login') {
        setScreen('home');
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [screen]);

  const login = async (studentId) => {
    await saveSession(studentId);
    setProfile((current) => ({ ...current, registrationNumber: studentId }));
    setScreen('home');
  };
  const logout = async () => {
    await clearSession();
    setScreen('login');
  };
  const persistProfile = async (updatedProfile) => {
    try {
      await saveProfile(updatedProfile);
      setProfile(updatedProfile);
      const timestamp = new Date().toLocaleString();
      setLastSaved(timestamp);
      Alert.alert('Profile saved', `Saved on this device at ${timestamp}.`);
    } catch {
      Alert.alert('Storage error', 'Your profile could not be saved.');
    }
  };

  if (loading) return <SafeAreaProvider><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}><Text style={{ color: colors.muted }}>Loading your profile...</Text></View></SafeAreaProvider>;
  if (screen === 'login') return <SafeAreaProvider><LoginScreen onLogin={login} /></SafeAreaProvider>;

  let content = null;
  if (screen === 'home') content = <HomeScreen profile={profile} appState={appState} onNavigate={setScreen} onLogout={logout} />;
  if (screen === 'profile') content = <ProfileScreen profile={profile} onSave={persistProfile} lastSaved={lastSaved} onLogout={logout} />;
  if (screen === 'results') content = <ResultsScreen />;
  if (screen === 'announcements') content = <AnnouncementsScreen />;
  if (screen === 'courses') content = <CoursesScreen />;
  return <SafeAreaProvider><SafeAreaView style={styles.safeArea}><StatusBar barStyle="dark-content" backgroundColor={colors.background} /><View style={styles.appShell}><AppHeader title={titles[screen]} profile={profile} onProfile={() => setScreen('profile')} />{content}<BottomNavigation screen={screen} onNavigate={setScreen} /></View></SafeAreaView></SafeAreaProvider>;
}
