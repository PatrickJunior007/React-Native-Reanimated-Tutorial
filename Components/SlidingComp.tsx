import {StyleSheet, ViewToken} from 'react-native';
import React, {FC} from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../assets/constants/theme';

const SlidingComp: FC<{
  viewableItems: SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
}> = ({viewableItems, item}) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(itemF => itemF.isViewable)
        .find(isSeen => isSeen.item?.id === item.id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      // transform: [{scale: withTiming(isVisible ? 1 : 0.6)}],
    };
  });

  return <Animated.View style={[styles.listItem, rStyle]} />;
};

export default React.memo(SlidingComp);

const styles = StyleSheet.create({
  listItem: {
    height: 80,
    backgroundColor: COLORS.mainPrimary,
    width: '90%',
    marginVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
  },
});
