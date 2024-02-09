import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import React from 'react';
import SlidingComp from '../../Components/SlidingComp';
import {useSharedValue} from 'react-native-reanimated';

const data = new Array(50).fill(0).map((_, index) => ({
  id: index,
}));

const LessonSixteen = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          viewableItems.value = vItems;
        }}
        // viewabilityConfig={{
        //   itemVisiblePercentThreshold: 50,
        // }}
        renderItem={({item}) => {
          return <SlidingComp viewableItems={viewableItems} item={item} />;
        }}
      />
    </View>
  );
};

export default LessonSixteen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
