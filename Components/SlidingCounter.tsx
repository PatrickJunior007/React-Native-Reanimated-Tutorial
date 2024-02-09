import {StyleSheet, View, Text} from 'react-native';
import React, {useCallback, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const BUTTON_WIDTH = 170;
const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

const SlidingCounter = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [counter, setCounter] = useState(0);

  const handleIncrementCounter = useCallback(() => {
    setCounter(prev => prev + 1);
  }, []);
  const handleDecrementCounter = useCallback(() => {
    setCounter(prev => prev - 1);
  }, []);
  const handleResetCounter = useCallback(() => {
    setCounter(0);
  }, []);

  const handlePanGesture = Gesture.Pan()
    .onChange(e => {
      translateY.value = clamp(e.translationY, 0, MAX_SLIDE_OFFSET);
      translateX.value = clamp(
        e.translationX,
        -MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET,
      );
    })
    .onEnd(() => {
      if (translateY.value === MAX_SLIDE_OFFSET) {
        runOnJS(handleResetCounter)();
      } else if (translateX.value === MAX_SLIDE_OFFSET) {
        runOnJS(handleIncrementCounter)();
      } else if (translateX.value === -MAX_SLIDE_OFFSET) {
        runOnJS(handleDecrementCounter)();
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4],
      Extrapolation.CLAMP,
    );

    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacityX * opacityY,
    };
  });

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0.4, 0.8],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });

  const rContaierStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value * 0.1},
        {translateY: translateY.value * 0.1},
      ],
    };
  });

  return (
    <Animated.View style={[styles.counterContainer, rContaierStyle]}>
      <Animated.View style={rPlusMinusIconStyle}>
        <AntDesign name="minus" size={20} color={'white'} />
      </Animated.View>
      <Animated.View style={rCloseIconStyle}>
        <AntDesign name="close" size={20} color={'white'} />
      </Animated.View>
      <Animated.View style={rPlusMinusIconStyle}>
        <AntDesign name="plus" size={20} color={'white'} />
      </Animated.View>
      <View style={styles.iconContainer}>
        <GestureDetector gesture={handlePanGesture}>
          <Animated.View style={[styles.iconCircle, rStyle]}>
            <Text style={styles.text}>{counter}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  counterContainer: {
    height: 70,
    width: BUTTON_WIDTH,
    backgroundColor: '#111111',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  iconCircle: {
    height: 50,
    width: 50,
    backgroundColor: '#232323',
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});
