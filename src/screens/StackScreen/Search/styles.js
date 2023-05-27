import React from 'react';
import {StyleSheet} from 'react-native';

////////////colors/////////
import Colors from '../../../utills/Colors';

////////height and width////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app fonts///////////
import {fontFamily} from '../../../constant/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: Colors.AppBckGround_color,
  },

  ///////////////My Account//////////////
  account_text: {
    fontFamily: fontFamily.Poppins_Regular,
    color: 'white',
    fontSize: hp(2),
  },
  account_subtext: {
    fontFamily: fontFamily.Poppins_Light,
    color: 'white',
    fontSize: hp(1.6),
  },

  ///////////////About Us//////////////
  main_text: {
    fontFamily: fontFamily.Poppins_Regular,
    color: 'white',
    fontSize: hp(1.8),
  },
  sub_text: {
    fontFamily: fontFamily.Poppins_Light,
    color: 'white',
    fontSize: hp(1.4),
  },
});
export default styles;
