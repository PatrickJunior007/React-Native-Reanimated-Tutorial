/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-native-gesture-handler';

import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  SharedValue,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../../assets/constants/theme';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const SecondLesson = () => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({
    x: 0,
    y: 0,
  });
  const start = useSharedValue({
    x: 0,
    y: 0,
  });

  const panGestureEvent = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(e => {
      const distance = Math.sqrt(offset.value.x ** 2 + offset.value.y ** 2);
      if (distance < 200) {
        offset.value = {
          x: 0,
          y: 0,
        };
      }
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value.x,
        },
        {
          translateY: offset.value.y,
        },
        {scale: withSpring(isPressed.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <GestureDetector gesture={panGestureEvent}>
          <Animated.View style={[styles.square, rStyle]} />
        </GestureDetector>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    alignSelf: 'center',
  },
  circle: {
    width: Dimensions.get('screen').width - 75,
    height: 300,
    borderRadius: 50,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
});

export default SecondLesson;
