import { render } from '@testing-library/react-native';
import React from 'react';
import { prettyThousand } from '../src/components/RepositoryItem';
import RepositoryListContainer from '../src/components/RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      expect(getAllByTestId('repositoryItem')).toHaveLength(2);

      expect(getAllByTestId('repositoryItem')[0]).toHaveTextContent(
        'jaredpalmer/formik'
      );
      expect(getAllByTestId('repositoryItem')[0]).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(getAllByTestId('repositoryItem')[0]).toHaveTextContent(
        'TypeScript'
      );
      expect(getAllByTestId('repositoryItem')[0]).toHaveTextContent(
        prettyThousand(1619)
      );
      expect(getAllByTestId('repositoryItem')[0]).toHaveTextContent(
        prettyThousand(21856)
      );
      expect(getAllByTestId('repositoryItem')[0]).toHaveTextContent(
        prettyThousand(88)
      );
      expect(getAllByTestId('repositoryItem')[0]).toHaveTextContent(
        prettyThousand(3)
      );

      expect(getAllByTestId('repositoryItem')[1]).toHaveTextContent(
        'async-library/react-async'
      );
      expect(getAllByTestId('repositoryItem')[1]).toHaveTextContent(
        'Flexible promise-based React data loader'
      );
      expect(getAllByTestId('repositoryItem')[1]).toHaveTextContent(
        'JavaScript'
      );
      expect(getAllByTestId('repositoryItem')[1]).toHaveTextContent(
        prettyThousand(69)
      );
      expect(getAllByTestId('repositoryItem')[1]).toHaveTextContent(
        prettyThousand(1760)
      );
      expect(getAllByTestId('repositoryItem')[1]).toHaveTextContent(
        prettyThousand(72)
      );
      expect(getAllByTestId('repositoryItem')[1]).toHaveTextContent(
        prettyThousand(3)
      );
    });
  });
});
