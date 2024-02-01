import OneSig, { OneSignal } from 'react-native-onesignal';

import { Platform } from 'react-native';

function oneSignalInitialize() {

  const oneSignalAppId = Platform.OS === 'ios'
      ? 'empty'
      : '393332da-1e78-4a81-866b-e753a8c60aa7'

  if (oneSignalAppId) {
    OneSignal.initialize(oneSignalAppId);
    OneSignal.User.addEmail('tony@mail.com')
    OneSignal.User.addTag('userType', 'singer');
  }

  if (Platform.OS === 'ios') {
    OneSignal.Notifications.canRequestPermission()
    .then((response) => {
      if (response) {
        OneSignal.Notifications.requestPermission(true);
      }
    });
  }
}

export { oneSignalInitialize };
