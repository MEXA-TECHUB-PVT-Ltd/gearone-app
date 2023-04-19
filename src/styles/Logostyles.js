import React from 'react';
import {StyleSheet} from 'react-native';

/////////////colors/////////////
import Colors from '../utills/Colors';

///////////height and width////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Logostyles = StyleSheet.create({
  Logoview: {
    alignItems: 'center',
    marginTop: hp(8),
    marginBottom: hp(7),
  },
  logo: {
    height: wp(20),
    width: wp(50),
  },
});
export default Logostyles;
