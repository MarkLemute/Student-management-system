import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ueab_student_profile';
const DEMO_STUDENT_ID = 'SCHELE2211';
const DEMO_PASSWORD = 'schele123';

const defaultProfile = {
  registrationNumber: 'SCHELE2211',
  fullName: 'Alex Wanjiku',
  email: 'alex.wanjiku@student.ueab.ac.ke',
  phone: '+254 700 000 000',
  programme: 'BSc. Computer Science',
  year: 'Year 2',
};

const announcements = [
  { title: 'Semester registration', date: '08 Nov 2026', text: 'Online registration for the next semester is now open.' },
  { title: 'Library hours extended', date: '05 Nov 2026', text: 'The library will remain open until 10:00 PM during examinations.' },
  { title: 'Student forum', date: '01 Nov 2026', text: 'Join the student forum for important university updates.' },
];

const results = [
  ['CSC 210', 'Data Structures', 'A-'],
  ['MAT 204', 'Discrete Mathematics', 'B+'],
  ['COM 220', 'Database Systems', 'A'],
];

const courses = [
  ['CSC 210', 'Data Structures', 'Mon 10:00 AM · Lab 2'],
  ['MAT 204', 'Discrete Mathematics', 'Tue 2:00 PM · Room B14'],
  ['COM 220', 'Database Systems', 'Thu 9:00 AM · Lab 1'],
];

export default function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [screen, setScreen] = useState('login');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((savedProfile) => {
        if (savedProfile) setProfile({ ...defaultProfile, ...JSON.parse(savedProfile) });
      })
      .catch(() => Alert.alert('Storage error', 'Your saved profile could not be loaded.'))
      .finally(() => setLoading(false));

    const subscription = AppState.addEventListener('change', (nextState) => {
      setAppState(nextState);
    });
    return () => subscription.remove();
  }, []);

  const login = () => {
    const registration = registrationNumber.trim().toUpperCase();
    if (!registration || !password) {
      setLoginError('Enter both your student ID and password.');
      return;
    }
    if (!/^[A-Z]{6}\d{4}$/.test(registration)) {
      setLoginError('Student ID must contain six letters followed by four digits, e.g. SCHELE2211.');
      return;
    }
    if (registration !== DEMO_STUDENT_ID || password !== DEMO_PASSWORD) {
      setLoginError('Incorrect Student ID or password.');
      return;
    }
    setProfile((current) => ({ ...current, registrationNumber: registration }));
    setLoginError('');
    setScreen('home');
  };

  const saveProfile = async (updatedProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      Alert.alert('Profile saved', 'Your information is stored on this device.');
    } catch {
      Alert.alert('Storage error', 'Your profile could not be saved.');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (screen === 'login') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={colors.navy} />
        <View style={styles.loginContainer}>
          <Image source={require('./assets/ueab-logo.png')} style={styles.loginLogo} resizeMode="contain" />
          <Text style={styles.loginTitle}>UEAB Student Hub</Text>
          <Text style={styles.loginSubtitle}>Student academic services</Text>
          <View style={styles.loginCard}>
            <Text style={styles.label}>Student ID</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. SCHELE2211 or SCHEBR2311"
              placeholderTextColor={colors.muted}
              autoCapitalize="characters"
              value={registrationNumber}
              onChangeText={setRegistrationNumber}
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordField}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor={colors.muted}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPassword((visible) => !visible)} style={styles.passwordToggle} accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                <Text style={styles.passwordToggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>
            {!!loginError && <Text style={styles.error}>{loginError}</Text>}
            <PrimaryButton title="Sign in" onPress={login} />
            <Text style={styles.demoHint}>Prototype login: SCHELE2211 / schele123</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>UEAB STUDENT HUB</Text>
            <Text style={styles.headerTitle}>{screen === 'home' ? 'Welcome back' : screenTitle(screen)}</Text>
          </View>
          <Pressable onPress={() => setScreen('profile')} style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.fullName.charAt(0)}</Text>
          </Pressable>
        </View>
        {screen === 'home' && <HomeScreen profile={profile} appState={appState} onNavigate={setScreen} />}
        {screen === 'profile' && <ProfileScreen profile={profile} onSave={saveProfile} />}
        {screen === 'results' && <ResultsScreen />}
        {screen === 'announcements' && <AnnouncementsScreen />}
        {screen === 'courses' && <CoursesScreen />}
        <BottomNavigation screen={screen} onNavigate={setScreen} />
      </View>
    </SafeAreaView>
  );
}

function LoadingScreen() {
  return <View style={styles.loading}><ActivityIndicator size="large" color={colors.teal} /><Text style={styles.loadingText}>Loading your profile...</Text></View>;
}

function HomeScreen({ profile, appState, onNavigate }) {
  const cards = [
    ['profile', 'Profile', 'Personal information', 'PR'],
    ['results', 'Exam results', 'View your grades', 'ER'],
    ['announcements', 'Announcements', 'University notices', 'AN'],
    ['courses', 'Course information', 'Registered classes', 'CR'],
  ];
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.welcomeCard}>
        <View><Text style={styles.welcomeLabel}>STUDENT PORTAL</Text><Text style={styles.welcomeName}>Welcome, {profile.fullName}</Text><Text style={styles.welcomeProgramme}>{profile.programme} · {profile.year}</Text></View>
        <Text style={styles.welcomeInitial}>{profile.fullName.charAt(0)}</Text>
      </View>
      <View style={styles.lifecycleBanner}><View style={styles.liveDot} /><Text style={styles.lifecycleText}>App is active · Last state: {appState}</Text></View>
      <Text style={styles.sectionTitle}>Academic services</Text>
      <View style={styles.grid}>{cards.map(([key, title, description, icon]) => <Pressable key={key} onPress={() => onNavigate(key)} style={styles.menuCard}><Text style={styles.menuIcon}>{icon}</Text><Text style={styles.menuTitle}>{title}</Text><Text style={styles.menuDescription}>{description}</Text><Text style={styles.arrow}>›</Text></Pressable>)}</View>
      <Text style={styles.sectionTitle}>Notice board</Text>
      <Pressable style={styles.announcementPreview} onPress={() => onNavigate('announcements')}><Text style={styles.announcementTag}>NOTICE</Text><Text style={styles.previewTitle}>{announcements[0].title}</Text><Text style={styles.previewText}>{announcements[0].text}</Text><Text style={styles.viewAll}>View all announcements  →</Text></Pressable>
    </ScrollView>
  );
}

function ProfileScreen({ profile, onSave }) {
  const [draft, setDraft] = useState(profile);
  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  return <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.profileHero}><View style={styles.largeAvatar}><Text style={styles.largeAvatarText}>{draft.fullName.charAt(0)}</Text></View><Text style={styles.profileName}>{draft.fullName}</Text><Text style={styles.profileReg}>Student ID: {draft.registrationNumber}</Text></View>
    <Text style={styles.sectionTitle}>Personal information</Text>
    <Field label="Full name" value={draft.fullName} onChangeText={(value) => update('fullName', value)} />
    <Field label="Email address" value={draft.email} keyboardType="email-address" onChangeText={(value) => update('email', value)} />
    <Field label="Phone number" value={draft.phone} keyboardType="phone-pad" onChangeText={(value) => update('phone', value)} />
    <Field label="Programme" value={draft.programme} onChangeText={(value) => update('programme', value)} />
    <PrimaryButton title="Save changes" onPress={() => onSave(draft)} />
  </ScrollView>;
}

function Field({ label, ...props }) { return <View><Text style={styles.label}>{label}</Text><TextInput style={styles.input} placeholderTextColor={colors.muted} {...props} /></View>; }
function ResultsScreen() { return <ScrollView contentContainerStyle={styles.content}>{<View style={styles.gpaCard}><Text style={styles.gpaLabel}>CURRENT GPA</Text><Text style={styles.gpaValue}>3.72</Text><Text style={styles.gpaCaption}>Good standing · Semester 1, 2026</Text></View>}<Text style={styles.sectionTitle}>Semester results</Text>{results.map(([code, name, grade]) => <View style={styles.listCard} key={code}><View><Text style={styles.courseCode}>{code}</Text><Text style={styles.listTitle}>{name}</Text></View><Text style={styles.grade}>{grade}</Text></View>)}</ScrollView>; }
function AnnouncementsScreen() { return <ScrollView contentContainerStyle={styles.content}>{announcements.map((item) => <View style={styles.articleCard} key={item.title}><Text style={styles.announcementTag}>NOTICE</Text><Text style={styles.articleTitle}>{item.title}</Text><Text style={styles.articleDate}>{item.date}</Text><Text style={styles.articleText}>{item.text}</Text></View>)}</ScrollView>; }
function CoursesScreen() { return <ScrollView contentContainerStyle={styles.content}><Text style={styles.helperText}>Your registered courses for Semester 1, 2026.</Text>{courses.map(([code, name, schedule]) => <View style={styles.listCard} key={code}><View><Text style={styles.courseCode}>{code}</Text><Text style={styles.listTitle}>{name}</Text><Text style={styles.schedule}>{schedule}</Text></View><Text style={styles.arrow}>›</Text></View>)}</ScrollView>; }

function BottomNavigation({ screen, onNavigate }) {
  return <View style={styles.bottomNav}>{[['home', '⌂', 'Home'], ['results', '▤', 'Results'], ['announcements', '◉', 'Updates'], ['profile', '●', 'Profile']].map(([key, icon, label]) => <Pressable key={key} onPress={() => onNavigate(key)} style={styles.navItem}><Text style={[styles.navIcon, screen === key && styles.navActive]}>{icon}</Text><Text style={[styles.navLabel, screen === key && styles.navActive]}>{label}</Text></Pressable>)}</View>;
}

function PrimaryButton({ title, onPress }) { return <Pressable onPress={onPress} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}><Text style={styles.primaryButtonText}>{title}</Text></Pressable>; }
function screenTitle(screen) { return { profile: 'My profile', results: 'Exam results', announcements: 'Announcements', courses: 'My courses' }[screen] || 'Student Hub'; }

const colors = { navy: '#0b3b60', teal: '#0e8c82', background: '#f5f8fa', text: '#123047', muted: '#758794', border: '#dce6eb', white: '#fff', pale: '#e8f4f3', gold: '#f2b84b' };
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background }, appShell: { flex: 1 }, loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }, loadingText: { marginTop: 12, color: colors.muted },
  loginContainer: { flex: 1, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center', padding: 24 }, loginLogo: { width: 136, height: 136, borderRadius: 68, backgroundColor: colors.white, marginBottom: 18 }, loginTitle: { color: colors.white, fontSize: 27, fontWeight: '800' }, loginSubtitle: { color: '#b9d1df', marginTop: 7, marginBottom: 30, fontSize: 15 }, loginCard: { backgroundColor: colors.white, borderRadius: 20, width: '100%', padding: 22 }, label: { color: colors.text, fontSize: 13, fontWeight: '700', marginBottom: 7, marginTop: 13 }, input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: colors.text, fontSize: 15, backgroundColor: colors.white }, passwordField: { position: 'relative', justifyContent: 'center' }, passwordInput: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingLeft: 14, paddingRight: 64, paddingVertical: 12, color: colors.text, fontSize: 15, backgroundColor: colors.white }, passwordToggle: { position: 'absolute', right: 12, paddingVertical: 8, paddingHorizontal: 4 }, passwordToggleText: { color: colors.teal, fontSize: 13, fontWeight: '700' }, error: { color: '#c43d4b', fontSize: 13, marginTop: 10 }, demoHint: { color: colors.muted, textAlign: 'center', fontSize: 12, marginTop: 13 },
  header: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.background }, headerEyebrow: { color: colors.teal, fontSize: 10, fontWeight: '800', letterSpacing: 1.4 }, headerTitle: { color: colors.text, fontSize: 25, fontWeight: '800', marginTop: 4 }, avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.navy, justifyContent: 'center', alignItems: 'center' }, avatarText: { color: colors.white, fontSize: 17, fontWeight: '800' }, content: { padding: 20, paddingBottom: 105 }, welcomeCard: { borderRadius: 18, backgroundColor: colors.navy, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, welcomeLabel: { color: '#a8d7d2', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 }, welcomeName: { color: colors.white, fontSize: 21, fontWeight: '800', marginTop: 7 }, welcomeProgramme: { color: '#c6d9e3', fontSize: 12, marginTop: 5 }, welcomeInitial: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.teal, color: colors.white, fontSize: 25, fontWeight: '800', textAlign: 'center', textAlignVertical: 'center' }, lifecycleBanner: { backgroundColor: colors.pale, borderRadius: 9, padding: 11, marginTop: 13, flexDirection: 'row', alignItems: 'center' }, liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.teal, marginRight: 8 }, lifecycleText: { color: colors.teal, fontSize: 12, fontWeight: '600' }, sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 25, marginBottom: 13 }, grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }, menuCard: { backgroundColor: colors.white, borderRadius: 15, padding: 15, width: '48%', minHeight: 145, marginBottom: 12, borderWidth: 1, borderColor: '#edf1f3' }, menuIcon: { color: colors.teal, fontSize: 13, fontWeight: '800', letterSpacing: 1, marginBottom: 17 }, menuTitle: { color: colors.text, fontSize: 15, fontWeight: '800' }, menuDescription: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 5 }, arrow: { color: colors.teal, fontSize: 25, position: 'absolute', right: 13, bottom: 9 }, announcementPreview: { backgroundColor: colors.white, borderRadius: 15, padding: 17, borderLeftWidth: 4, borderLeftColor: colors.teal }, announcementTag: { color: colors.teal, fontSize: 10, fontWeight: '800', letterSpacing: 1 }, previewTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 8 }, previewText: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5 }, viewAll: { color: colors.teal, fontSize: 12, fontWeight: '700', marginTop: 13 },
  primaryButton: { backgroundColor: colors.teal, borderRadius: 10, padding: 15, alignItems: 'center', marginTop: 20 }, buttonPressed: { opacity: 0.8 }, primaryButtonText: { color: colors.white, fontSize: 15, fontWeight: '800' }, profileHero: { backgroundColor: colors.white, borderRadius: 16, alignItems: 'center', padding: 23 }, largeAvatar: { width: 74, height: 74, borderRadius: 37, backgroundColor: colors.navy, justifyContent: 'center', alignItems: 'center' }, largeAvatarText: { color: colors.white, fontSize: 32, fontWeight: '800' }, profileName: { color: colors.text, fontSize: 21, fontWeight: '800', marginTop: 12 }, profileReg: { color: colors.muted, marginTop: 4 }, gpaCard: { backgroundColor: colors.teal, borderRadius: 16, padding: 22 }, gpaLabel: { color: '#bde7e2', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, gpaValue: { color: colors.white, fontSize: 42, fontWeight: '800', marginVertical: 4 }, gpaCaption: { color: '#d9f4f0', fontSize: 12 }, listCard: { backgroundColor: colors.white, borderRadius: 14, padding: 17, marginBottom: 11, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, courseCode: { color: colors.teal, fontSize: 11, fontWeight: '800', letterSpacing: 1 }, listTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 4 }, grade: { color: colors.teal, fontSize: 21, fontWeight: '800' }, articleCard: { backgroundColor: colors.white, borderRadius: 15, padding: 18, marginBottom: 13 }, articleTitle: { color: colors.text, fontSize: 19, fontWeight: '800', marginTop: 8 }, articleDate: { color: colors.muted, fontSize: 12, marginTop: 5 }, articleText: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 14 }, helperText: { color: colors.muted, fontSize: 14, marginBottom: 5 }, schedule: { color: colors.muted, fontSize: 12, marginTop: 5 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 76, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 11 }, navItem: { alignItems: 'center', width: '25%' }, navIcon: { color: colors.muted, fontSize: 22, height: 29 }, navLabel: { color: colors.muted, fontSize: 11, fontWeight: '600' }, navActive: { color: colors.teal },
});
