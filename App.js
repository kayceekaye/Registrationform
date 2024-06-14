import React from 'react';
import { Provider } from 'react-redux';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import store from './app/store';
import AppBase from './AppBase';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#54C7EC',
      secondary: 'yellow',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <AppBase />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
