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
