import React from 'react';
import { useHistory } from 'react-router-native';
import * as Yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn(username, password);
      history.push('/');
    } catch (err) {
      console.log('Something bad happened :(', err);
    }
  };

  return (
    <SignInContainer
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default SignIn;
