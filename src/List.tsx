import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';

import listItems from './listItems';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 10,
  },
  item: {
    margin: 10,
    fontSize: 16,
  },
});

interface Props {
  y: Animated.Value<number>;
}

const ListTile = ({text}: {text: string}) => {
  return (
    <View>
      <Text style={styles.item}>{text}</Text>
    </View>
  );
};

const List = ({y}: Props) => {
  return (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
      scrollEventThrottle={16}
      onScroll={onScrollEvent({y})}>
      {listItems.map((group) => {
        return (
          <View key={group.title + 'view'}>
            <Text key="group.title" style={styles.title}>
              {group.title}
            </Text>
            {group.items.map((item) => (
              <ListTile key={group.title + item.text} text={item.text} />
            ))}
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default List;
