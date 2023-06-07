import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

///////navigation variable///////////
import {useNavigation} from '@react-navigation/native';

///////////react native paper///////////
import {Avatar} from 'react-native-paper';

///////////componetes///////////
import CustomButtonhere from '../Button/CustomButton';
import CustomModal from '../Modal/CustomModal';
import CamerBottomSheet from '../CameraBottomSheet/CameraBottomSheet';

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
  editLinksMenu,
  editImagesMenu,
  editPersonalMenu,
} from '../../redux/EditprofileSlice';


import {updateImagePath} from '../../redux/ImagePathSlice';
import {updateCoverImagePath} from '../../redux/CoverImage';
import {updateProfileImagePath} from '../../redux/ProfileImage';

/////app colors////////////
import Colors from '../../utills/Colors';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditImages = ({}) => {
  /////////////reducer value////////////
  const dispatch = useDispatch();
  const Profilepath = useSelector(state => state.profileimage.Profilepath);
  const Coverpath = useSelector(state => state.coverimage.Coverpath);
  console.log('here', Profilepath);

  ///////navigation//////
  const navigation = useNavigation();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////Get Notification/////////////
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');

  ///////////get images//////////
  const GetProfileData = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'GET',
      url: BASE_URL + 'auth/specific_user/' + user_id,
    })
      .then(async function (response) {
        console.log('list data here ', response.data);
        setCount(1)
        setCoverImage(response.data.result[0].cover_image);
        setProfileImage(response.data.result[0].image);
        dispatch(
          updateProfileImagePath(BASE_URL + response.data.result[0].image),
        );
        dispatch(
          updateCoverImagePath(BASE_URL + response.data.result[0].cover_image),
        );
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const[count,setCount]=useState(0)
  useEffect(() => {
    if(count === 0)
    {
      GetProfileData();
    }
  }, []);
  //camera and imagepicker
  const refRBSheet_Profile = useRef();
  const refRBSheet_Cover = useRef();

  /////////////////image api calling///////////////
  const Edit_CoverImage = async props => {
    console.log('here image of cover', props);
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
        result => {
          console.log('here coveer image upload', result), GetProfileData();
        },
        // dispatch(updateImagePath('')),
        // dispatch(setCoverImageMenu(false)),
        // dispatch(setProfileImageMenu(true)),
      );
  };
  /////////////////image api calling///////////////
  const Edit_ProfileImage = async props => {
    console.log('here image of profile in url ', props);
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
        result => {
          console.log('here profile image upload', result), GetProfileData();
        },
        dispatch(updateImagePath('')),
        // navigation.navigate('Drawerroute'),
      );
  };
  const continue_btn = () => {
    Edit_ProfileImage(Profilepath);
    Edit_CoverImage(Coverpath);
    setModalVisible(true);
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
          {'Profile Image' }
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
        {profileImage === null  &&  Profilepath===""?(
          <Avatar.Text
            style={{
              position: 'absolute',
              backgroundColor:'#444444'
            }}
            size={hp(12)}
            color={'white'}
            label={'PImage'.substring(0, 2) }
          />
        ) : (
          <Image
            source={{uri: Profilepath}}
            style={{width: wp(30), height: hp(15), borderRadius: wp(15)}}
            resizeMode={'contain'}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          refRBSheet_Profile.current.open();
        }}
        style={{
          height: hp(5),
          width: wp(35),
          backgroundColor: Colors.Appthemecolor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: wp(2),
          alignSelf: 'center',
          marginTop: hp(2),
          marginBottom: hp(3),
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
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: hp(2),
        }}>
        {coverImage === null  &&  Coverpath==="" ? (
          <View
            style={{
              width: wp(95),
              backgroundColor: '#444444',
              height: hp(25),
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: hp(1.8),
                fontFamily: fontFamily.Poppins_Bold,
              }}>
              Cover Image
            </Text>
          </View>
        ) : (
          <Image
            source={{uri: Coverpath}}
            style={{width: wp(85), height: hp(25), borderRadius: wp(1)}}
            resizeMode={'cover'}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          refRBSheet_Cover.current.open();
        }}
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
          title={'Continue'}
          widthset={80}
          topDistance={15}
          // loading={loading}
          // disabled={disable}
          onPress={() => {
            continue_btn()
            //setModalVisible(true);
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
          dispatch(editImagesMenu(false));
          navigation.navigate('BottomTab');
        }}
      />
      <CamerBottomSheet
        refRBSheet={refRBSheet_Profile}
        onClose={() => refRBSheet_Profile.current.close()}
        title={'From Gallery'}
        type={'onepic'}
        from={'profile'}
        onpress={() => {
          refRBSheet_Profile.current.close();
        }}
      />
      <CamerBottomSheet
        refRBSheet={refRBSheet_Cover}
        onClose={() => refRBSheet_Cover.current.close()}
        title={'From Gallery'}
        type={'onepic'}
        from={'cover'}
        onpress={() => {
          refRBSheet_Cover.current.close();
        }}
      />
    </View>
  );
};

export default EditImages;
