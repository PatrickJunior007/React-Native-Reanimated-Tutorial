import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';

const BG_COLOR = '#444B6F';
const BG_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const CIRCLE_LENGTH = 1000;

const LessonNine = () => {
  const progress = useSharedValue(0);
  const AnimatedProps = useAnimatedProps(() => {
    return {
      id: CIRCLE_LENGTH.toString(),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text animatedProps={AnimatedProps}>LessonNine</Animated.Text>
    </View>
  );
};

export default LessonNine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG_COLOR,
  },
});
