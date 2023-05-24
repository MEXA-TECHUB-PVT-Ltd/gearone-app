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
import Loader from '../../../components/Loader/Loader';
import CustomModal from '../../../components/Modal/CustomModal';

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

const ItemDetails = ({navigation, route}) => {
  ////////////redux////////////
  const dispatch = useDispatch();

  /////////////reducer value////////////
  const ItemDetail = useSelector(state => state.ItemDetail);
  console.log('item id here in redux', ItemDetail);

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);

  //camera and imagepicker
  const refRBSheet = useRef();

  ////////////Listing Checks//////////////
  const [Item_like_user_id, setItem_Like_User_id] = useState('');
  const [Item_like_user_status, setItem_Like_User_Status] = useState('');

  /////////////Item Detail states/////////////
  const [Item_Images, setItem_Images] = useState('');
  const [Item_item_title, setItem_Item_Title] = useState('');
  const [Item_item_price, setItem_Item_Price] = useState('');
  const [Item_likes_count, setItem_Likes_count] = useState('');
  const [Item_description, setItem_Description] = useState('');

  //////////user//////////
  const [Item_userid, setItem_UserId] = useState('');
  const [Item_userImage, setItem_UserImage] = useState('User Name');
  const [Item_userName, setItem_UserName] = useState('User Name');
  const [Item_user_follower_count, setItem_User_Follower_Count] =
    useState('4855');
  const [login_user_id, setlogin_user_id] = useState();

  const images = [
    require('../../../assets/dummyimages/image_1.png'),
    require('../../../assets/dummyimages/image_2.png'),
    require('../../../assets/dummyimages/image_3.png'),
    require('../../../assets/dummyimages/image_4.png'),
  ];
  const GetItemDetail = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'items/get_item', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        Item_ID: ItemDetail,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('heree item detail data', response);
        setItem_Images(response?.result[0].images);
        GetUserData(response?.result[0].userid - 0);
        setItem_Item_Title(response?.result[0].name);
        setItem_Item_Price(response?.result[0].price);
        setItem_Comments_count(response?.result[0].username);
        setItem_Likes_count(response?.liked_by.length);
        var itemhere = response?.liked_by.find(
          item => item.likey_by === user_id - 0,
        );
        setItem_Like_User_id(itemhere?.likey_by - 0);
        setItem_Views_count(response?.followers);
        setItem_Description(response?.description);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [Item_likes_count]);
  useEffect(() => {
    GetItemDetail();
    getuser();
  }, []);
  const getuser = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    setlogin_user_id(user_id - 0);
  };

  /////////////Seller data////////////
  const GetUserData = async props => {
    axios({
      method: 'GET',
      url: BASE_URL + 'auth/specific_user/' + props,
    })
      .then(async function (response) {
        setItem_UserId(response.data?.result[0].id);
        setItem_UserImage(response.data?.result[0].image);
        setItem_UserName(response.data?.result[0].username);
        setItem_User_Follower_Count(response.data.followers);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  //-----------like list///////////
  const ltem_like = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    var raw = JSON.stringify({
      item_ID: ItemDetail,
      user_ID: user_id,
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      body: raw,
    };
    fetch(BASE_URL + 'like_item/like_item', requestOptions)
      .then(response => response.text())
      .then(result => GetItemDetail())
      .catch(error => console.log('error', error));
  };
  //-----------unlike list
  const Item_unlike = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    var raw = JSON.stringify({
      item_ID: ItemDetail,
      user_ID: user_id,
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      body: raw,
    };
    fetch(BASE_URL + 'like_item/un_like_item', requestOptions)
      .then(response => response.text())
      .then(result => GetItemDetail())
      .catch(error => console.log('error', error));
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
        <AutoImageSlider slider_images_array={Item_Images.length===0?images:Item_Images} />
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
          {Item_like_user_id === login_user_id ? (
            <TouchableOpacity
            //onPress={() => Item_unlike(predata.Item_id)}
            >
              <View style={styles.iconview}>
                <Icon
                  name={'heart'}
                  size={20}
                  color={'white'}
                  style={{marginRight: wp(1)}}
                />
                <Text style={styles.icontext}>{Item_likes_count} Likes</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.2}
              //onPress={() => Item_like(predata.Item_id)}
              style={[styles.iconview, {width: wp(30)}]}>
              <Icon
                name={'heart'}
                //name={'heart-outline'}
                size={20}
                color={
                  Item_like_user_id === login_user_id
                    ? Colors.Appthemecolor
                    : 'white'
                }
                style={{marginRight: wp(1)}}
              />
              <Text style={styles.icontext}>{Item_likes_count} Likes</Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: hp(1.5),
              marginBottom: hp(1),
              //backgroundColor:"red",
              //width: wp(62),
            }}>
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={'share'}
                size={20}
                color={'white'}
              />
              <Text
                style={styles.verticletext}
                onPress={() => navigation.navigate('Followers')}>
                Share
              </Text>
            </View>
            <View style={styles.verticleLine}></View>
            {Item_like_user_id === login_user_id ? (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => Item_unlike()}>
                <Icon name={'heart'} size={20} color={Colors.Appthemecolor} />
                <Text style={styles.verticletext}>{'UnLike'}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => ltem_like()}>
                <Icon name={'heart'} size={20} color={'white'} />
                <Text style={styles.verticletext}>{'Like'}</Text>
              </TouchableOpacity>
            )}
            <View style={styles.verticleLine}></View>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => setModalVisible(true)}>
              <Icon name={'bookmark'} size={20} color={'white'} />
              <Text style={styles.verticletext}>Save</Text>
            </TouchableOpacity>
            <View style={styles.verticleLine}></View>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  navtype: 'chatlist',
                  userid: '1',
                })
              }>
              <MaterialIcons name={'chat'} size={20} color={'white'} />
              <Text style={styles.verticletext}>Messages</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: hp(2), marginLeft: wp(5)}}>
            <Text style={styles.heading_text}>
              Description {Item_userid + '    ' + login_user_id}
            </Text>
          </View>
          <View style={{paddingHorizontal: wp(5)}}>
            <Text style={styles.detail_text}>{Item_description}</Text>
          </View>
          <View
            style={{
              borderColor: 'rgba(255, 255, 255, 0.80)',
              borderBottomWidth: hp(0.15),
              marginVertical: hp(2),
            }}></View>
          {Item_userid === login_user_id ? null : (
            <View>
              <View style={{marginVertical: hp(2), marginLeft: wp(5)}}>
                <Text style={styles.heading_text}>Seller's Detail</Text>
              </View>
              <View style={styles.userdeatilview}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: BASE_URL + Item_userImage}}
                    style={styles.userimage}
                    resizeMode="contain"
                  />
                  <View style={{marginLeft: wp(3)}}>
                    <Text style={styles.user_name}>{Item_userName}</Text>
                    <Text style={styles.user_followers}>
                      {Item_user_follower_count}k followers
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.btn_view}
                  onPress={() =>
                    navigation.navigate('OtherProfile', {
                      seller_id: Item_userid,
                    })
                  }>
                  <Text style={styles.btn_text}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <CustomModal
        modalVisible={modalVisible}
        text={'Success'}
        btn_text={'Go to Home'}
        subtext={'Item Saved Successfully'}
        type={'single_btn'}
        onPress={() => {
          setModalVisible(false), navigation.navigate('BottomTab');
        }}
      />
    </SafeAreaView>
  );
};

export default ItemDetails;
