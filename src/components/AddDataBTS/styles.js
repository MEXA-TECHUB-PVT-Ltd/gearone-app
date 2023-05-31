import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

///////////////////app fonts//////////////////
import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({

  headerview:{
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
marginBottom:hp(3)
  },
  headertext:
  {
    fontSize:hp(1.8),
    color:'#262626',
    fontFamily: fontFamily.Poppins_SemiBold,
  },
  });
  export default styles;
  