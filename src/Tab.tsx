import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';

export const TABS_MARGIN = 8;

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: TABS_MARGIN,
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
      <View style={styles.container}>
        <Text
          style={[styles.text]}
          onLayout={({
            nativeEvent: {
              layout: {width: width},
            },
          }) => onMeasurement(width + TABS_MARGIN * 2)}>
          {name}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};
