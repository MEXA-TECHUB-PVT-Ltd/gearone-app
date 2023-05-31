import React, {useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

///////////componetes///////////
import CustomButtonhere from '../Button/CustomButton';
import CamerBottomSheet from '../CameraBottomSheet/CameraBottomSheet';

/////////////icons//////////////////
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////fonts///////////
import {fontFamily} from '../../constant/fonts';

//////app colors/////////
import Colors from '../../utills/Colors';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setCoverImageMenu,
  setProfileImageMenu,
} from '../../redux/CreateProfileSlice';
import {updateImagePath} from '../../redux/ImagePathSlice';

/////////asyc////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////api//////////
import {BASE_URL} from '../../utills/ApiRootUrl';

const CoverImage = ({navigation}) => {
  /////////////reducer value////////////
  const dispatch = useDispatch();
  const imagePath = useSelector(state => state.image.path);

  //camera and imagepicker
  const refRBSheet = useRef();

  /////////////////image api calling///////////////
  const Upload_CoverImage = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    const formData = new FormData();
    formData.append('id', user_id);
    formData.append('image', {
      uri: props,
      type: 'image/jpg',
      name: 'image.jpg',
    });
    return fetch(BASE_URL + 'auth/add_cover_image', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.text())
      .then(
        result => dispatch(updateImagePath('')),
        dispatch(setCoverImageMenu(false)),
        dispatch(setProfileImageMenu(true)),
      );
  };

  return (
    <View style={{marginTop: hp(20)}}>
      <View
        // onPress={() => refRBSheet.current.open()}
        style={{
          width: wp(85),
          height: hp(20),
          borderWidth: wp(1),
          borderStyle: 'dotted',
          borderRadius: 10,
          borderColor: 'white',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {imagePath === '' ? (
          <FontAwesome5
            name={'upload'}
            color={'#444444'}
            size={hp(5)}
            onPress={() => refRBSheet.current.open()}
          />
        ) : (
          <Image
            source={{uri: imagePath}}
            style={{height: hp(18), width: wp(80)}}
            resizeMode="cover"
          />
        )}
      </View>
      {imagePath != '' ? (
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(3),
            backgroundColor: Colors.Appthemecolor,
            width: wp(35),
            alignSelf: 'center',
            borderRadius: wp(1),
            alignItems: 'center',
            justifyContent: 'center',
            height: hp(4),
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: fontFamily.Poppins_SemiBold,
              fontSize: hp(1.6),
            }}>
            Edit Cover Image
          </Text>
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp(3),
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: fontFamily.Poppins_Light,
            fontSize: hp(1.6),
          }}>
          Cover Image
        </Text>
      </View>
      <View style={{height: hp(20), marginTop: hp(0), marginBottom: hp(20)}}>
        <CustomButtonhere
          title={'Countinue'}
          widthset={80}
          topDistance={27}
          // loading={loading}
          // disabled={disable}
          onPress={() => {
            Upload_CoverImage(imagePath);
          }}
        />
      </View>
      <CamerBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={'From Gallery'}
        type={'onepic'}
      />
    </View>
  );
};

export default CoverImage;
