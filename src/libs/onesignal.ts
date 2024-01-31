import { OneSignal } from 'react-native-onesignal';
import { Platform } from 'react-native';

function oneSignalInitialize() {
  const oneSignalAppId = Platform.OS === 'ios'
      ? 'empty'
      : '393332da-1e78-4a81-866b-e753a8c60aa7'

  if (oneSignalAppId) {
    console.log('oneSignalAppId', oneSignalAppId);
    console.log('Platform.OS', Platform.OS);
    
    
    OneSignal.initialize(oneSignalAppId);
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
