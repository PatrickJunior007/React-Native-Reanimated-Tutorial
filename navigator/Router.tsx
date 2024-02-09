import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RSLessonOne from '../screens/ReanimatedScreen/RSLessonOne';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FirstLesson from '../screens/ReanimatedScreen/FirstLesson';
import SecondLesson from '../screens/ReanimatedScreen/SecondLesson';
import ThridLesson from '../screens/ReanimatedScreen/ThirdLesson';
import TenthLesson from '../screens/ReanimatedScreen/TenthLesson';
import LessonFour from '../screens/ReanimatedScreen/LessonFour';
import LessonFive from '../screens/ReanimatedScreen/LessonFive';
import LessonSix from '../screens/ReanimatedScreen/LessonSix';
import LessonSeven from '../screens/ReanimatedScreen/LessonSeven';
import LessonNine from '../screens/ReanimatedScreen/LessonNine';
import LessonEleven from '../screens/ReanimatedScreen/LessonEleven';
import LessonTwelve from '../screens/ReanimatedScreen/LessonTwelve';
import LessonThirteeen from '../screens/ReanimatedScreen/LessonThirteeen';
import LessonFourteen from '../screens/ReanimatedScreen/LessonFourteen';
import LessonFifteen from '../screens/ReanimatedScreen/LessonFifteen';
import LessonSixteen from '../screens/ReanimatedScreen/LessonSixteen';
import LessonSeventeen from '../screens/ReanimatedScreen/LessonSeventeen';
import LessonEighteen from '../screens/ReanimatedScreen/LessonEighteen';

//Creating stack navigation
const Drawer = createDrawerNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="screen1"
          options={{
            title: 'Photo Scroll Y',
          }}
          component={RSLessonOne}
        />
        <Drawer.Screen
          name="firstLesson"
          options={{
            title: 'First Lesson',
          }}
          component={FirstLesson}
        />
        <Drawer.Screen
          name="secondLesson"
          options={{
            title: 'Pan Gesture',
          }}
          component={SecondLesson}
        />
        <Drawer.Screen
          name="thirdLesson"
          options={{
            title: 'Pan Gesture +',
          }}
          component={ThridLesson}
        />
        <Drawer.Screen
          name="fourthScreen"
          options={{
            title: 'Interpolate with ScrollView',
          }}
          component={LessonFour}
        />
        <Drawer.Screen
          name="fifthScreen"
          options={{
            title: 'Interpolate Colors',
          }}
          component={LessonFive}
        />
        <Drawer.Screen
          name="sixthScreen"
          options={{
            title: 'Basics of PinchGestureHandler',
          }}
          component={LessonSix}
        />
        <Drawer.Screen
          name="sevenScreen"
          options={{
            title: 'Animate on Double Tap',
          }}
          component={LessonSeven}
        />
        <Drawer.Screen
          name="ninthScreen"
          options={{
            title: 'Circular Progress Bar',
          }}
          component={LessonNine}
        />
        <Drawer.Screen
          name="tenthScreen"
          options={{
            title: 'PanGesture Swipe on Scroll',
          }}
          component={TenthLesson}
        />
        <Drawer.Screen
          name="eleventhScreen"
          options={{
            title: 'Ripple Effect Animation(not done)',
          }}
          component={LessonEleven}
        />
        <Drawer.Screen
          name="twelvethScreen"
          options={{
            title: 'Perspective Menu Animation',
            headerShown: false,
          }}
          component={LessonTwelve}
        />
        <Drawer.Screen
          name="thirteenthScreen"
          options={{
            title: 'Sliding Counter Animation',
            headerShown: false,
          }}
          component={LessonThirteeen}
        />
        <Drawer.Screen
          name="fourteenthScreen"
          options={{
            title: 'Clock Loader Animation',
            headerShown: false,
          }}
          component={LessonFourteen}
        />
        <Drawer.Screen
          name="fifteenthScreen"
          options={{
            title: 'Magic of Layout Animation',
            headerShown: false,
          }}
          component={LessonFifteen}
        />
        <Drawer.Screen
          name="sixteenthScreen"
          options={{
            title: 'Animated Flatlist',
            headerShown: false,
          }}
          component={LessonSixteen}
        />
        <Drawer.Screen
          name="seventeenthScreen"
          options={{
            title: 'Dropdown Menu Animation',
            headerShown: false,
          }}
          component={LessonSeventeen}
        />
        <Drawer.Screen
          name="eighteenthScreen"
          options={{
            title: 'Circular Carousel Animation',
            headerShown: false,
          }}
          component={LessonEighteen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Router;
