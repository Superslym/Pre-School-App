# Pre-School-App

## Getting Started

Install dependencies and start via Expo:

```bash
npm install
npm run start
```

## Localization

Strings are defined in `locales/` and loaded by `i18n.js`. Add additional languages by creating a new file under `locales` and updating the map in `i18n.js`.

## Privacy & About Screen

A dedicated `About / Privacy` screen is available under the navigation menu. It displays the app
version and a brief privacy notice.

## Release Pipeline

Instructions for building/publishing are in [`RELEASE.md`](RELEASE.md). Use Expo CLI to produce
Android APK/AAB and iOS archives, then upload to Google Play Console or TestFlight.

## Analytics

Events are logged using `utils/analytics.js`. Replace with a real service when ready.

## Dependencies

- expo
- react-native
- @react-navigation/native
- @react-navigation/stack
- react-native-localize
