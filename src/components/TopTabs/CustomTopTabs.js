import * as React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';

///////////app styles/////////////
import Colors from '../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app fonts////////////
import {fontFamily} from '../../constant/fonts';

const CustomTopTabs = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        //justifyContent: 'center',
        width: wp(props.width),
      }}
      onPress={props.onpress}>
      <Text
        style={{
          color: props.state === true ? Colors.Appthemecolor : '#AAAAAA',
          fontSize: hp(1.6),
          fontFamily: fontFamily.Inter_Medium,
        }}>
        {props.title}
      </Text>
     { props.state === true ?
      <View
        style={{
          height: hp(0.5),
          width: wp(props.width),
          backgroundColor:
            props.state === true ? Colors.Appthemecolor : '#AAAAAA',
          borderRadius: wp(2),
        }}></View>
        :null
    }
    </TouchableOpacity>
  );
};

export default CustomTopTabs;
