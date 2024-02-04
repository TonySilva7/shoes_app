import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';

import { Routes } from './src/routes';
import { OneSignal } from 'react-native-onesignal';

import { Loading } from './src/components/Loading';
import { THEME } from './src/theme';

import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';
import { oneSignalInitialize } from './src/libs/onesignal';
import { NotificationClickEvent, NotificationEventTypeMap } from 'react-native-onesignal/dist/models/NotificationEvents';


type IEventNotification = NotificationEventTypeMap['foregroundWillDisplay'];

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    oneSignalInitialize();
  }, []);


  // Intercepta a push notification, para que vc possa exibir a sua própria notificação
  // useEffect(() => {
  //   const eventListener = (notificationReceivedEvent: IEventNotification) => {
  //     console.log(notificationReceivedEvent);

  //     const notification = notificationReceivedEvent.getNotification();
  //     const addData = notification.additionalData

  //     console.log(addData);
  //   }

  //   const unsubscribe = OneSignal.Notifications.addEventListener( 
  //     'foregroundWillDisplay', 
  //     eventListener
  //   )

  //   return () => unsubscribe
  // }, [])



  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent) => {
        console.log('OneSignal: notification clicked:', event);


        const action = event.notification.actionButtons?.[0];
        console.log('Action:', action);
    };

    OneSignal.Notifications.addEventListener('click', handleNotificationClick);

    // Função de limpeza para remover o listener
    return () => {
        OneSignal.Notifications.removeEventListener('click', handleNotificationClick);
    };
  }, []); 


  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}