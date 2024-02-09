import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('screen');

const LessonSeven = () => {
  const Img = require('../../assets/images/jjk.jpg');
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleDoubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      scale.value = withSpring(1, undefined, isFinished => {
        if (isFinished) {
          scale.value = withDelay(500, withTiming(0));
        }
      });
    });
  const handleSingleTapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      opacity.value = withSpring(0, undefined, isFinished => {
        if (isFinished) {
          opacity.value = withDelay(500, withTiming(1));
        }
      });
    });
  const GestureHandler = Gesture.Exclusive(
    handleDoubleTapGesture,
    handleSingleTapGesture,
  );

  return (
    <View style={styles.container}>
      <GestureDetector gesture={GestureHandler}>
        <Animated.View>
          <ImageBackground
            resizeMode={'center'}
            style={styles.image}
            source={Img}>
            <AnimatedIcon
              name={'heart' as any}
              color={'rgba(255,255,255,0.9)'}
              size={200}
              style={[styles.likeImage, rStyle]}
            />
            <Animated.Text style={[styles.text, textStyle]}>
              😂😂😂😂😂
            </Animated.Text>
          </ImageBackground>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default LessonSeven;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height,
    width,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    zIndex: 3,
    fontSize: 40,
  },
  likeImage: {zIndex: 3, elevation: 9},
});
