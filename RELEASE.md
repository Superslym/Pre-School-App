# Release Pipeline Instructions

This project uses Expo for building and distributing preview and production builds. The following steps outline a simple pipeline for Expo/Play Store/TestFlight deployments.

## 1. Expo Setup

1. Install Expo CLI: `npm install -g expo-cli`.
2. Log in to your Expo account: `expo login`.
3. Update `app.json` with your Expo slug, bundle identifiers, and any release-channel settings.

```
"android": { "package": "com.yourcompany.learnplay" },
"ios": { "bundleIdentifier": "com.yourcompany.learnplay" },
```

4. Run `expo publish` to push a managed workflow bundle (for OTA updates).

## 2. Generating Archives

- **Android (Play Store):**
  ```bash
  expo build:android --type apk  # or aab for Play
  ```
  Upload the resulting file to the Google Play Console. Fill in store listing, content rating, privacy policy, etc.

- **iOS (App Store / TestFlight):**
  ```bash
  expo build:ios --type archive
  ```
  Download the `.ipa` and submit via Transporter or Expo’s upload flow. Once processed, distribute via TestFlight or release on the App Store.

## 3. Automation (Optional)

- Use GitHub Actions or other CI to run `expo publish` on `main` branch merges.
- Store Expo credentials in secrets and trigger `expo build` jobs to create artifacts and upload to stores.

## 4. Privacy & About

Include the `About`/`Privacy` screen (see `screens/AboutScreen.js`) in the app. Make sure the store listings have a link to your full privacy policy.

## 5. Localization

Strings are kept under `locales/` with the simple `i18n.js` loader. Add additional languages by adding `xx.js` files and extending the `translations` map. The pipeline should also ensure the correct locale is packaged; Expo does this automatically.

## 6. Post‑Release

- Monitor analytics events (`analytics.logEvent`) and adjust gameplay.
- Update version numbers in `app.json`/`package.json` before each store submission.
- Release updates via `expo publish` for Over‑The‑Air fixes.

You can adapt these steps into your CI scripts or documentation for your team.