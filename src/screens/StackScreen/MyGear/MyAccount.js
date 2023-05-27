import React, {useEffect, useState, useRef,useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList, TouchableOpacity,Linking } from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';

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

///////////////svgs/////////////
import LinkedIn from '../../../assets/svgs/linkedIn.svg';
import FaceBook from '../../../assets/svgs/facebook.svg';
import Twitter from '../../../assets/svgs/twitter.svg';
import Instagram from '../../../assets/svgs/insta.svg';

const MyAccount = ({navigation, route}) => {
  /////////////Get Notification/////////////
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [phone_countrycode, setPhone_CountryCode] = useState('');

    /////////////links states/////////////
    const [faceBook, setFaceBook] = useState('');
    const [insta, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedIn, setLinkedIn] = useState('');

  /////////////Get Screen Logo/////////////
  const [logo, setLogo] = useState([]);
  const GetLogo = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'logos/get_logos_by_screen', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        screen_id: '7',
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response here in logos : ', response);
        setLogo(response.result[0].image)
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);


  const GetProfileData = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'GET',
      url: BASE_URL + 'auth/specific_user/' + user_id,
    })
      .then(async function (response) {
        console.log('list data here ', response.data.result);
        setPhone_number(response.data.result[0].phone);
        setEmail(response.data.result[0].email);
        setPhone_CountryCode(response.data.result[0].country_code)
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    GetProfileData();
    GetSocailLinks()
    GetLogo()
  }, []);

  /////////socia links////////
  const GetSocailLinks =useCallback( async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log("here id",user_id,)
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'SocialMedia/get_social_media', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        userID: user_id,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response hgeree are  : ', response.result);
        setFaceBook(response.result[0].facebook)
        setLinkedIn(response.result[0].linkedin)
        setTwitter(response.result[0].twitter)
        setInstagram(response.result[0].insta)
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, []);
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'My Accouns'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />
        <View
          style={{marginTop: hp(3), marginLeft: wp(5), marginBottom: hp(4)}}>
          <Text style={styles.account_text}>Linked Account:{twitter}{linkedIn}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp(12),
          }}>
            <TouchableOpacity onPress={()=>Linking.openURL(twitter)}>
            <Twitter width={wp(10)} height={hp(6)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL(linkedIn)}>
            <LinkedIn width={wp(15)} height={hp(6)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL(insta)}>
            <Instagram width={wp(15)} height={hp(6)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL(faceBook)}>
            <FaceBook width={wp(8)} height={hp(6)} />
            </TouchableOpacity>


        </View>
        <View
          style={{marginTop: hp(4), marginLeft: wp(5), marginBottom: hp(3)}}>
          <Text style={styles.account_text}>Email:</Text>
          <Text style={styles.account_subtext}>{email}</Text>
        </View>
        <View
          style={{marginTop: hp(2), marginLeft: wp(5), marginBottom: hp(3)}}>
          <Text style={styles.account_text}>Phone Number:</Text>
          <Text style={styles.account_subtext}>{phone_countrycode+phone_number}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccount;
