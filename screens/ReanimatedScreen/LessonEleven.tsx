/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ripple from '../../Components/Ripple';

const LessonEleven = () => {
  const handleTap = () => {};
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={handleTap}>
        <Text style={{fontSize: 20}}>Tap</Text>
      </Ripple>
    </View>
  );
};

export default LessonEleven;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    width: 200,
    height: 200,
    elevation: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});
