import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const ReviewItem = ({ review, showActions, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  return (
    <View style={{ backgroundColor: 'white', padding: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 7,
        }}
      >
        <View
          style={{
            marginRight: 20,
            borderRadius: 50 / 2,
            borderColor: '#0365D0',
            borderWidth: 3,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: '700',
            }}
          >
            {review.node.rating}
          </Text>
        </View>

        <View>
          <Text style={{ fontWeight: '700', marginBottom: 3 }}>
            {review.node.user.username}
          </Text>
          <Text>{format(new Date(review.node.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
      </View>
      <Text>{review.node.text}</Text>

      {showActions ? (
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            style={{
              borderRadius: 7,
              backgroundColor: '#0165D4',
              paddingTop: 13,
              paddingRight: 23,
              paddingBottom: 13,
              paddingLeft: 23,
              marginTop: 10,
            }}
            onPress={() => history.push(`/item/${review.node.repositoryId}`)}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
              }}
            >
              View repository
            </Text>
          </Pressable>

          <Pressable
            style={{
              borderRadius: 7,
              backgroundColor: '#D6394C',
              paddingTop: 13,
              paddingRight: 23,
              paddingBottom: 13,
              paddingLeft: 23,
              marginTop: 10,
            }}
            onPress={async () => {
              Alert.alert(
                'Delete review',
                'Are you sure you want to delete this review?',
                [
                  {
                    text: 'Delete',
                    onPress: async () => {
                      await deleteReview({
                        variables: {
                          id: review.node.id,
                        },
                      });
                      refetch();
                    },
                    style: 'destructive',
                  },

                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                ]
              );
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
              }}
            >
              Delete repository
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default ReviewItem;
