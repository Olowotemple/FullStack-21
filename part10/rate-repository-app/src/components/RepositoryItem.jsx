import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={{ height: 10 }} />;

const RepositoryItem = ({ item, path }) => {
  const { id } = useParams();
  const variables = { id };
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  if (!path) {
    return <RepositoryInfo repository={item} />;
  }

  if (loading) {
    return null;
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  // const reviewEdges = data?.repository.review.edges
  //   ? data.repository.review.edges
  //   : [];

  return (
    <FlatList
      data={data.repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ node: { id } }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={data.repository} path={path} />
      )}
      ListHeaderComponentStyle={[{ marginBottom: 10 }]}
      style={{ marginBottom: 120 }}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryItem;
