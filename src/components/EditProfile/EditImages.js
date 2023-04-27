import React, {useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

///////////componetes///////////
import CustomButtonhere from '../Button/CustomButton';

/////////////icons//////////////////
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////fonts///////////
import {fontFamily} from '../../constant/fonts';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setCoverImageMenu,
  setProfileImageMenu,
} from '../../redux/CreateProfileSlice';
import Colors from '../../utills/Colors';

const EditImages = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();

  ///////////emai
  return (
    <View style={{marginTop: hp(2)}}>
      <View style={{marginLeft: wp(3), marginTop: hp(3)}}>
        <Text
          style={{
            color: 'white',
            fontFamily: fontFamily.Poppins_Light,
            fontSize: hp(1.8),
          }}>
          Profile Image
        </Text>
      </View>
      <View
        style={{
          width: wp(30),
          height: hp(17),
          borderRadius: wp(15),
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Image
          source={require('../../assets/dummyimages/profile_user.png')}
          style={{width: wp(50), height: hp(20), borderRadius: wp(15)}}
          resizeMode={'contain'}
        />
      </View>
      <TouchableOpacity
        style={{
          height: hp(5),
          width: wp(35),
          backgroundColor: Colors.Appthemecolor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: wp(2),
          alignSelf: 'center',
          marginTop: hp(2),
          marginBottom:hp(3)
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: fontFamily.Poppins_Light,
            fontSize: hp(1.8),
          }}>
          Change
        </Text>
      </TouchableOpacity>
      <View style={{marginLeft: wp(3), marginTop: hp(3)}}>
        <Text
          style={{
            color: 'white',
            fontFamily: fontFamily.Poppins_Light,
            fontSize: hp(1.8),
          }}>
          Cover Image
        </Text>
      </View>
      <View
        style={{
          width: wp(85),
          height: hp(25),
          borderRadius: wp(1),
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop:hp(2)
        }}>
        <Image
          source={require('../../assets/dummyimages/coverImage.png')}
          style={{width: wp(85), height: hp(25), borderRadius: wp(1)}}
          resizeMode={'contain'}
        />
      </View>
      <TouchableOpacity
        style={{
          height: hp(5),
          width: wp(35),
          backgroundColor: Colors.Appthemecolor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: wp(2),
          alignSelf: 'center',
          marginTop: hp(2),
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: fontFamily.Poppins_Light,
            fontSize: hp(1.8),
          }}>
          Change
        </Text>
      </TouchableOpacity>
      <View style={{height: hp(20), marginTop: hp(0), marginBottom: hp(20)}}>
        <CustomButtonhere
          title={'Countinue'}
          widthset={80}
          topDistance={15}
          // loading={loading}
          // disabled={disable}
          onPress={() => {
            dispatch(
              setCoverImageMenu(false),
              dispatch(setProfileImageMenu(true)),
            );
          }}
        />
      </View>
    </View>
  );
};

export default EditImages;
