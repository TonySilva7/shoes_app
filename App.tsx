import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';

import { Routes } from './src/routes';
import { OneSignal, NotificationClickEvent } from 'react-native-onesignal';

import { Loading } from './src/components/Loading';
import { THEME } from './src/theme';

import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';
import { oneSignalInitialize } from './src/libs/onesignal';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    oneSignalInitialize();
  }, []);

  /**
   * Intercepta o click na notificação
   */
  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent) => {
        console.log('OneSignal: notification clicked:', event);

        const {actionId} = event.result

        if (actionId === '1') {
            console.log('Action 1');
            return;
        }

        if (actionId === '2') {
            console.log('Action 2');
            return;
        }


        // const action = event.notification.actionButtons?.[0];
        // console.log('Action:', action);
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