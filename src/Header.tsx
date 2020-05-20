import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  useCode,
  greaterThan,
  set,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useValue, withTransition} from 'react-native-redash';

import {TabModel} from './List';
import Tabs from './Tabs';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';

const ICON_SIZE = 36;
const ICON_MARGIN = 5;
export const TABS_MARGIN = 10;
export const MIN_HEADER_HEIGHT = 100;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
  },
  header: {
    backgroundColor: 'white',
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
    margin: TABS_MARGIN,
  },
});

interface Props {
  y: Animated.Value<number>;
  tabs: TabModel[];
}

const Header = ({y, tabs}: Props) => {
  const toggle = useValue<0 | 1>(0);

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

  useCode(() => set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT)), []);
  const transition = withTransition(toggle);
  const opacity = transition;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.header, {opacity}]}
      />
      <View style={styles.topRow}>
        <Icon style={styles.icon} name="arrow-back" size={ICON_SIZE} />
        <Animated.Text style={[styles.title, {top: titleTop, left: titleLeft}]}>
          List of things
        </Animated.Text>
      </View>
      <Animated.View style={[styles.bottomRow, {top: titleTop}]}>
        <Animated.Text>Some brief description of the list</Animated.Text>
        <Tabs tabs={tabs} opacity={opacity} y={y} />
      </Animated.View>
    </View>
  );
};

export default Header;
