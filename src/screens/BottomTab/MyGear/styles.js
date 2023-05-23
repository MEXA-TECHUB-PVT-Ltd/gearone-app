import React from 'react';
import {StyleSheet} from 'react-native';

////////////colors/////////
import Colors from '../../../utills/Colors';

////////height and width////////////
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
  itemmaintext: {
    color: Colors.Appthemecolor,
    fontSize: hp(2),
    fontFamily: fontFamily.Poppins_Medium,
    //width: wp(0),
    textAlign: "center",
   // marginTop:hp(2)
  },
  itemsubtext: {
    color: "#303030",
    fontSize: hp(1.7),
    fontFamily: fontFamily.Poppins_Regular,
    marginBottom: hp(0.8),
    textAlign: "center",
  },

  verticleLine: {
    height: hp(4),
    width: 1,
    backgroundColor: Colors.activetextinput,
    marginHorizontal: wp(4),
  },
  verticletoptext: {
    color: 'white',
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_SemiBold,
  },
  verticletext: {
    color:'#E6E6E6',
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
  },
  coverimage_view:{
    width: wp(95),
    backgroundColor: '#444444',
    height: hp(25),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  coverimage_text:
  {
    color: 'white',fontSize:hp(1.8),
    fontFamily:fontFamily.Poppins_Bold
  },
});
export default styles;
