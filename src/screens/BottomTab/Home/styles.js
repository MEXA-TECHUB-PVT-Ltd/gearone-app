import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../../utills/Colors';

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
    backgroundColor:Colors.AppBckGround_color
  },

  /////////////////create profile//////////////
  userimage: {
    borderColor: '#D6D6D6',
    borderWidth: 1.5,
    width: wp(25),
    height: hp(12),
    borderRadius: wp(25),
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: hp(2),
    marginTop: hp(3),
  },
  image: {
    height: hp(15),
    width: wp(29),
    borderRadius: wp(50),
  },

  ////////////////////Verification///////////////////
  Cellview: {
    marginBottom: 10,
    marginTop: hp(0),
    paddingHorizontal: wp(12),
  },
  root: {
    //flex: 1,
    padding: 0,
  },
  title: {
    textAlign: 'center',
    fontSize: hp(1.8),
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.Appthemecolor,
  },
  codeFieldRoot: {
    marginTop: 10,
  },
  cell: {
    marginTop: hp(3),
    width: wp(10.5),
    height: hp(5.8),
    lineHeight: hp(5.8),
    fontSize: hp(2),
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#444444',
    justifyContent: 'center',
    borderRadius: wp(1),
  },
  focusCell: {
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: '#BFBFBF',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#444444',
    justifyContent: 'center',
    borderRadius: wp(1),
    color: Colors.Appthemecolor,
  },
  Cellmaintext: {
    color: Colors.Appthemecolor,
    textAlign: 'center',
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(1.6),
  },

});
export default styles;
