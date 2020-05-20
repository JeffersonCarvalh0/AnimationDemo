import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent} from 'react-native-redash';

import listItems from './listItems';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import {MIN_HEADER_HEIGHT} from './Header';

const styles = StyleSheet.create({
  emptyTopSpace: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
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
  onMeasurement: (index: number, tab: TabModel) => void;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
}

export interface TabModel {
  name: string;
  anchor: number;
}

const List = ({y, onMeasurement, scrollViewRef}: Props) => {
  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      style={StyleSheet.absoluteFill}
      scrollEventThrottle={1}
      onScroll={onScrollEvent({y})}>
      <View style={styles.emptyTopSpace} />
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
                anchor: anchor - 100,
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
