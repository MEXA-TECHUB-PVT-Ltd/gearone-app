import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../utills/Colors';

/////////height and width////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

///////////app fonts////////////
import {fontFamily} from '../constant/fonts';

const Authstyles = StyleSheet.create({
  textview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
    marginHorizontal: wp(8),
  },
  maintext: {
    color: Colors.App_auth_maintext,
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(2.6),
    marginBottom: hp(1),
    textAlign: 'center',
  },
  subtext: {
    color: Colors.App_auth_subtext,
    fontFamily: fontFamily.Poppins_Light,
    fontSize: hp(1.4),
    marginBottom: hp(2),
    textAlign: 'center',
    width: wp(60),
  },
  textinput_title: {
    color: Colors.App_white_color,
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
  },
  horizontal_mainview:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(8),
    marginBottom: hp(4),
    marginTop: hp(4),
  },
    horizontal_line:
    {
      flex: 0.8,
      borderWidth: 0.25,
      borderColor: '#FFFFFF',
    },
    horizontal_text:
      {
        width: wp(8),
        textAlign: "center",
        color: Colors.App_auth_subtext,
        fontFamily: fontFamily.Poppins_Regular,
        fontSize:hp(1.6)
      },
      last_text:
      {
        fontFamily:fontFamily.Poppins_Regular,
        color:'#FFFFFF',
        fontSize:hp(1.4)
      }
});
export default Authstyles;
