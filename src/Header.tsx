import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {diffClamp, interpolate} from 'react-native-reanimated';

const HEADER_HEIGHT = 60;

const headerStyle = StyleSheet.create({
  view: {
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#ffb74d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});

interface Props {
  y: Animated.Value<number>;
}

const Header = ({y}: Props) => {
  const diffClampY = diffClamp(y, 0, HEADER_HEIGHT);
  const translateY = interpolate(diffClampY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  return (
    <Animated.View
      style={{...headerStyle.view, transform: [{translateY: translateY}]}}>
      <Text>Header</Text>
    </Animated.View>
  );
};

export default Header;
