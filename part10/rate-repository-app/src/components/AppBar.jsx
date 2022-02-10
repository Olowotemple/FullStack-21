import { useApolloClient, useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, useHistory } from 'react-router-native';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fe3367',
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(AUTHORIZED_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const handlePress = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push('/');
  };

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Link to="/">
          <Text style={{ color: '#efefef' }}>Repositories</Text>
        </Link>

        {!data.authorizedUser ? (
          <>
            <Link to="/login">
              <Text style={{ color: '#efefef' }}>Sign in</Text>
            </Link>

            <Link to="/signup">
              <Text style={{ color: '#efefef' }}>Sign up</Text>
            </Link>
          </>
        ) : (
          <>
            <Link to="/review">
              <Text style={{ color: '#efefef' }}>Create a review</Text>
            </Link>

            <Link to="/myreview">
              <Text style={{ color: '#efefef' }}>My reviews</Text>
            </Link>

            <Pressable onPress={handlePress}>
              <Text style={{ color: 'white' }}>Sign out</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
