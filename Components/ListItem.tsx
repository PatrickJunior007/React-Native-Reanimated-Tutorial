import {Text, StyleSheet, useWindowDimensions} from 'react-native';
import React, {FC} from 'react';
import {Mmodel} from '../screens/ReanimatedScreen/TenthLesson';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../assets/constants/theme';

export interface DATACModel {
  data: Mmodel;
  _index: number;
  handleDismiss: (id: number) => void;
}

const ListItem: FC<DATACModel> = ({data, _index, handleDismiss}) => {
  const translateX = useSharedValue(0);
  const previousX = useSharedValue(0);
  const itemHeight = useSharedValue(70);
  const itemMarginVertical = useSharedValue(10);
  const opacityContainer = useSharedValue(10);
  const initialTouchLocation = useSharedValue<{x: number; y: number} | null>(
    null,
  );

  const SCREEN_WIDTH = useWindowDimensions().width;

  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const reanimatedIconStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {opacity};
  });

  const reanimatedtaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: itemMarginVertical.value,
      opacity: opacityContainer.value,
    };
  });

  const gestureHandle = Gesture.Pan()
    .manualActivation(true)
    .onBegin(evt => {
      previousX.value = translateX.value;
      console.log('x value', evt.x);
      console.log('y value', evt.y);
      initialTouchLocation.value = {x: evt.x, y: evt.y};
    })
    .onTouchesMove((evt, state) => {
      // Sanity checks
      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }

      console.log('change x', evt.changedTouches[0].x);
      console.log('change y', evt.changedTouches[0].y);

      const xDiff = Math.abs(
        evt.changedTouches[0].x - initialTouchLocation.value.x,
      );
      const yDiff = Math.abs(
        evt.changedTouches[0].y - initialTouchLocation.value.y,
      );
      const isHorizontalPanning = xDiff > yDiff;

      if (isHorizontalPanning) {
        state.activate();
      }
    })
    .onChange(e => {
      translateX.value = previousX.value + e.translationX;
    })
    .onEnd(() => {
      if (translateX.value < TRANSLATE_X_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        itemMarginVertical.value = withTiming(0);
        opacityContainer.value = withTiming(0, undefined, isFinished => {
          if (isFinished && handleDismiss) {
            runOnJS(handleDismiss)(data.id);
          }
        });
      } else {
        translateX.value = withTiming(previousX.value);
      }
    });

  return (
    <Animated.View style={[styles.taskContainer, reanimatedtaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, reanimatedIconStyle]}>
        <Icon name="trash" color={COLORS.red} size={27} />
      </Animated.View>
      <GestureDetector gesture={gestureHandle}>
        <Animated.View style={[styles.task, reanimatedStyle]}>
          <Text style={styles.taskTile}>{data.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  task: {
    width: '90%',
    height: 70,
    paddingLeft: 20,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
  },
  taskTile: {
    fontSize: 16,
    color: 'black',
  },
  iconContainer: {
    height: 70,
    width: 70,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
