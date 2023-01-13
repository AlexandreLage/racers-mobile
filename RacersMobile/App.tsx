import './src/i18n/config';
import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {ThemeContextProvider} from './src/theme';
import MainScreen from './src/screens/MainScreen';
import client from './src/services/racers-graphql/apollo';
import {Platform, UIManager} from 'react-native';

const App = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <ThemeContextProvider>
      <ApolloProvider client={client}>
        <MainScreen />
      </ApolloProvider>
    </ThemeContextProvider>
  );
};

export default App;
