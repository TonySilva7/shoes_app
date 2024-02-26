import OneSig, { OneSignal } from 'react-native-onesignal';

import { Platform } from 'react-native';
import {ONESIGN_APP_ID_ANDROID, ONESIGN_APP_ID_IOS} from '@env'

function oneSignalInitialize() {

  const oneSignalAppId = Platform.OS === 'ios'
      ? ONESIGN_APP_ID_IOS
      : ONESIGN_APP_ID_ANDROID;

  if (oneSignalAppId) {
    OneSignal.initialize(oneSignalAppId);
    OneSignal.User.addEmail('tony@mail.com')
    OneSignal.User.addTag('userType', 'singer');
    OneSignal.User.addTag('myUser', 'Tony Silva');
    /* Add múltiplas tags */
    // OneSignal.User.addTags({ userType: 'singer', myUser: 'Tony Silva' });


    /* o código abaixo remove tag e email */
    // OneSignal.User.removeTag('userType');
    // OneSignal.User.removeEmail('tony@mail.com')
  }

  if (Platform.OS === 'ios') {
    OneSignal.Notifications.canRequestPermission()
    .then((response) => {
      if (response) {
        OneSignal.Notifications.requestPermission(true);
      }
    });
  } else {
    OneSignal.Notifications.requestPermission(true);
  }


}

export { oneSignalInitialize };
