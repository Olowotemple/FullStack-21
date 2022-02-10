import React, { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { useDebounce } from 'use-debounce';

const RepositoryList = () => {
  const [orderingPrinciple, setOrderingPrinciple] = useState('latest');
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500);
  const { repositories, fetchMore } = useRepositories(
    orderingPrinciple,
    debouncedFilter
  );

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderingPrinciple={orderingPrinciple}
      setOrderingPrinciple={setOrderingPrinciple}
      filter={filter}
      setFilter={setFilter}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
