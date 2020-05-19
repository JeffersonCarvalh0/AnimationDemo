import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Header';
import List from './List';
import {useValue} from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  const y = useValue(0);

  return (
    <View style={styles.container}>
      <Header y={y} />
      <List y={y} />
    </View>
  );
};

export default App;
