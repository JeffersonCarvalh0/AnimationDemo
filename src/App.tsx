import React from 'react';
import {View} from 'react-native';
import Header from './Header';
import List from './List';
import {useValue} from 'react-native-redash';

const App = () => {
  const y = useValue(0);

  return (
    <View>
      <Header y={y} />
      <List y={y} />
    </View>
  );
};

export default App;
