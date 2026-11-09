import { StyleSheet } from 'react-native';

export const colors = {
  navy: '#0b3b60',
  teal: '#087d74',
  background: '#f5f8fa',
  text: '#123047',
  muted: '#758794',
  border: '#dce6eb',
  white: '#fff',
  pale: '#e8f4f3',
  gold: '#f2b84b',
  error: '#c43d4b',
  ink: '#102a43',
  subtle: '#e9f1f5',
  shadow: '#123047',
};

export const typography = {
  display: { fontSize: 28, lineHeight: 34, fontWeight: '800' },
  title: { fontSize: 21, lineHeight: 27, fontWeight: '800' },
  body: { fontSize: 15, lineHeight: 22 },
  caption: { fontSize: 12, lineHeight: 17 },
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 };

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  appShell: { flex: 1 },
  content: { padding: 20, paddingBottom: 110 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 25, marginBottom: 13 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700', marginBottom: 7, marginTop: 13 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: colors.text, fontSize: 15, backgroundColor: colors.white },
  primaryButton: { backgroundColor: colors.teal, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 18, minHeight: 50 },
  primaryButtonText: { color: colors.white, fontWeight: '800', fontSize: 15 },
  error: { color: colors.error, fontSize: 13, marginTop: 10 },
});
