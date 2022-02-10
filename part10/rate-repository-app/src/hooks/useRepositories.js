import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderingPrinciple, searchKeyword) => {
  let variables = { searchKeyword: searchKeyword ? searchKeyword : '' };
  (() => {
    switch (orderingPrinciple) {
      case 'highestRated':
        variables = {
          ...variables,
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'DESC',
        };
        break;

      case 'lowestRated':
        variables = {
          ...variables,
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
        };
        break;

      default:
        variables = {
          ...variables,
          orderBy: 'CREATED_AT',
        };
        break;
    }
  })(variables);

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
