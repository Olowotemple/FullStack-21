import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as Yup from 'yup';
import { CREATE_REVIEW } from '../graphql/mutations';
import FormikNumberInput from './FormikNumberInput';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  review: '',
};

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required('Repository owner name is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .min(0, 'Rating cannot be lesser than 0')
    .max(100, 'Rating cannot be greater than 100')
    .required('Rating is required')
    .integer(),
  review: Yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, review } = values;
    const rating = Number(values.rating);

    try {
      const data = (
        await createReview({
          variables: {
            repositoryName,
            ownerName,
            rating: Number(rating),
            review,
          },
        })
      ).data;

      history.push(`/item/${data.createReview.repositoryId}`);
    } catch (err) {
      console.log('Something bad happened :(', err);
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
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
            />

            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
            />

            <FormikNumberInput
              name="rating"
              placeholder="Rating between 0 and 100"
              keyboardType="numeric"
            />

            <FormikTextInput
              name="review"
              placeholder="Review"
              multiline={true}
              numberOfLines={4}
              style={{ textAlignVertical: 'top' }}
            />

            <Pressable
              title="create a review"
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
            >
              <Text style={{ color: '#ffffff' }}>Create a review</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default ReviewForm;
