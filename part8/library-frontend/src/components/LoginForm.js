import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../mutations';

const LoginForm = ({ setToken, show }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN);

  useEffect(() => {
    if (data) {
      const token = data.login.value;
      localStorage.setItem('libUserUID', token);
      setToken(token);
    }
  }, [data]); //eslint-disable-line

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await login({
      variables: {
        username,
        password,
      },
    });

    window.history.go(0);
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      username:{' '}
      <input
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
      />{' '}
      <br />
      password:{' '}
      <input
        type="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />{' '}
      <br />
      <button>login</button>
    </form>
  );
};

export default LoginForm;
