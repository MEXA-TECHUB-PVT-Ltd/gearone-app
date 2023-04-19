import * as React from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";

///////////////colors/////////////////
import Colors from "../../utills/Colors";

////////////styles//////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

///////////////app fonts///////////////
import { fontFamily } from "../../constant/fonts";

const PromotionTopTabs = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: wp(props.width),
        height:hp(4.5),
        borderRadius:wp(2),
        backgroundColor:props.state === true ?Colors.Appthemecolor:null
      }}
    >
      <Text
        style={{
          color: props.state === true ? "white" :'#989898',
          fontSize: props.state === true ?hp(2):hp(1.6),
          fontFamily: props.state === true ?fontFamily.Poppins_Medium:fontFamily.Poppins_Regular,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default PromotionTopTabs;
