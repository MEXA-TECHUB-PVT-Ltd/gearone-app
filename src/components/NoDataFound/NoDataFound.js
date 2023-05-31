import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

///////////////app icons///////////////
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/////////////height and width////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app fonts////////
import {fontFamily} from '../../constant/fonts';

const NoDataFound = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(20),
        backgroundColor:'red'
      }}>
      <MaterialCommunityIcons
        name={props.icon}
        size={hp(5)}
        color={'white'}
        onPress={props.iconPress}
      />
      <Text style={style.labeltext}>{props.text}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  labeltext: {
    color: 'white',
    fontSize: hp(2.3),
    fontFamily: fontFamily.Poppins_Medium,
    marginTop: hp(2),
    textAlign: 'center',
  },
});
export default NoDataFound;
