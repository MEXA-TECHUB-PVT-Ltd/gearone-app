import React from "react";
import { StyleSheet, Dimensions } from "react-native";

//////////////////COLORS/////////////
import Colors from "../../../utills/Colors";

///////////HEIGHT AND WIDTH///////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////app fonts///////////////
import { fontFamily } from "../../../constant/fonts";

const styles = StyleSheet.create({

  ////////////////////Dashboard///////////
  card: {
    marginVertical: hp(2),
    alignItems: "center",
    marginHorizontal: wp(3),
    backgroundColor: "white",
    width: wp(40),
    height: hp(18),
    borderRadius: wp(2),
  },
  imageView:{
      height: hp(14),
      width: wp(40),
      alignItems:'center',
      justifyContent:'center',
      borderTopRightRadius:wp(2),
      borderTopLeftRadius:wp(2),
      backgroundColor:'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
  },
  image: {
    height: hp(14),
    width: wp(40),
    borderTopRightRadius:wp(3),
    borderTopLeftRadius:wp(3)
  },
  textView:
  {
    backgroundColor:'#E2E2E2',
    justifyContent: 'center',
    paddingLeft:wp(2),
    width:wp(40),
    height:hp(5),
    borderBottomLeftRadius:wp(2),
    borderBottomRightRadius:wp(2)
  },
  maintext: {
    color: Colors.Appthemecolor,
    width: wp(30),
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
    marginBottom:hp(0.5)
  },
  pricetext: {
    color: "black",
    fontSize: hp(1.2),
    fontFamily: fontFamily.Poppins_Regular,
  },

});

export default styles;
