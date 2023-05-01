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
stories_user:
{
  color:'white',
  fontFamily:fontFamily.Poppins_Regular,
  fontSize:hp(1.6),
  width:wp(20)
}
});
export default styles;
