import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
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

export const ME = gql`
  query me {
    me {
      id
      favoriteGenre
    }
  }
`;
