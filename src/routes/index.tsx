import { useTheme } from 'native-base';
import { DefaultTheme, LinkingOptions, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import { NotificationWillDisplayEvent, OSNotification, OneSignal } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

const linking: LinkingOptions<ReactNavigation.RootParamList> | undefined = {
  prefixes : ["igniteshoesapp://", "com.devlife.shoesapp://", "exp+igniteshoesapp://"],
  config: {
    screens: {

      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];


    // Intercepta a push notification, para que vc possa exibir a sua própria notificação
    useEffect(() => {
      const handleNotification = (event: NotificationWillDisplayEvent) => {
        console.log(event);
  
        event.preventDefault();
        
        const notification = event.getNotification();

        setNotification(notification);

        const addData = notification.additionalData
        console.log(addData);
      }
  
      OneSignal.Notifications.addEventListener('foregroundWillDisplay', handleNotification);
  
      return () => OneSignal.Notifications.removeEventListener('foregroundWillDisplay', handleNotification);
    }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title && (
        <Notification data={notification} onClose={() => setNotification(undefined)} />
      )}
    </NavigationContainer>
  );
}