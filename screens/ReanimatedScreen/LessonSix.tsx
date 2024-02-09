/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const LessonSix = () => {
  const Img = require('../../assets/images/jjk.jpg');
  const scale = useSharedValue(1);
  const imageTap = useSharedValue(false);
  const savedScale = useSharedValue(1);
  const focalize = useSharedValue({
    x: 0,
    y: 0,
  });
  const savedFocalize = useSharedValue({
    x: 0,
    y: 0,
  });

  console.log(imageTap);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const handleGestureTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onBegin(() => {
      imageTap.value = !imageTap.value;
    })
    .onStart(e => {
      scale.value = imageTap.value ? withTiming(3) : withTiming(1);
      focalize.value = {
        x: e.absoluteX,
        y: e.absoluteY,
      };
    })
    .onEnd(() => {
      savedFocalize.value = {
        x: focalize.value.x,
        y: focalize.value.y,
      };
    });

  const handleGesture = Gesture.Pinch()
    .onBegin(() => {
      imageTap.value = !imageTap.value;
    })
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
      focalize.value = {
        x: e.focalX,
        y: e.focalY,
      };
    })
    .onEnd(() => {
      scale.value = withTiming(1);
      savedFocalize.value = {
        x: focalize.value.x,
        y: focalize.value.y,
      };
    })
    .simultaneousWithExternalGesture(handleGestureTap);

  const handleGesturePan = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_evt, state) => {
      if (imageTap.value === true) {
        state.activate();
      }
    })
    .onUpdate(e => {
      focalize.value = {
        x: -e.translationX + savedFocalize.value.x,
        y: -e.translationY + savedFocalize.value.y,
      };
    })
    .onEnd(() => {
      savedFocalize.value = {
        x: focalize.value.x,
        y: focalize.value.y,
      };
    })
    .simultaneousWithExternalGesture(handleGesture);

  const rImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalize.value.x,
        },
        {
          translateY: focalize.value.y,
        },
        {
          translateX: -width / 2,
        },
        {
          translateY: -height / 2,
        },
        {scale: scale.value},
        {
          translateX: -focalize.value.x,
        },
        {
          translateY: -focalize.value.y,
        },
        {
          translateX: width / 2,
        },
        {
          translateY: height / 2,
        },
      ],
    };
  });

  const fPointStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalize.value.x,
        },
        {
          translateY: focalize.value.y,
        },
      ],
    };
  });

  const composedGesture = Gesture.Race(
    handleGestureTap,
    handleGesture,
    handleGesturePan,
  );

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={{flex: 1}}>
        <AnimatedImage
          resizeMode={'center'}
          style={[{flex: 1, width: '100%'}, rImageStyle]}
          source={Img}
        />
        <Animated.View style={[styles.focalPoint, fPointStyle]} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  focalPoint: {
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
});

export default LessonSix;
