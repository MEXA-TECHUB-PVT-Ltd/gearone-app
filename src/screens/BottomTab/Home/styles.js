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
  textAlign:'center'
},
bottomlineview:
{
  borderBottomColor:'#E6E6E6',
  borderBottomWidth:hp(0.11),
  borderBottomStyle:'solid',
  width:wp(100),
  marginTop:hp(1),
  marginBottom:hp(2)
},

image: {
  width: wp(16),
  height: hp(8),
  borderRadius:wp(10),
  resizeMode: 'cover',
},
imageLarge: {
  width: wp(95),
  height: hp(75),
  resizeMode:'contain',
  alignSelf:'center',
  borderRadius:wp(2),
},
Visit_btn:
{alignSelf:'center',
color:'white',
fontFamily:fontFamily.Poppins_Bold,
fontSize:hp(2),
marginTop:hp(2)
},
imageroundview:
{
  borderColor:Colors.Appthemecolor,
  borderRadius:wp(10),
  borderWidth:hp(0.3),
  width: wp(19),
  height: hp(9.1),
  margin:wp(1),
  alignItems:'center',
  justifyContent:'center'
},


doubleRow: {
  flexDirection: 'row',
},
doubleRowImage: {
  flex: 1,
  aspectRatio: 1,
},
singleRow: {
  flex: 1,
  flexDirection: 'row',
},
singleRowImage: {
  flex: 1,
  aspectRatio: 1,
  marginHorizontal: 4,
},
});
export default styles;
