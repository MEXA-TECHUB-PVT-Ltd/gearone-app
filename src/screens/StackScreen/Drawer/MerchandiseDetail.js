import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

////////////////////app components//////////////
import CustomModal from '../../../components/Modal/CustomModal';
import CustomButtonhere from '../../../components/Button/CustomButton';

/////////////////app components/////////
import Header from '../../../components/Header/Header';
import AutoImageSlider from '../../../components/ImageSlider/AutoImageSlider';

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

////////////screen id/////////////////
import ScreensNames from '../../../data/ScreensNames';

/////////////redux/////////
import {useDispatch, useSelector} from 'react-redux';

const MerchandiseDetails = ({navigation, route}) => {
  ////////previous screen data//////////
  const [predata] = useState(route.params);

  //////redux variable//////////
  const dispatch = useDispatch();
  const join_as_guest = useSelector(state => state.auth.join_as_guest);
  console.log('hre guest sattus', join_as_guest);

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);
  const [guest_modalVisible, setGuestModalVisible] = useState(false);

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  /////////////Item Detail states/////////////
  const [Item_Images, setItem_Images] = useState('');
  const [Item_item_title, setItem_Item_Title] = useState('');
  const [Item_item_price, setItem_Item_Price] = useState('');
  const [Item_likes_count, setItem_Likes_count] = useState('');
  const [Item_description, setItem_Description] = useState('');
  const [Item_location, setItem_Location] = useState('');

  const images = [
    require('../../../assets/dummyimages/image_1.png'),
    require('../../../assets/dummyimages/image_2.png'),
    require('../../../assets/dummyimages/image_3.png'),
    require('../../../assets/dummyimages/image_4.png'),
  ];

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
        console.log('response here in logos : ', response);
        setLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);

  const GetMerchandiseDetail = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'merchandise/get_merchandise', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        Merchandise_ID: predata.merchandise_id,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setItem_Images(response?.result[0].images);
        setItem_Item_Title(response?.result[0].name);
        setItem_Item_Price(response?.result[0].price);
        setItem_Description(response?.result[0].description);
        setItem_Location(response?.result[0].location);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [Item_likes_count]);
  useEffect(() => {
    GetMerchandiseDetail();
    GetLogo();
  }, []);

  //---------Order Place on Merchnadise Item ///////////
  const Merchnadise_Order = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');

    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let data = JSON.stringify({
      user_id: user_id,
      merchandise_id: predata.merchandise_id,
      ordered_at: Item_location,
      status: 'pending',
    });

    let config = {
      method: 'post',
      url: BASE_URL + 'orders/add_orders',
      headers: headers,
      data: data,
    };

    axios
      .request(config)
      .then(response => {
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
          right_icon={BASE_URL + logo}
        />
        <AutoImageSlider
          slider_images_array={Item_Images.length === 0 ? images : Item_Images}
        />
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
          <View
            style={{
              height: hp(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomButtonhere
              title={'Create Order'}
              widthset={80}
              topDistance={0}
              loading={loading}
              disabled={disable}
              onPress={() => {
                join_as_guest === true
                  ? setGuestModalVisible(true)
                  : Merchnadise_Order();
              }}
            />
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

export default MerchandiseDetails;
