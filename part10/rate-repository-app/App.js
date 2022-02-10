import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-native-paper';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Provider>
            <Main />
          </Provider>
        </AuthStorageContext.Provider>
      </ApolloProvider>

      <StatusBar style="auto" />
    </NativeRouter>
  );
};

export default App;
