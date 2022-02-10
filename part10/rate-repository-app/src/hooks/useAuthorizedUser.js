import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = () => {
  const { data, refetch } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      withReviews: true,
    },
  });

  return {
    reviews: data?.authorizedUser && data?.authorizedUser.reviews,
    refetch,
  };
};

export default useAuthorizedUser;
