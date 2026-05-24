# React Native Expo

## EAS

- Expo Application Services

## Tutorial Steps

[Github tutoral steps](https://github.com/ShelJi/macrozone-react-native-tutor/blob/master/STEPS.md)

- Cheatsheet: [Zero To Mastery](https://zerotomastery.io/cheatsheets/react-native-cheat-sheet/)

- [React Native official Docs for components](https://reactnative.dev/docs/getting-started)

- Youtube tutorial: [React Native Expo Tutorial for Beginners](https://youtu.be/XCifkDC0yXA?si=YB1LwD_agp_p83Vd)

Use playstore version which is compactible wit expo-go. Otherwise, you will encounter error when running the app in expo-go.

```bash
npx create-expo-app my-app
cd my-app
npx eas-cli@latest login
npx eas-cli@latest init
```

## Error

```bash
npx expo install --fix
```

- Expo doctor

`npx expo-doctor`

## Start

`npx expo start`

## Build Preview APK (Uses Cloud Build)

Create `eas.json`

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

`npx eas build --platform android --profile preview`

## Build locally internal APK

- Recommended to add these lines to `app.json`

```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.myapp",
      "versionCode": 1
    },
    "version": "1.0.0"
  }
}
```

### Offline prebuild commands

- It requires java 17 is preferred.
- `npx expo prebuild` to generate native code, then run the following command to build the apk.

```bash
npx expo prebuild
cd android
.\gradlew assembleRelease
```

Find Output file here:

`android/app/build/outputs/apk/release/app-release.apk`

- Error

SDK not found

- create `local.properties` in `android` folder with the following content:
- which is the actua path of sdk

```properties
sdk.dir=C:\\Users\\shelj\\AppData\\Local\\Android\\Sdk
```

## Webview

`npx expo install react-native-webview` install webview package

- index.tsx

```tsx
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://mobile.plsofttech.com' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
```

- _layout.tsx

```tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
```

## Error expo-doctor

```bash
npx expo-doctor
17/18 checks passed. 1 checks failed. Possible issues detected:
Use the --verbose flag to see more details about passed checks.

✖ Check for issues with Metro config
It looks like that you are using a custom metro.config.js that does not extend "expo/metro-config". This can lead to unexpected and hard to debug issues. Learn more: https://docs.expo.dev/guides/customizing-metro/
Advice:
Update your "metro.config.js" to extend "expo/metro-config".

1 check failed, indicating possible issues with the project.
```

Create `metro.config.js` in the root folder with the following content:

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
```

Then run `npx expo-doctor`.

```bash
npx expo-doctor
18/18 checks passed. No issues detected!
PS D:\github\react-native-web-viewer>
```
