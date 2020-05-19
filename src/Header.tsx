import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

import headerImage from './assets/header.jpg';

const {height: wHeight, width: wWidth} = Dimensions.get('window');
export const HEADER_HEIGHT = wHeight / 3;
const ICON_SIZE = 36;
const ICON_MARGIN = 5;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    position: 'absolute',
    top: 0,
    width: wWidth,
    resizeMode: 'cover',
  },
  topRow: {
    elevation: 2,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: ICON_MARGIN,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface Props {
  y: Animated.Value<number>;
}

const Header = ({y}: Props) => {
  const headerHeight = interpolate(y, {
    inputRange: [-100, 0],
    outputRange: [HEADER_HEIGHT + 100, HEADER_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const headerTop = interpolate(y, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });

  const titleTop = interpolate(y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const titleLeft = interpolate(y, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [-(ICON_SIZE + ICON_MARGIN), 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.image, {height: headerHeight, top: headerTop}]}
        source={headerImage}
      />
      <View style={styles.topRow}>
        <Icon style={styles.icon} name="arrow-back" size={ICON_SIZE} />
        <Animated.Text style={[styles.title, {top: titleTop, left: titleLeft}]}>
          List of things
        </Animated.Text>
      </View>
      <Animated.View style={[styles.bottomRow, {top: titleTop}]}>
        <Animated.Text>Some brief description of the list</Animated.Text>
      </Animated.View>
    </View>
  );
};

export default Header;
