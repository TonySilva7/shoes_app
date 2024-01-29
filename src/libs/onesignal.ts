import { OneSignal } from 'react-native-onesignal';
import { Platform } from 'react-native';

function oneSignalInitialize() {
  // const {
  //   EXPO_PUBLIC_ONE_SIGNAL_APP_ID_ANDROID,
  //   EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS,
  // } = process.env;

  const oneSignalAppId =
    // Platform.OS === 'ios'
    //   ? EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS
    //   : EXPO_PUBLIC_ONE_SIGNAL_APP_ID_ANDROID;

    Platform.OS === 'ios'
      ? 'empty'
      : '393332da-1e78-4a81-866b-e753a8c60aa7'

  if (oneSignalAppId) {
    OneSignal.initialize(oneSignalAppId);
  }

  if (Platform.OS === 'ios') {
    OneSignal.Notifications.canRequestPermission().then((response) => {
      if (response) {
        OneSignal.Notifications.requestPermission(true);
      }
    });
  }
}

export { oneSignalInitialize };
