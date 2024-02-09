import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import ClockComp from '../../Components/ClockComp';
import {N} from '../../assets/constants/contants';

const LessonFourteen = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {new Array(N).fill(0).map((_, index) => {
        return <ClockComp progess={progress} index={index} key={index} />;
      })}
    </View>
  );
};

export default LessonFourteen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
});
