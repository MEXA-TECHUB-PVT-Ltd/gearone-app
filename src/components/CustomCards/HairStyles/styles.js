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
    marginBottom: hp(3),
    borderRadius: wp(4),
    justifyContent: 'center',
    width: wp(90),
    backgroundColor: 'white',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.9),
    borderColor: '#DFDFDF',
    borderWidth: wp(0.2),
    alignSelf:'center',
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 6,
  },
  imageview: {
    borderColor: '#DFDFDF',
    borderWidth: wp(0.3),
    height: hp(9),
    width: wp(23),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:wp(5),
    borderRadius:wp(3)
  },
  nametext: {
    color: '#262626',
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
  },
  timetext: {
    color: '#989898',
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
  },
});
export default styles;
