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
    fontFamily: fontFamily.Inter_Medium,
    fontSize: hp(1.5),
    color: '#0F0E0E',
  },
  pricetext: {
    fontFamily: fontFamily.Inter_Regular,
    fontSize: hp(1.5),
    color: '#0F0E0E',
  },
  price: {
    fontFamily: fontFamily.Inter_Bold,
    fontSize: hp(1.6),
    color:Colors.Appthemecolor,
  },
  datetext: {
    fontFamily: fontFamily.Inter_Regular,
    fontSize: hp(1.4),
    color: '#989898',
    marginTop:hp(0.5)
  },

});
export default styles;
