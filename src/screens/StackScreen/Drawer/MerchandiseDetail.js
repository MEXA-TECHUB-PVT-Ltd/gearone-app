import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

////////////////////app components//////////////
import CustomModal from '../../../components/Modal/CustomModal';
import CustomButtonhere from '../../../components/Button/CustomButton';

///////////////app icons////////////
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
import Colors from '../../../utills/Colors';

/////////////////async/////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setItemDetail} from '../../../redux/ItemSlice';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';

const MerchandiseDetails = ({navigation, route}) => {
  ////////////redux////////////
  const dispatch = useDispatch();

  /////////////Previous value////////////
  const ItemDetail = useSelector(state => state.ItemDetail);
  console.log('item id here in redux', route.params);
  const [predata] = useState(route.params);

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

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
        console.log('here response data', response);
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
  }, []);

  //----------save Item ///////////
  const Merchnadise_Order = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log('here data', token);

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
        console.log(JSON.stringify(response.data.status));
        if (response.data.status == true) {
          setModalVisible(true);
        } else {
          console.log('here data no');
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
                Merchnadise_Order();
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
    </SafeAreaView>
  );
};

export default MerchandiseDetails;
