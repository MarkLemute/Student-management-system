# UEAB Student Hub

UEAB Student Hub is a React Native/Expo student-management prototype with a preserved visual design and a maintainable `src` architecture.

## Run

```bash
npm install
npx expo start
```

Use Expo Go, an Android emulator, iOS simulator, or the web target. The prototype credentials are:

- Student ID: `SCHELE2211`
- Password: `schele123`

## Features

- Validated login with persisted session and logout.
- Five-tab navigation: Home, Results, Courses, Updates, and Profile.
- Profile persistence through AsyncStorage, with validation, read-only student ID/programme/year fields, and a visible last-saved timestamp.
- Credit-weighted GPA computed from the mock result data.
- App lifecycle monitor using `AppState`.
- Android back handling returns from a child tab to Home.
- Keyboard-aware login and profile forms and safe-area support.

## Architecture

- `src/theme.js` — shared visual tokens and base styles.
- `src/mockData.js` — prototype profile and academic data.
- `src/storage.js` — AsyncStorage persistence boundary.
- `src/validation.js` and `src/gpa.js` — pure validation and GPA logic.
- `src/hooks/useAppLifecycle.js` — lifecycle subscription.
- `src/components/` — reusable header, navigation, and form controls.
- `src/screens/` — login and feature screens.
