import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../utills/Colors';
const Width = Dimensions.get('screen').width;
const Height = Dimensions.get('screen').height;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {fontFamily} from '../../constant/fonts';

const styles = StyleSheet.create({
  //Header
  headerView: {
    flexDirection: 'row',
    //justifyContent:'space-between',
    alignItems: 'center',
    height: Height * 0.1,
    width: wp(100),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
  },
  iconview: {
    justifyContent: 'center',
    marginRight: wp(0),
  },

  label: {
    color: '#0F0E0E',
    fontSize: hp(2.3),
    textAlign:'center',
    fontFamily: fontFamily.Inter_Medium,
  },
});

export default styles;
