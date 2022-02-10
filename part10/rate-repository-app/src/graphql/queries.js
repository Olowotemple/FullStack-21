import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int = 5
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      totalCount
      edges {
        node {
          createdAt
          description
          forksCount
          fullName
          id
          language
          name
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
          stargazersCount
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query AuthorizedUser($withReviews: Boolean! = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $withReviews) {
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          node {
            repositoryId
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!, $first: Int = 3, $after: String) {
    repository(id: $id) {
      id
      fullName
      description
      url
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      reviews(first: $first, after: $after) {
        edges {
          node {
            repositoryId
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
