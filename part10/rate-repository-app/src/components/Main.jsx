import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Redirect, Route, Switch } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryItem from './RepositoryItem';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import Reviews from './Reviews';

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    // flexShrink: 1,
    backgroundColor: '#efefef',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/myreview">
          <Reviews />
        </Route>

        <Route path="/review">
          <ReviewForm />
        </Route>

        <Route path="/login">
          <SignIn />
        </Route>

        <Route path="/item/:id">
          <RepositoryItem path={true} />
        </Route>

        <Route path="/">
          <RepositoryList />
        </Route>

        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
