import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';

export const TABS_MARGIN = 8;

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: TABS_MARGIN,
  },
  text: {
    fontSize: 14,
  },
});

interface TabProps {
  name: string;
  onMeasurement: (measurement: number) => void;
  onPress: () => void;
}

export default ({name, onMeasurement, onPress}: TabProps) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => onMeasurement(width)}
        style={styles.container}>
        <Text style={[styles.text]}>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};
