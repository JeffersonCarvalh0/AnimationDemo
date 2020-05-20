import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {TabModel} from './List';
import Tabs from './Tabs';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';

const ICON_SIZE = 36;
const ICON_MARGIN = 5;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
  tabs: TabModel[];
}

const Header = ({y, tabs}: Props) => {
  const titleTop = interpolate(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [HEADER_IMAGE_HEIGHT, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const titleLeft = interpolate(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-(ICON_SIZE + ICON_MARGIN), 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Icon style={styles.icon} name="arrow-back" size={ICON_SIZE} />
        <Animated.Text style={[styles.title, {top: titleTop, left: titleLeft}]}>
          List of things
        </Animated.Text>
      </View>
      <Animated.View style={[styles.bottomRow, {top: titleTop}]}>
        <Tabs tabs={tabs} y={y} />
        <Animated.Text>Some brief description of the list</Animated.Text>
      </Animated.View>
    </View>
  );
};

export default Header;
