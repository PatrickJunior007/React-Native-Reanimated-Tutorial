import {StyleSheet, View} from 'react-native';
import React from 'react';
import SlidingCounter from '../../Components/SlidingCounter';

const LessonThirteeen = () => {
  return (
    <View style={styles.container}>
      <SlidingCounter />
    </View>
  );
};

export default LessonThirteeen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
