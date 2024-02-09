/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CircularCarousel from '../../Components/CircularCarousel';

const data = [
  require('../../assets/images/1.jpg'),
  require('../../assets/images/2.jpg'),
  require('../../assets/images/3.jpg'),
  require('../../assets/images/4.jpg'),
  require('../../assets/images/5.jpg'),
  require('../../assets/images/6.jpg'),
  require('../../assets/images/7.png'),
  require('../../assets/images/jjk.jpg'),
  require('../../assets/images/ps.png'),
];

const LessonEighteen = () => {
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <CircularCarousel data={data} />
    </View>
  );
};

export default LessonEighteen;
