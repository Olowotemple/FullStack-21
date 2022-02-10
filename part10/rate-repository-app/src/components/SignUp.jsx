import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as Yup from 'yup';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, 'Username must contain at least 1 character')
    .max(30, 'Username can contain at most 30 characters')
    .required('Username is required'),

  password: Yup.string()
    .min(5, 'Password must contain at least 5 characters')
    .max(50, 'Password can contain at most 50 characters')
    .required('Password is required'),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password doesn't match")
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          username,
          password,
        },
      });
      await signIn(username, password);
      history.push('/');
    } catch (error) {
      console.log('Something bad happened :(', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <View style={{ backgroundColor: 'white' }}>
            <FormikTextInput name="username" placeholder="Username" />

            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
            />

            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password confirmation"
              secureTextEntry
            />

            <Pressable
              onPress={handleSubmit}
              style={{
                backgroundColor: '#007AFF',
                alignItems: 'center',
                padding: 12,
                margin: 12,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#007AFF',
              }}
              testID="signIn"
            >
              <Text style={{ color: '#ffffff' }}>Sign up</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default SignUp;
