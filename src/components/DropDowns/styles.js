import React from 'react';
import {StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
import { fontFamily } from '../../constant/fonts';
const styles = StyleSheet.create({

card:
{
  borderColor:'rgba(255, 255, 255, 0.70)',
  borderBottomWidth: 1,
 width: wp(82),
 marginHorizontal:wp(8)
  
},
cardtext:
{
  color:'white', 
  marginBottom:hp(2),
  marginTop:hp(2),
   fontFamily:'Poppins',
   fontSize:hp(2),
   marginLeft:wp(5),
},
bottomsheettext:
{
paddingHorizontal:wp(8),
fontFamily:fontFamily.Poppins_SemiBold,
fontSize:hp(2.5),
color:'white'
},
  });
  export default styles;
  