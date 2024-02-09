import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import React, {FC} from 'react';
import {Mmodel} from '../screens/ReanimatedScreen/TenthLesson';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../assets/constants/theme';

export type DATACModel = {
  data: Mmodel;
  _index: number;
};

const LinkeldnComp: FC<DATACModel> = ({data, _index}) => {
  const translateX = useSharedValue(0);
  const previousX = useSharedValue(0);

  const SCREEN_WIDTH = useWindowDimensions().width;

  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.5;

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const gestureHandle = Gesture.Pan()
    .onBegin(() => {
      previousX.value = translateX.value;
    })
    .onChange(e => {
      if (translateX.value < TRANSLATE_X_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 0.5);
      } else if (translateX.value > 0) {
        return;
      } else {
        translateX.value = previousX.value + e.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value <= TRANSLATE_X_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 0.5);
      } else {
        translateX.value = withTiming(0);
      }
    });

  return (
    <View style={styles.taskContainer}>
      <View style={styles.iconContainer}>
        <Icon name="trash" color={COLORS.red} size={27} />
      </View>
      <GestureDetector gesture={gestureHandle}>
        <Animated.View style={[styles.task, reanimatedStyle]}>
          <Text style={styles.taskTile}>{data.title}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
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
    width: '100%',
    paddingHorizontal: '10%',
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
    width: '100%',
    backgroundColor: 'blue',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LinkeldnComp;
