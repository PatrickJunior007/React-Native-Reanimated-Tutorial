/* eslint-disable react-native/no-inline-styles */
import {Image, Text, View} from 'react-native';
import React, {FC, Ref, useRef} from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {AnimatedScrollView} from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView';
import {COLORS, SIZES} from '../../assets/constants/theme';

interface RenderImageProps {
  scrollY: SharedValue<number>;
}

const RenderImage: FC<RenderImageProps> = ({scrollY}) => {
  const Logo = require('../../assets/images/ps.png');
  const inputRange = [0, 200];
  const imageOnScrollAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        [150, 50],
        Extrapolation.CLAMP,
      ),
      width: interpolate(
        scrollY.value,
        inputRange,
        [150, 50],
        Extrapolation.CLAMP,
      ),
      top: interpolate(
        scrollY.value,
        inputRange,
        [80, 40],
        Extrapolation.CLAMP,
      ),
      right: interpolate(
        scrollY.value,
        inputRange,
        [SIZES.width / 2 - 75, SIZES.padding],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 80,
          right: SIZES.width / 2 - 75,
          width: 150,
          height: 150,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.white2,
        },
        imageOnScrollAnimatedStyle,
      ]}>
      <Image
        source={Logo}
        style={{
          width: '60%',
          height: '60%',
          borderRadius: 50,
        }}
      />
    </Animated.View>
  );
};

const RSLessonOne = () => {
  const scrollViewRef = useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <RenderImage scrollY={scrollY} />

      <Animated.ScrollView
        onScroll={onScroll}
        style={{
          marginTop: 30,
        }}
        contentContainerStyle={{
          paddingTop: 150,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding,
        }}
        ref={scrollViewRef as unknown as Ref<AnimatedScrollView>}>
        <Text style={{marginTop: 800}}>RSLessonOne</Text>
      </Animated.ScrollView>
    </View>
  );
};

export default RSLessonOne;
