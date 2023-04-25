import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  //////////////////app fonts////////////////////
import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({

  mainview: {
    marginTop:wp(0),
    marginBottom: wp(3),
    //justifyContent:'center',
    backgroundColor:Colors.AppBckGround_color,
    width: wp(95),
    height: hp(6),
    alignSelf: 'center',
    //paddingLeft: wp(2),
    alignItems: 'center'
  },

  labeltext:
  {
    color: '#FFFFFF',
fontFamily:fontFamily.Poppins_Medium,
    fontSize: hp(1.8),
  },


});
export default styles;
