import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utills/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////app fonts/////////////
import { fontFamily } from "../../constant/fonts";

const styles = StyleSheet.create({
  centeredView: {
    zIndex: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    width: wp(85),
    paddingTop: wp(2),
    backgroundColor: Colors.AppBckGround_color,
    borderRadius: wp(5),
    alignItems: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modaltext: {
    fontSize: hp(2),
    fontFamily: fontFamily.Poppins_Medium,
    color: 'white',
    textAlign: "center",
  },
  modalsubtext: {
    fontSize: hp(1.4),
    color:Colors.App_auth_subtext,
    fontFamily: fontFamily.Poppins_Regular,
    textAlign: "center",
    width: wp(60),
  },
  ApprovedView: {
    height: hp(6),
    width: wp(60),
    borderRadius: wp(1),
    backgroundColor: Colors.Appthemecolor,
    //  /marginRight:10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(5),
  },
  Pendingtext: {
    textAlign: "center",
    margin: 10,
    color: "white",
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
  },
  logoutbtnView: {
    width: wp(65),
    borderRadius: wp(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    //backgroundColor:'red',
  },
  cancelbtn: {
    height: hp(5.5),
    width: wp(28),
    borderRadius: wp(2),
    borderColor: 'white',
    borderWidth: wp(0.3),
    //backgroundColor: "white",
    alignItems: "center",
    marginBottom: hp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  donebtn: {
    height: hp(5.5),
    width: wp(28),
    borderRadius: wp(2),
    backgroundColor: Colors.Appthemecolor,
    alignItems: "center",
    marginBottom: hp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
export default styles;
