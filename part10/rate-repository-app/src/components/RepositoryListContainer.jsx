import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import OrderPrincipleSelector from './OrderPrincipleSelector';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeaderComponent = ({
  orderingPrinciple,
  setOrderingPrinciple,
  filter,
  setFilter,
}) => {
  return (
    <>
      <Searchbar
        value={filter}
        onChangeText={setFilter}
        placeholder="Search repositories..."
        style={{
          height: 40,
          margin: 12,
          marginBottom: 0,
        }}
      />

      <OrderPrincipleSelector
        orderingPrinciple={orderingPrinciple}
        setOrderingPrinciple={setOrderingPrinciple}
      />
    </>
  );
};

const RepositoryListContainer = ({
  repositories,
  orderingPrinciple,
  setOrderingPrinciple,
  filter,
  setFilter,
  onEndReach,
}) => {
  const history = useHistory();

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => void history.push(`/item/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      style={{ marginBottom: 120 }}
      ListHeaderComponent={
        <ListHeaderComponent
          orderingPrinciple={orderingPrinciple}
          setOrderingPrinciple={setOrderingPrinciple}
          filter={filter}
          setFilter={setFilter}
        />
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      // other props
    />
  );
};

export default RepositoryListContainer;
