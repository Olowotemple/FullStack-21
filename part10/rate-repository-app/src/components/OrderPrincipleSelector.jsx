import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

const OrderPrincipleSelector = ({ setOrderingPrinciple }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Pressable
            onPress={openMenu}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 'auto' }}>
              Latest Repositories
            </Text>

            <IconButton icon="menu-down" />
          </Pressable>
        }
      >
        <Menu.Item
          onPress={() => {
            setOrderingPrinciple('latest');
            closeMenu();
          }}
          title="Latest Repositories"
        />
        <Menu.Item
          onPress={() => {
            setOrderingPrinciple('highestRated');
            closeMenu();
          }}
          title="Highest Rated Repositories"
        />
        <Menu.Item
          onPress={() => {
            setOrderingPrinciple('lowestRated');
            closeMenu();
          }}
          title="Lowest Rated Repositories"
        />
      </Menu>
    </View>
  );
};

export default OrderPrincipleSelector;
