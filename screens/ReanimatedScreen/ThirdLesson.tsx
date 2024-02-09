/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-native-gesture-handler';

import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  SharedValue,
} from 'react-native-reanimated';
import {COLORS} from '../../assets/constants/theme';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {start} from 'repl';

const ThridLesson = () => {
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
    })
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(e => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
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
      <GestureDetector gesture={panGestureEvent}>
        <Animated.View style={[styles.square, rStyle]} />
      </GestureDetector>
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
});

export default ThridLesson;
