import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////////app fonts////////////////////
import {fontFamily} from '../../constant/fonts';

const styles = StyleSheet.create({
  mainview:
  
  {
    flexDirection: 'row',
    marginTop: wp(5),
    width:wp(100),
    marginBottom: wp(2),
    justifyContent:'space-between',
    // alignSelf: 'center',
    paddingHorizontal: wp(3),
  },
  logo: {
    height: wp(13),
    width: wp(13),
  },

  notitext: {
    color: '#262626',
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: hp(1.8),
  },
  notidetail: {
    color: 'black',
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: hp(1.2),
    width:wp(70)
  },
  notitimetext: {
    color: '#0F0E0E',
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: hp(1.3),
    textAlign:'right',
    marginTop:hp(1.5)
  },
  lineview: {
    width: wp(90),
    flexDirection: 'row',
    marginTop: hp(1),
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 0.8,
    alignSelf: 'center',
  },
});
export default styles;
