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
    marginVertical: hp(1),
    alignItems: "center",
    marginHorizontal: wp(3),
    backgroundColor: "#444444",
    width: wp(90),
    height: hp(15),
    borderRadius: wp(2),
    flexDirection:'row',
    paddingHorizontal:wp(5),
    alignSelf:'center'
  },
  imageView:{
      height: hp(12),
      width: wp(22),
      alignItems:'center',
      justifyContent:'center',
      borderRadius:wp(2),
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
    height: hp(12),
    width: wp(22),
    borderRadius:wp(2),
  },
  textView:
  {
    justifyContent: 'center',
    paddingLeft:wp(3),
    width:wp(40),
  },
  maintext: {
    color: 'white',
    width: wp(30),
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
    marginBottom:hp(0.5)
  },
  pricetext: {
    color: "white",
    fontSize: hp(1.2),
    fontFamily: fontFamily.Poppins_Regular,
  },
  subtext: {
    color: '#DCDCDC',
    width: wp(60),
    fontSize: hp(1.2),
    fontFamily: fontFamily.Poppins_Regular,

  },
});

export default styles;
