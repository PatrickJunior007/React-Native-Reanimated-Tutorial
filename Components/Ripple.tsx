import {StyleProp, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
  children?: ReactNode;
}

const Ripple: React.FC<RippleProps> = ({style, onTap, children}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const transformTap = useSharedValue({
    x: 0,
    y: 0,
  });
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const aRef = useAnimatedRef<View>();

  const handleGesture = Gesture.Tap()
    .onBegin(() => {
      if (onTap) {
        runOnJS(onTap)();
      }
    })
    .onStart(e => {
      // console.log(e);
      const layout = measure(aRef);
      if (layout) {
        width.value = layout.width;
        height.value = layout.height;
      }

      transformTap.value = {
        x: e.x,
        y: e.y,
      };

      opacity.value = 1;
      scale.value = 0;
      scale.value = withTiming(1, {
        duration: 1000,
      });
    })
    .onFinalize(() => {
      opacity.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: opacity.value,
      backgroundColor: 'rgba(0,0,0,0.2)',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        {
          scale: scale.value,
        },
        {
          translateX: transformTap.value.x - circleRadius,
        },
        {
          translateY: transformTap.value.y - circleRadius,
        },
      ],
    };
  });

  return (
    <View ref={aRef} style={style}>
      <GestureDetector gesture={handleGesture}>
        <Animated.View style={style}>
          <View>{children}</View>
          <Animated.View style={rStyle} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Ripple;
