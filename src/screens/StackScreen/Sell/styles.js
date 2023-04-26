import React from 'react';
import {StyleSheet} from 'react-native';

///////////////app colors///////////
import Colors from '../../../utills/Colors';

////////////height/ width//////////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {fontFamily} from '../../../constant/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.AppBckGround_color,
  },

  textinput_title: {
    color: Colors.App_white_color,
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
  },

});
export default styles;
