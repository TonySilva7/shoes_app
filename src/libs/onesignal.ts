import OneSig, { OneSignal } from 'react-native-onesignal';

import { Platform } from 'react-native';

function oneSignalInitialize() {

  const oneSignalAppId = Platform.OS === 'ios'
      ? 'eu-nao-tenho-um-app-id-para-ios'
      : '393332da-1e78-4a81-866b-e753a8c60aa7'

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
