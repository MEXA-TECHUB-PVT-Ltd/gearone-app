import React from 'react';
import {StyleSheet} from 'react-native';

///////////////app colors///////////
import Colors from '../../../utills/Colors';

////////////height/ width//////////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {fontFamily} from '../../../constant/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.AppBckGround_color,
  },

  ///////////////Main Listings Details/////////
  iconview: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    marginVertical: hp(0.7),
  },
  ItemName_text: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(2),
    color:'white',
    width: wp(55),
  },
  ItemPrice_text: {
    fontFamily:  fontFamily.Poppins_Medium,
    fontSize: hp(1.6),
    color: 'white',
textAlign:'right'
  },
  icontext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.8),
    color: Colors.activetextinput,
    width: wp(25),
  },
  rowtextview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(0.8),
  },
  rowlefttext: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(1.8),
    color: Colors.Appthemecolor,
    width: wp(35),
    //backgroundColor:'red'
  },
  rowrighttext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: Colors.appgreycolor,
    textAlign: 'right',
    width: wp(50),
    //backgroundColor:'yellow'
  },
  heading_text: {
    color: 'white',
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(2),
  },
  detail_text: {
    color: 'rgba(255, 255, 255, 0.80)',
    fontFamily: fontFamily.Poppins_Light,
    fontSize: hp(1.6),
  },
  userdeatilview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginBottom: hp(5),
  },
  userimage: {width: wp(18), height: hp(10), borderRdius: wp(15)},
  user_name: {
    color: 'white',
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(2),
  },
  user_followers: {
    color: 'white',
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.8),
  },
  btn_view: {
    height: hp(4.8),
    width: wp(28),
    borderRadius: wp(1),
    backgroundColor: 'rgba(68, 68, 68, 1)',
    borderWidth: hp(0.2),
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: 'white',
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.4),
  },


  /////////////////////Other Profile/////////////////

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
  itemmaintext: {
    color: Colors.Appthemecolor,
    fontSize: hp(2),
    fontFamily: fontFamily.Poppins_Medium,
    //width: wp(0),
    textAlign: 'center',
    // marginTop:hp(2)
  },
  itemsubtext: {
    color: '#303030',
    fontSize: hp(1.7),
    fontFamily: fontFamily.Poppins_Regular,
    marginBottom: hp(0.8),
    textAlign: 'center',
  },

  verticleLine: {
    height: hp(5),
    width: 1,
    backgroundColor: '#E6E6E6',
    marginHorizontal: wp(8),
  },
  verticleToptext: {
    color: 'white',
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_SemiBold,
  },
 noposttext: {
    color: 'white',
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
    marginLeft:wp(5),
    marginTop:hp(3)
  },
  verticletext: {
    color: Colors.activetextinput,
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Medium,
  },
});
export default styles;
