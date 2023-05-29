import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../components/Header/Header';

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

///////////////screen id//////////
import ScreensNames from '../../data/ScreensNames';

const AboutUs = ({navigation, route}) => {
  /////////////Get Screen Logo/////////////
  const [logo, setLogo] = useState();
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
        screen_id: ScreensNames.MyGear_Screen,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response here in logos : ', response);
        setLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);

  useEffect(() => {
    GetLogo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'About Us'}
          left_icon={'chevron-back-sharp'}
          type={'withoutlogo'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL + logo}
        />
        <View
          style={{marginTop: hp(4), marginLeft: wp(5), marginBottom: hp(2)}}>
          <Text style={styles.main_text}>Product Name:</Text>
          <Text style={styles.sub_text}>Lorem ipsum dolor etetu</Text>
        </View>
        <View
          style={{marginTop: hp(1), marginLeft: wp(5), marginBottom: hp(2)}}>
          <Text style={styles.main_text}>Version:</Text>
          <Text style={styles.sub_text}>Lorem ipsum dolor</Text>
        </View>
        <View
          style={{marginTop: hp(1), marginLeft: wp(5), marginBottom: hp(2)}}>
          <Text style={styles.main_text}>Developer:</Text>
          <Text style={styles.sub_text}>Lorem ipsum dolor</Text>
        </View>

        <View
          style={{marginTop: hp(1), marginLeft: wp(5), marginBottom: hp(3)}}>
          <Text style={[styles.main_text, {width: wp(70)}]}>
            Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
          </Text>
        </View>
        <View
          style={{
            marginTop: hp(2),
            marginBottom: hp(2),
            borderColor: '#B1B1B1',
            borderTopWidth: hp(0.1),
            borderBottomWidth: hp(0.1),
            paddingVertical: hp(1.5),
          }}>
          <Text style={[styles.main_text, {marginLeft: wp(5)}]}>
            End User License Agreement
          </Text>
        </View>
        <View
          style={{marginTop: hp(1), marginLeft: wp(5), marginBottom: hp(2)}}>
          <Text style={styles.main_text}>Privacy Policy</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
