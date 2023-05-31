import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

///////////////app components////////////////
import CustomButtonhere from '../../components/Button/CustomButton';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import Header from '../../components/Header/Header';

/////////////////components/////////////
import PersonalDetail from '../../components/CreateProfile/PersonalDetail';
import SocialLinks from '../../components/CreateProfile/SocialLinks';
import CoverImage from '../../components/CreateProfile/CoverImage';
import ProfileImage from '../../components/CreateProfile/ProfileImage';

////////////////app pakages////////////
import {Snackbar} from 'react-native-paper';

/////////////app styles///////////////////
import styles from './styles';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';

const CreateProfile = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();
  const {personal, links, profile_Image, cover_Image} = useSelector(
    state => state.createProfile,
  );

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  ///////////////data states////////////////////
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState();

  //Api form validation
  const formValidation = async () => {
    // input validation
    if (username == '') {
      setsnackbarValue({value: 'Please Enter Username', color: 'red'});
      setVisible('true');
    } else if (gender.name == '') {
      setsnackbarValue({value: 'Please Enter Gender', color: 'red'});
      setVisible('true');
    } else if (age == '') {
      setsnackbarValue({value: 'Please Enter Age', color: 'red'});
      setVisible('true');
    } else if (experience == '') {
      setsnackbarValue({
        value: 'Please Enter Experience',
        color: 'red',
      });
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
      get_image(imagePath);
    }
  };
  //////////////Api Calling////////////////////
  const CreateProfile = async () => {
    const user_id = await AsyncStorage.getItem('User_id');
    console.log('here user id',user_id)
    var token = await AsyncStorage.getItem('JWT_Token');
    let data = JSON.stringify({
      barber_id: user_id,
      user_name: username,
    });

    let config = {
      method: 'put',
      url: BASE_URL + 'Barber/update_profile?current_user_id=' + user_id,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setloading(0);
        setdisable(0);
        navigation.navigate('ProfileSucess');
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    //checkPermission()
  }, []);
  ///////////emai
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'Create Profile'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />
        {personal === true ? (
          <PersonalDetail />
        ) : links === true ? (
          <SocialLinks />
        ) : cover_Image === true ? (
          <CoverImage />
        ) : profile_Image === true ? (
          <ProfileImage />
        ) : null}

        {/* <View style={{height:hp(20), marginTop: hp(0), marginBottom: hp(20)}}>
          <CustomButtonhere
            title={'Countinue'}
            widthset={80}
            topDistance={15}
            // loading={loading}
            // disabled={disable}
            onPress={() =>
              //navigation.navigate('ProfileSucess')
              formValidation()
            }
          />
        </View> */}
        <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(20),
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProfile;
