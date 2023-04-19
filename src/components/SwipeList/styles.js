import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

/////////////////app colors/////////////
import Colors from '../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

///////////////////app fonts///////////////////
import {fontFamily} from '../../constant/fonts';

const styles = StyleSheet.create({
  card: {
    margin: wp('2%'),
    borderRadius: wp(4),
    justifyContent: 'center',
    width: wp(93),
    backgroundColor: 'white',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderColor: 'grey',
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
  imageview: {
    borderColor: 'grey',
    borderWidth: wp(0.3),
    height: hp(10),
    width: wp(22),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:wp(5),
    borderRadius:wp(3)
  },
  nametext: {
    color: '#262626',
    fontSize: hp(2),
    fontFamily: fontFamily.Poppins_Medium,
  },
  timetext: {
    color: '#989898',
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
  },
});
export default styles;
