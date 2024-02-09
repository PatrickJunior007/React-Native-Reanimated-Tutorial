/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Image, ImageSourcePropType} from 'react-native';
import React, {FC} from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface CircularItemProps {
  data: ImageSourcePropType | undefined;
  index: number;
  scrollX: SharedValue<number>;
}
const {width: windowWidth} = Dimensions.get('window');

export const ListItemWidth = windowWidth / 4;

const CircularItem: FC<CircularItemProps> = ({data, index, scrollX}) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ListItemWidth,
      (index - 1) * ListItemWidth,
      index * ListItemWidth,
      (index + 1) * ListItemWidth,
      (index + 2) * ListItemWidth,
    ];

    const trandlateYOutputRange = [
      0,
      -ListItemWidth / 3,
      -ListItemWidth / 2,
      -ListItemWidth / 3,
      0,
    ];

    const opacityOutputRange = [0.5, 0.9, 1, 0.9, 0.5];

    const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      trandlateYOutputRange,
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      opacityOutputRange,
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      scrollX.value,
      inputRange,
      scaleOutputRange,
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {
          translateY: translateY,
        },
        {
          translateX: ListItemWidth / 2 + ListItemWidth,
        },
        {
          scale,
        },
      ],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        rStyle,
        {
          width: ListItemWidth,
          aspectRatio: 1,
          backgroundColor: '#1b1b1b',
          borderRadius: 100,
          margin: 3,
          borderWidth: 2,
          borderColor: 'white',
          elevation: 5,
        },
      ]}>
      <Image
        source={data}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 100,
        }}
      />
    </Animated.View>
  );
};

export default CircularItem;
