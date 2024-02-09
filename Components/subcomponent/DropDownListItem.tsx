/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {ItemProps} from '../Dropdown';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface DropDownListProps {
  item: ItemProps;
  index: number;
  dropDownItemCount: number;
  isExpanded: SharedValue<boolean>;
}

const DropDownListItemHeight = 85;

const DropDownListItem: React.FC<DropDownListProps> = ({
  index,
  item,
  dropDownItemCount,
  isExpanded,
}) => {
  const {width: windowWidth} = useWindowDimensions();
  const Margin = 10;
  const fullDropDownHeight =
    (dropDownItemCount / 1.5) * (DropDownListItemHeight + Margin);

  const collapsedTop = fullDropDownHeight / 2 - DropDownListItemHeight;
  const expandedTop = (DropDownListItemHeight + Margin) * index;

  const expandedScale = 1;
  const collapsedScale = 1 - index * 0.08;

  const expandedBG = '#1b1b1b';
  const collapsedBG = '#1b1b1b';

  const isHeader = index === 0;

  /* To do this you have to install the color package */
  // const collapsedBG = Color(expandedBG).lighten(index * 0.25).hex();

  const rStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
      backgroundColor: withTiming(isExpanded.value ? expandedBG : collapsedBG),
      transform: [
        {
          scale: withSpring(isExpanded.value ? expandedScale : collapsedScale),
        },
        {
          translateY: fullDropDownHeight / 2,
        },
      ],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isHeader && isExpanded.value ? '90deg' : '0deg'),
        },
      ],
    };
  });
  const iconConOpaStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isHeader || isExpanded.value ? 1 : 0),
    };
  });

  return (
    <Animated.View
      onTouchEnd={() => {
        if (isHeader) {
          isExpanded.value = !isExpanded.value;
        }
      }}
      style={[
        styles.box,
        {
          zIndex: dropDownItemCount - index,
          position: 'absolute',
          width: windowWidth * 0.95,
        },
        rStyle,
      ]}>
      <View style={styles.itemContainer}>
        <Animated.View
          style={[
            styles.iconContainer,
            iconConOpaStyle,
            {
              left: 15,
            },
          ]}>
          <AntDesign name={item.iconName} size={25} color="#D4D4D4" />
        </Animated.View>
        <Text style={styles.label}>{item.label}</Text>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              right: 15,
              backgroundColor: 'transparent',
            },
            iconStyle,
          ]}>
          <MaterialIcons
            name={!isHeader ? 'arrow-forward' : 'arrow-forward-ios'}
            size={25}
            color="#D4D4D4"
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default DropDownListItem;

const styles = StyleSheet.create({
  box: {
    // marginBottom: 10,
    borderRadius: 10,
    height: DropDownListItemHeight,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#D4D4D4',
    fontSize: 22,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  iconContainer: {
    width: 45,
    aspectRatio: 1,
    position: 'absolute',
    backgroundColor: '#111',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
