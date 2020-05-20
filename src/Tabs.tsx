import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useCode,
  block,
  cond,
  greaterOrEq,
  lessOrEq,
  and,
  set,
  interpolate,
} from 'react-native-reanimated';
import {useValue, withTransition} from 'react-native-redash';

import Tab, {TABS_MARGIN} from './Tab';
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
  y: Animated.Value<number>;
  tabs: TabModel[];
  onPress?: (index: number) => void;
  opacity: Animated.Node<number>;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
}

const Tabs = ({tabs, onPress, opacity, y, scrollViewRef}: Props) => {
  const currentIndex = useValue(0);
  const indexTransition = withTransition(currentIndex);

  const [measurements, setMeasurements] = useState(
    new Array(tabs.length).fill(0),
  );

  const width = interpolate(indexTransition, {
    inputRange: tabs.map((_, i) => i),
    outputRange: measurements,
  });

  const translateX = interpolate(indexTransition, {
    inputRange: tabs.map((_, i) => i),
    outputRange: tabs.map(
      (_, i) =>
        -measurements.filter((__, j) => j < i).reduce((acc, m) => acc + m, 0) -
        TABS_MARGIN * i,
    ),
  });

  const selectedTabBorder = {
    flex: 5,
    width,
    borderBottomWidth: 1,
  };

  useCode(
    () =>
      block(
        tabs.map((tab, i) =>
          cond(
            i === tabs.length - 1
              ? greaterOrEq(y, tab.anchor)
              : and(
                  greaterOrEq(y, tab.anchor),
                  lessOrEq(y, tabs[i + 1].anchor),
                ),
            set(currentIndex, i),
          ),
        ),
      ),
    [currentIndex, tabs, y],
  );

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Animated.View style={[StyleSheet.absoluteFill, selectedTabBorder]} />
      {tabs.map((tab, index) => (
        <Animated.View key={index} style={{transform: [{translateX}]}}>
          <Tab
            onMeasurement={(measurement) => {
              measurements[index] = measurement;
              setMeasurements(measurements);
            }}
            onPress={() => {
              if (scrollViewRef.current) {
                scrollViewRef.current.getNode().scrollTo({y: tab.anchor + 1});
              }
            }}
            {...tab}
          />
        </Animated.View>
      ))}
    </Animated.View>
  );
};

export default Tabs;
