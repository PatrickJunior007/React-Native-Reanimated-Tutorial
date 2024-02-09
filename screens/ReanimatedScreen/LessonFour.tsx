import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from '../../Components/Page';

const WORDS = ["What's", 'Up', 'Mobile', 'Dev'];

const LessonFour = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {WORDS.map((item, index) => {
        return (
          <Page translateX={translateX} key={index} item={item} index={index} />
        );
      })}
    </Animated.ScrollView>
  );
};

export default LessonFour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
