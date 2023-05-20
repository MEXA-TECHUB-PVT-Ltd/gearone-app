import React, {useState, useRef,useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

///////navigation variable///////////
import { useNavigation } from '@react-navigation/native';

///////////componetes///////////
import CustomButtonhere from '../Button/CustomButton';
import CustomModal from '../Modal/CustomModal';

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

/////app colors////////////
import Colors from '../../utills/Colors';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditImages = ({}) => {

    /////////////reducer value////////////
    const dispatch = useDispatch();
    const imagePath = useSelector(state => state.image.path);

///////navigation//////  
 const navigation = useNavigation();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////Get Notification/////////////
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const GetProfileData = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'GET',
      url: BASE_URL + 'auth/specific_user/'+user_id,
    })
      .then(async function (response) {
        console.log('list data here ', response.data.result);
        setCoverImage(response.data.result[0].cover_image);
        setProfileImage(response.data.result[0].image);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    GetProfileData();
  }, []);
  //camera and imagepicker
  const refRBSheet = useRef();

  /////////////////image api calling///////////////
  const Edit_CoverImage = async props => {
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
        result => console.log(result),
        dispatch(updateImagePath('')),
        dispatch(setCoverImageMenu(false)),
        dispatch(setProfileImageMenu(true)),
      );
  };
  /////////////////image api calling///////////////
  const Edit_ProfileImage = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    const formData = new FormData();
    formData.append('id', user_id);
    formData.append('image', {
      uri: props,
      type: 'image/jpg',
      name: 'image.jpg',
    });
    return fetch(BASE_URL + 'auth/add_image', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.text())
      .then(
        result => console.log(result),
        dispatch(updateImagePath('')),
        dispatch(setProfileImageMenu(false)),
        navigation.navigate('Drawerroute')
      );
  };
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
          source={{uri:BASE_URL+profileImage}}
          style={{width: wp(30), height: hp(15), borderRadius: wp(15)}}
          resizeMode={'contain'}
        />
      </View>
      <TouchableOpacity
            onPress={() => 
  {            refRBSheet.current.open(),
              Edit_ProfileImage(imagePath)}
            }
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
          source={{uri:BASE_URL+coverImage}}
          style={{width: wp(85), height: hp(25), borderRadius: wp(1)}}
          resizeMode={'cover'}
        />
      </View>
      <TouchableOpacity
            onPress={() => 
      {        refRBSheet.current.open()
            Edit_CoverImage(imagePath)}
            }
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
              setModalVisible(true)
          }}
        />
      </View>
      <CustomModal
        modalVisible={modalVisible}
        text={'Success'}
        btn_text={'Go Back'}
        subtext={'Profile Edited Successfully'}
        type={'single_btn'}
        onPress={() => {
          setModalVisible(false);
          dispatch(setCoverImageMenu(false)),
          dispatch(setProfileImageMenu(true)),
          navigation.navigate('BottomTab');
        }}
      />
    </View>
  );
};

export default EditImages;
