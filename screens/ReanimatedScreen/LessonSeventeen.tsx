import {StyleSheet, View} from 'react-native';
import React from 'react';
import Dropdown from '../../Components/Dropdown';

const options = [
  {
    label: 'Charts',
    iconName: 'barschart',
  },
  {
    label: 'Book',
    iconName: 'book',
  },
  {
    label: 'Calendar',
    iconName: 'calendar',
  },
  {
    label: 'Camera',
    iconName: 'camera',
  },
];

const header = {
  label: 'Header',
  iconName: 'ellipsis1',
};

const LessonSeventeen = () => {
  return (
    <View style={styles.container}>
      <Dropdown header={header} options={options} />
    </View>
  );
};

export default LessonSeventeen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
});
