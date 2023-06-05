import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, Image} from 'react-native';

////////////////////app components//////////////
import CustomModal from '../../../components/Modal/CustomModal';
import Counter from '../../../components/Counter/Counter';

/////////////////app components/////////
import Header from '../../../components/Header/Header';

////////////////App Heigth Width////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';

/////////////////async/////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';

/////screen id//////////
import ScreensNames from '../../../data/ScreensNames';

/////moment library///////////////
import moment from 'moment';

const DailyDealsDetails = ({navigation, route}) => {
  const [predata] = useState(route.params);

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);
  const [guest_modalVisible, setGuestModalVisible] = useState(false);

  /////////////Item Detail states/////////////
  const [Item_Image, setItem_Image] = useState('');
  const [Item_item_title, setItem_Item_Title] = useState('');
  const [Item_item_price, setItem_Item_Price] = useState('');
  const [Item_likes_count, setItem_Likes_count] = useState('');
  const [Item_description, setItem_Description] = useState('');
  const [Item_location, setItem_Location] = useState('');
  const [Item_endDeal, setItem_EndDeal] = useState('');

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
        screen_id: ScreensNames.MyGear_Screen,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);

  const Get_DailyDealsDetail = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'dailydeals/get_a_daily_deals', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        DailyDeal_ID: predata.merchandise_id,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('here response data', response);
        setItem_Image(response?.result[0].image);
        setItem_Item_Title(response?.result[0].name);
        setItem_Item_Price(response?.result[0].price);
        setItem_Description(response?.result[0].description);
        setItem_Location(response?.result[0].location);
        setItem_EndDeal(response?.result[0].ends_at);

        const dateString = moment(response?.result[0].ends_at).toDate();
        const timestamp = new Date(response?.result[0].ends_at).getTime();
        const currentTime = moment();
        const remainingTime = moment(timestamp).diff(currentTime);
        console.log('hree remainingTime', remainingTime);
        // Handle negative remaining time
        const formattedRemainingTime = remainingTime >= 0 ? remainingTime : 0;
        console.log('hree formattedRemainingTime', formattedRemainingTime);
        //setItem_EndDeal(formattedRemainingTime);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [Item_likes_count]);

  const [remaining_time, setRemainingTime] = useState();
  useEffect(() => {
    Get_DailyDealsDetail();
    GetLogo();
  }, []);

  //----------save Item ///////////
  const Merchnadise_Order = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');

    let data = JSON.stringify({
      user_id: user_id,
      merchandise_id: predata.merchandise_id,
      ordered_at: Item_location,
      status: 'pending',
    });

    let config = {
      method: 'post',
      url: BASE_URL + 'orders/add_orders',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        //
        if (response.data.status == true) {
          setModalVisible(true);
        } else {
          //setModalVisible(true)
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Header
          title={'Item Details'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={logo}
        />
        <Image
          source={{uri: BASE_URL + Item_Image}}
          style={{height: hp(30), width: wp(98), marginBottom: hp(4)}}
          resizeMode="cover"
        />
        <View
          style={{
            backgroundColor: '#444444',
            height: hp(5),
            width: wp(30),
            alignSelf: 'center',
          }}>
          <Counter endTime={Item_endDeal} />
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: hp(2),
              marginTop: hp(5),
              marginHorizontal: wp(5),
            }}>
            <Text style={styles.ItemName_text}>{Item_item_title}</Text>
            <Text style={styles.ItemPrice_text}>{Item_item_price} $</Text>
          </View>
          <View
            style={{
              marginBottom: hp(2),
              marginTop: hp(0),
              marginHorizontal: wp(5),
            }}>
            <Text style={styles.ItemName_text}>
              Category: {Item_item_title}
            </Text>
          </View>

          <View style={{marginVertical: hp(2), marginLeft: wp(5)}}>
            <Text style={styles.heading_text}>Description</Text>
          </View>
          <View style={{paddingHorizontal: wp(5)}}>
            <Text style={styles.detail_text}>{Item_description}</Text>
          </View>
        </View>
      </ScrollView>
      <CustomModal
        modalVisible={modalVisible}
        text={'Success'}
        btn_text={'Go to My Order'}
        subtext={'Order Created Successfully'}
        type={'single_btn'}
        onPress={() => {
          setModalVisible(false), navigation.navigate('MyOrders');
        }}
      />
      <CustomModal
        modalVisible={guest_modalVisible}
        onClose={() => {
          setGuestModalVisible(false), navigation.navigate('Home');
        }}
        text={'Alert'}
        btn_text={'Go to Login'}
        subtext={'Login First To See Content'}
        type={'single_btn'}
        guest={'confirmation'}
        onPress={() => {
          setGuestModalVisible(false);
          navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
};

export default DailyDealsDetails;
