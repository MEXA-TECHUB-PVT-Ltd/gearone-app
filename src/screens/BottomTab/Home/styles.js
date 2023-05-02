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
  width:wp(20),
  fontWeight:'600'
},
bottomlineview:
{
  borderBottomColor:'#E6E6E6',
  borderBottomWidth:hp(0.11),
  borderBottomStyle:'solid',
  width:wp(100),
  marginTop:hp(1),
  marginBottom:hp(2)
}
});
export default styles;
