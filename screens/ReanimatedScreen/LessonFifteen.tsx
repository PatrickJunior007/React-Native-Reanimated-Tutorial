/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
const LIST_ITEM_COLOR = '#1798DE';

interface ItemProps {
  id: number;
}

const LessonFifteen = () => {
  const [items, setItems] = useState<ItemProps[]>(
    // new Array(5).fill(0).map((_, index) => ({
    //   id: index,
    // })),
    [],
  );

  const intitalMode = useRef(true);

  useEffect(() => {
    intitalMode.current = false;
  }, []);

  const onDelete = useCallback(
    (id: number) => {
      setItems(items.filter(item => item.id !== id));
    },
    [items],
  );

  const handleAddItems = useCallback(() => {
    setItems(currentItems => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [
        ...currentItems,
        {
          id: nextItemId,
        },
      ];
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item, index) => {
          return (
            <Animated.View
              entering={
                intitalMode.current ? FadeIn.delay(100 * index) : FadeIn
              }
              key={item.id}
              onTouchEnd={() => onDelete(item.id)}
              style={styles.listItem}
              exiting={FadeOut}
              layout={LinearTransition.delay(100)}
            />
          );
        })}
      </ScrollView>

      <TouchableOpacity
        onPress={handleAddItems}
        activeOpacity={0.7}
        style={styles.button}>
        <Text style={{fontSize: 30, fontWeight: '500', color: 'white'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LessonFifteen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
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
  button: {
    width: 70,
    aspectRatio: 1,
    backgroundColor: 'black',
    borderRadius: 35,
    position: 'absolute',
    bottom: 20,
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
