import React from 'react';
import { FlatList, View } from 'react-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={{ height: 10 }} />;

const Reviews = () => {
  const { reviews, refetch } = useAuthorizedUser();

  const reviewEdges = reviews ? reviews.edges : [];

  // if (!reviewEdges.length) {
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: 'white',
  //         height: '80%',
  //         justifyContent: 'center',
  //         // alignItems: 'center',
  //       }}
  //     >
  //       <Text style={{ textAlign: 'center' }}>
  //         You have not reviewed any repositories...
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <FlatList
      data={reviewEdges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} showActions={true} refetch={refetch} />
      )}
      keyExtractor={(item) => item.node.id}
      ListFooterComponentStyle={{ marginBottom: 120 }}
    />
  );
};

export default Reviews;
