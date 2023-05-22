import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

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
        />
        <View
          style={{marginTop: hp(3), marginLeft: wp(5), marginBottom: hp(4)}}>
          <Text style={styles.account_text}>Linked Account:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp(12),
          }}>
          <Twitter width={wp(10)} height={hp(6)} />
          <LinkedIn width={wp(15)} height={hp(6)} />
          <Instagram width={wp(15)} height={hp(6)} />
          <FaceBook width={wp(8)} height={hp(6)} />
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
