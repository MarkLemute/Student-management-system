import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROFILE_STORAGE_KEY = '@ueab_student_profile';
export const SESSION_STORAGE_KEY = '@ueab_student_session';

export async function loadProfile() {
  const saved = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
}

export async function saveProfile(profile) {
  await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export async function loadSession() {
  return AsyncStorage.getItem(SESSION_STORAGE_KEY);
}

export async function saveSession(studentId) {
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, studentId);
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
}
