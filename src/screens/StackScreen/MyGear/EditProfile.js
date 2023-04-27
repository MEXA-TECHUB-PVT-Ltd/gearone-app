import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';

/////////////////components/////////////
import EditPersonalDetail from '../../../components/EditProfile/EditPersonal';
import EditSocialLinks from '../../../components/EditProfile/EditLinks';
import EditImages from '../../../components/EditProfile/EditImages';

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
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';

const EditProfile = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();
  const {edit_personal, edit_links, edit_Images} = useSelector(
    state => state.editProfile,
  );

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

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
    const device_id = await AsyncStorage.getItem('Device_id');
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
          title={'Edit Profile'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />

        {edit_personal === true ? (
          <EditPersonalDetail />
        ) : edit_links === true ? (
          <EditSocialLinks />
        ) : edit_Images === true ? (
          <EditImages />
        ) : null}

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

export default EditProfile;
