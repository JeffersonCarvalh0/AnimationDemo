import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useValue} from 'react-native-redash';

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
  const y = useValue(0);
  const [tabs, setTabs] = useState(
    listItems.map((group) => ({name: group.title, anchor: 0})),
  );

  return (
    <View style={styles.container}>
      <HeaderImage y={y} />
      <List
        onMeasurement={(index, tab) => {
          tabs[index] = tab;
          setTabs([...tabs]);
        }}
        y={y}
      />
      <Header y={y} tabs={tabs} />
    </View>
  );
};

export default App;
