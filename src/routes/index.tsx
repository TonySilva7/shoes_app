import { useTheme } from 'native-base';
import { DefaultTheme, LinkingOptions, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

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
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
    </NavigationContainer>
  );
}