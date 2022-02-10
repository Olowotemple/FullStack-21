import { Formik } from 'formik';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import FormikTextInput from './FormikTextInput';

const SignInContainer = ({ initialValues, validationSchema, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <View style={{ backgroundColor: '#FFFFFF' }}>
            <FormikTextInput
              name="username"
              placeholder="Username"
              testID="username"
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
              testID="password"
            />
            <Pressable
              onPress={handleSubmit}
              title="Sign in"
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
              <Text style={{ color: '#ffffff' }}>Sign in</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default SignInContainer;
