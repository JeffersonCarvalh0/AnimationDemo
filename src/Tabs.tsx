import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import Tab from './Tab';
import {TabModel} from './List';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface Props {
  tabs: TabModel[];
  active?: boolean;
  onMeasurement?: (index: number, measurement: number) => void;
  onPress?: (index: number) => void;
  opacity: Animated.Node<number>;
}

const Tabs = ({tabs, active, onMeasurement, onPress, opacity}: Props) => {
  return (
    <Animated.View style={[styles.container, {opacity}]}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          onMeasurement={
            onMeasurement ? onMeasurement.bind(null, index) : undefined
          }
          color={active ? 'white' : 'black'}
          onPress={onPress ? onPress.bind(null, index) : undefined}
          {...tab}
        />
      ))}
    </Animated.View>
  );
};

export default Tabs;
