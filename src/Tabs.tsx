import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useValue} from 'react-native-redash';

import Tab from './Tab';
import {TabModel} from './List';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface Props {
  y: Animated.Value<number>;
  tabs: TabModel[];
  active?: boolean;
  onMeasurement?: (index: number, measurement: number) => void;
  onPress?: (index: number) => void;
}

const Tabs = ({tabs, active, onMeasurement, onPress, y}: Props) => {
  const toggle = useValue<0 | 1>(0);
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default Tabs;
