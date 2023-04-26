import React, {useEffect, useState, useRef} from 'react';
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

const ItemDetails = ({navigation, route}) => {
  ///////////////PREVIOUS DATA////////////
  const [predata] = useState(route.params);

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);

  //camera and imagepicker
  const refRBSheet = useRef();

  ////////////Listing Checks//////////////
  const [Item_like_user_id, setItem_Like_User_id] = useState('');

  /////////////Item Detail states/////////////
  const [Item_item_title, setItem_Item_Title] = useState('here');
  const [Item_item_price, setItem_Item_Price] = useState('here');
  const [Item_comments_count, setItem_Comments_count] = useState(23);
  const [Item_likes_count, setItem_Likes_count] = useState(23);
  const [Item_views_count, setItem_Views_count] = useState(56);
  const [Item_details, setItem_Details] = useState('here deatils');

  useEffect(() => {
    // GetListData();
    //Item_views();
    //getuser();
  }, []);
  const [login_user_id, setlogin_user_id] = useState();
  const images = [
    require('../../../assets/dummyimages/image_1.png'),
    require('../../../assets/dummyimages/image_2.png'),
    require('../../../assets/dummyimages/image_3.png'),
    require('../../../assets/dummyimages/image_4.png'),
  ];
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
        <AutoImageSlider slider_images_array={images} />
        <View>
          <View style={{marginTop: hp(4), marginHorizontal: wp(7)}}>
            <Text style={styles.pricetext}>{4578 + ' $'}</Text>
            <Text style={styles.maintext}>Item Name</Text>
          </View>

          <TouchableOpacity
            style={[styles.iconview, {width: wp(55)}]}
            onPress={() => {
              navigation.navigate('CommentsDetails', route.params);
            }}>
            <MaterialCommunityIcons
              name={'share'}
              size={20}
              color={Colors.activetextinput}
              style={{marginRight: wp(3)}}
              onPress={() => {
                {
                  navigation.navigate('CommentsDetails', route.params);
                }
              }}
            />
            <Text style={styles.icontext}>234 Shares</Text>
          </TouchableOpacity>
          {Item_like_user_id === login_user_id ? (
            <TouchableOpacity
            //onPress={() => Item_unlike(predata.Item_id)}
            >
              <View style={styles.iconview}>
                <Icon
                  name={'heart'}
                  size={20}
                  color={Colors.activetextinput}
                  style={{marginRight: wp(3)}}
                  onPress={() => {
                    {
                    }
                  }}
                />
                <Text style={styles.icontext}>234 Likes</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.2}
              //onPress={() => Item_like(predata.Item_id)}
              style={[styles.iconview, {width: wp(30)}]}>
              <Icon
                name={'heart-outline'}
                size={20}
                color={Colors.activetextinput}
                style={{marginRight: wp(3)}}
              />
              <Text style={styles.icontext}>234 Likes</Text>
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
              //   /width: wp(62),
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
            <View style={{alignItems: 'center'}}>
              <Icon name={'heart'} size={20} color={'white'} />
              <Text
                style={styles.verticletext}
                onPress={() => navigation.navigate('Followings')}>
                Like
              </Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View style={{alignItems: 'center'}}>
              <Icon name={'bookmark'} size={20} color={'white'} />
              <Text style={styles.verticletext}>Save</Text>
            </View>
            <View style={styles.verticleLine}></View>
            <View style={{alignItems: 'center'}}>
              <MaterialIcons name={'chat'} size={20} color={'white'} />
              <Text style={styles.verticletext}>Messages</Text>
            </View>
          </View>
          <View style={{marginVertical: hp(2), marginLeft: wp(5)}}>
            <Text style={styles.heading_text}>Description</Text>
          </View>
          <View style={{paddingHorizontal: wp(5)}}>
            <Text style={styles.detail_text}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </Text>
          </View>
          <View
            style={{
              borderColor: 'rgba(255, 255, 255, 0.80)',
              borderBottomWidth: hp(0.15),
              marginVertical: hp(2),
            }}></View>
          <View style={{marginVertical: hp(2), marginLeft: wp(5)}}>
            <Text style={styles.heading_text}>Seller's Detail</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: wp(5),
              marginBottom: hp(5),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/dummyimages/profile.png')}
                style={{width: wp(18), height: hp(10), borderRdius: wp(15)}}
                resizeMode="contain"
              />
              <View style={{marginLeft: wp(3)}}>
                <Text style={styles.user_name}>Username</Text>
                <Text style={styles.user_followers}>23.4k followers</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.btn_view}
              onPress={() => navigation.navigate('OtherProfile')}>
              <Text style={styles.btn_text}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemDetails;
