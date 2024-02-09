import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {N, SQUARE_SIZE} from '../assets/constants/contants';

interface ClockProps {
  progess: SharedValue<number>;
  index: number;
}

const ClockComp: React.FC<ClockProps> = ({index, progess}) => {
  const offSetAngle = (2 * Math.PI) / N;
  const finalAngle = offSetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progess.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progess.value);
    }
    if (progess.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }
    return progess.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }
    if (progess.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    }
    return withTiming(-index * SQUARE_SIZE);
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotate.value}rad`},
        {translateY: translateY.value},
      ],
    };
  });
  return (
    <Animated.View
      style={[
        styles.square,
        {
          // opacity: (index + 1) / N,
        },
        rStyle,
      ]}
    />
  );
};

export default ClockComp;

const styles = StyleSheet.create({
  square: {
    height: SQUARE_SIZE,
    aspectRatio: 1,
    backgroundColor: 'white',
    position: 'absolute',
  },
});
