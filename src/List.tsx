import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';

import listItems from './listItems';
import {HEADER_HEIGHT} from './Header';

const styles = StyleSheet.create({
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
  onMeasurement: (index: number, tab: TabModel) => void;
}

export interface TabModel {
  name: string;
  anchor: number;
}

const List = ({y, onMeasurement}: Props) => {
  return (
    <Animated.ScrollView
      style={StyleSheet.absoluteFill}
      scrollEventThrottle={1}
      onScroll={onScrollEvent({y})}>
      {listItems.map((group, index) => {
        return (
          <View
            key={group.title + 'view'}
            onLayout={({
              nativeEvent: {
                layout: {y: anchor},
              },
            }) =>
              onMeasurement(index, {
                name: group.title,
                anchor: anchor - 142,
              })
            }>
            <Text key="group.title" style={styles.title}>
              {group.title}
            </Text>
            {group.items.map((item) => (
              <View key={group.title + item.text}>
                <Text style={styles.item}>{item.text}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default List;
