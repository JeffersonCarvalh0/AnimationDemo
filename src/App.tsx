import React, {useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useValue} from 'react-native-redash';
import Animated from 'react-native-reanimated';

import HeaderImage from './HeaderImage';
import List from './List';
import Header from './Header';
import listItems from './listItems';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  const scrollView = useRef<Animated.ScrollView>(null);
  const y = useValue(0);
  const [tabs, setTabs] = useState(
    listItems.map((group) => ({name: group.title, anchor: 0})),
  );

  return (
    <View style={styles.container}>
      <HeaderImage y={y} />
      <List
        scrollViewRef={scrollView}
        onMeasurement={(index, tab) => {
          tabs[index] = tab;
          setTabs([...tabs]);
        }}
        y={y}
      />
      <Header y={y} tabs={tabs} scrollViewRef={scrollView} />
    </View>
  );
};

export default App;
