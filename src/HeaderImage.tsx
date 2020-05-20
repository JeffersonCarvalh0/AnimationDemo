import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';

import headerImage from './assets/header.jpg';

const {height: wHeight, width: wWidth} = Dimensions.get('window');
export const HEADER_IMAGE_HEIGHT = wHeight / 3;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    width: wWidth,
    resizeMode: 'cover',
  },
});

interface Props {
  y: Animated.Value<number>;
}

const HeaderImage = ({y}: Props) => {
  const height = interpolate(y, {
    inputRange: [-100, 0],
    outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const top = interpolate(y, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });

  return (
    <Animated.Image
      style={[styles.image, {height, top}]}
      source={headerImage}
    />
  );
};

export default HeaderImage;
