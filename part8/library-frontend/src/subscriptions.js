import { gql } from '@apollo/client';

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        id
        name
      }
      published
      genres
    }
  }
`;
