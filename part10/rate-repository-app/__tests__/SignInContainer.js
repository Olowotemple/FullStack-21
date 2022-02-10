import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import * as Yup from 'yup';
import SignInContainer from '../src/components/SignInContainer';

describe('Sign in', () => {
  it('submit handler is called with correct arguments', async () => {
    const initialValues = {
      username: '',
      password: '',
    };

    const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    });

    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <SignInContainer
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      />
    );

    fireEvent.changeText(getByTestId('username'), 'kalle');
    fireEvent.changeText(getByTestId('password'), 'password');
    fireEvent.press(getByTestId('signIn'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
  });
});
