import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#FF6C44', //orange
  transparentPrimray: 'rgba(227, 120, 75, 0.4)',
  orange: '#FFA133',
  lightOrange: '#FFA133',
  lightOrange2: '#FDDED4',
  lightOrange3: '#FFD9AD',
  green: '#27AE60',
  red: '#FF1717',
  blue: '#0064C0',
  darkBlue: '#111A2C',
  darkGray: '#525C67',
  darkGray2: '#757D85',
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',
  lightGray1: '#DDDDDD',
  lightGray2: '#F5F5F8',
  lightGray3: '#F7F7F7',
  lightGray4: '#ededed',
  white2: '#FBFBFB',
  white: '#ededed',
  pureWhite: '#ffffff',
  black: '#000000',
  mainBlue: '#0064c0',
  mainYellow: '#f9d303',
  mainPrimary: '#159055',
  mainSecondary: '#0a4c2c',
  mainTertiary: '#2dca73',
  mainTertiary2: '#26dd77',
  darkColor: '#3f3f3f',
  transparentMainBlue: 'rgba(0, 100, 192, 0.4)',
  transparentMainPrimary: 'rgba(21, 144, 85, 0.4)',
  timerBlue: 'rgba(0, 100, 192, 0.6)',
  textColor: '#565656',
  textGrayColor: '#777777',

  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',

  darkTheme1: '#121212',
  lessDark: '#292929',
  darkTheme: '#1F1F1F',
  darklessTheme: '#323232',
  darkBorder: 'rgba(130,130,130,0.2)',
  darkBorder2: 'rgba(68,68,68,0.12)',
  lightDark: '#bcbcbc',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h31: 16,
  h3: 17.5,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 10,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 22},
  h31: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h31, lineHeight: 22},
  h4: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5, lineHeight: 22},
  body1: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body4, lineHeight: 22},
  bodynoLineHeight: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body4},
  body5: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5, lineHeight: 22},
  body6: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body6, lineHeight: 22},

  hNoH: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h31},
  bodyNoH5: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5},
  bodytest5: {fontFamily: 'Poppins-Medium', fontSize: SIZES.body5},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
