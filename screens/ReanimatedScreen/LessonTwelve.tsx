/* eslint-disable react-native/no-inline-styles */
import {Dimensions, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const LessonTwelve = () => {
  const translateX = useSharedValue(0);
  const previousX = useSharedValue(0);
  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const TRANSLATE_X_TRESHOLD = SCREEN_WIDTH * 0.3;
  const handleGesture = Gesture.Pan()
    .onStart(() => {
      previousX.value = translateX.value;
    })
    .onChange(e => {
      translateX.value = e.translationX + previousX.value;
    })
    .onEnd(() => {
      if (translateX.value <= TRANSLATE_X_TRESHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    });

  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 3],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 15],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {
          perspective: 100,
        },
        {
          rotateY: `-${rotate}deg`,
        },
        {
          translateX: translateX.value,
        },
      ],
      borderRadius: borderRadius,
    };
  });

  const handleDrawer = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(SCREEN_WIDTH / 2);
    }
  }, [SCREEN_WIDTH, translateX]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#1e1e23'} />

      <GestureDetector gesture={handleGesture}>
        <Animated.View style={[{backgroundColor: 'white', flex: 1}, rStyle]}>
          <Feather
            name="menu"
            size={32}
            color={'#1e1e23'}
            style={{margin: 15}}
            onPress={handleDrawer}
          />
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default LessonTwelve;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e23',
  },
});
