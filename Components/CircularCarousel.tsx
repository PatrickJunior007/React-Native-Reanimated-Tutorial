/* eslint-disable react-native/no-inline-styles */
import {FlatList, ImageSourcePropType} from 'react-native';
import React, {FC} from 'react';
import CircularItem, {ListItemWidth} from './subcomponent/CircularItem';
import {useSharedValue} from 'react-native-reanimated';

interface DataProps {
  data: ImageSourcePropType[];
}

const CircularCarousel: FC<DataProps> = ({data}) => {
  const scrollX = useSharedValue(0);

  // const FlatListRef = useRef<FlatList>(null);
  // let FlatListIndex = useRef(0);

  // // useEffect(() => {
  // //   const interval = setInterval(() => {
  // //     FlatListIndex.current++;

  // //     if (FlatListIndex.current < data?.length) {
  // //       FlatListRef?.current?.scrollToIndex({
  // //         animated: true,
  // //         index: FlatListIndex.current,
  // //       });
  // //     } else {
  // //       FlatListRef?.current?.scrollToIndex({
  // //         animated: true,
  // //         index: 0,
  // //       });
  // //     }

  // //     if (FlatListIndex.current > data.length) {
  // //       FlatListIndex.current = 0;
  // //     }
  // //   }, 1000);

  // //   return () => clearInterval(interval);
  // // }, []);

  // // console.log(FlatListIndex);

  return (
    <FlatList
      data={data}
      // ref={FlatListRef}
      keyExtractor={(item, index: any) => index}
      horizontal
      onScroll={event => {
        scrollX.value = event.nativeEvent.contentOffset.x;
      }}
      scrollEventThrottle={16} //60fps -> 16ms (1000ms / 60fps)
      style={{
        position: 'absolute',
        bottom: 0,
        height: 300,
      }}
      snapToInterval={ListItemWidth}
      pagingEnabled
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 3 * ListItemWidth,
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        return <CircularItem data={item} index={index} scrollX={scrollX} />;
      }}
    />
  );
};

export default CircularCarousel;
