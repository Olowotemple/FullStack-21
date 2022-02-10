import { AUTHORIZE } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE, {
    onCompleted: async (data) => {
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    },
  });

  const signIn = async (username, password) => {
    return await mutate({
      variables: {
        username,
        password,
      },
    });
  };

  return [signIn, result];
};

export default useSignIn;
