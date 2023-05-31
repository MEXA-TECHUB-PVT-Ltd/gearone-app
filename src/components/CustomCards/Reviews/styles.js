import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

/////////////////app colors/////////////
import Colors from '../../../utills/Colors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

///////////////////app fonts///////////////////
import {fontFamily} from '../../../constant/fonts';

const styles = StyleSheet.create({
  card: {
    margin: wp('2%'),
    borderRadius: wp(4),
    justifyContent: 'center',
    width: wp(93),
    backgroundColor: 'white',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderColor: '#DFDFDF',
    borderWidth: wp(0.2),
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 6,
  },
  usertext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: 'black',
  },
  subtext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.1),
    color: 'black',
    width:wp(89),
    textAlign:'justify'
  },
	star: {
		color: '#EBD300'
	},
});
export default styles;
