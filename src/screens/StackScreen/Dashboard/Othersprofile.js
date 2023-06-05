import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

///////////react native paper///////////
import {Avatar} from 'react-native-paper';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';
import CustomButtonhere from '../../../components/Button/CustomButton';
import RattingBottomSheet from '../../../components/CustomBottomSheet/RattingBTS';

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

///////////////////icons///////////
import Icon from 'react-native-vector-icons/Ionicons';

////////screen id/////////////
import ScreensNames from '../../../data/ScreensNames';

const OtherProfile = ({navigation, route}) => {
  //camera and imagepicker
  const refRBSheet = useRef();

  /////////////Get Screen Logo/////////////
  const [dashboard_logo, setDashboardLogo] = useState([]);
  const GetDashboardLogo = useCallback(async () => {
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
        screen_id: ScreensNames.Dashboard_Screen,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setDashboardLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [dashboard_logo]);

  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={item.image}
        maintext={item.title}
        subtext={item.location}
        price={item.price}
        onpress={() => {
          navigation.navigate('ItemDetails', {
            Item_id: item.id,
          });
        }}
      />
    );
  };

  /////////////Get Notification/////////////
  const [id, setId] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('UserName');
  const [followings, setFollowig] = useState('');
  const [followers, setFollowers] = useState('');
  const [rattings, setRattings] = useState('');

  const GetSellerProfileData = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'auth/specific_user/' + route.params.seller_id,
    })
      .then(async function (response) {
        setId(response.data.result[0].id);
        setCoverImage(response.data.result[0].cover_image);
        setProfileImage(response.data.result[0].image);
        setUsername(response.data.result[0].username);
        setFollowig(response.data.followings);
        setFollowers(response.data.followers);
        var ratting=response.data.avgRatings
        var subratting=ratting.substring(0,1)
        setRattings(subratting) ;
       
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    GetSellerProfileData();
    GetMyItems();
    GetDashboardLogo();
    Follow_Seller_Status()
  }, []);

  /////////////Get Notification///////////
  const [my_items, setMyItems] = useState([]);
  const GetMyItems = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'items/get_items_by_user', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        Item_ID: user_id,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response  : ', response);
        setMyItems(response.result);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [my_items]);
  const Follow_Seller = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'follow/follow_user', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        follow_by_user_ID:route.params.seller_id,
        user_ID:user_id
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log("here user follow",response)
        Follow_Seller_Status()
        GetSellerProfileData()

      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, []);

  ////////status state////////////
  const[status,setStatus]=useState(false)
  const Follow_Seller_Status = useCallback(async () => {
   
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log("here data ids",route.params.seller_id,user_id)
    var headers = { 
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'follow/check_follow_status', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        viewed_user_ID:route.params.seller_id,
        user_ID:user_id
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log("here user follow",response,',,,,,,,,,,,,,,,,,,,', route.params.seller_id )
        //setStatus(response.Followed)
        response.Followed === "true"?
        setStatus(true)
        :setStatus(false)
        // if (response.status=== true) {
        //   route.params.seller_id === response.follow_by_user_id?
        //   setStatus(true):setStatus(false)
        // } else {
        // }
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
          title={'Profile Details'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL + dashboard_logo}
        />
        <View style={{alignItems: 'center'}}>
          {coverImage === null ? (
            <View style={styles.coverimage_view}>
              <Text style={styles.coverimage_text}>Cover Image</Text>
            </View>
          ) : (
            <Image
              source={{uri: BASE_URL + coverImage}}
              style={{width: wp(95), height: hp(25)}}
              resizeMode="contain"
            />
          )}

          {profileImage === null ? (
            <Avatar.Text
              style={{
                position: 'absolute',
                bottom: -30,
              }}
              size={hp(12)}
              label={
                username === null
                  ? 'UserName'.substring(0, 2)
                  : username.substring(0, 2)
              }
            />
          ) : (
            <Image
              source={{uri: BASE_URL + profileImage}}
              style={{
                width: wp(25),
                height: hp(12),
                borderRadius: wp(15),
                position: 'absolute',
                bottom: -30,
              }}
              resizeMode="contain"
            />
          )}
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: hp(5),
            alignSelf: 'center',
            width:wp(90),
            justifyContent:'center'
          }}>
          <Text style={{color: 'white',textAlign:'center'}}>
            {username === null ? 'UserName' : username}
          </Text>
          <TouchableOpacity
          onPress={()=> Follow_Seller()}
            style={{
              borderRadius: wp(3),
              height: hp(4),
              width: wp(20),
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
              position:'absolute',
              right:30,
              top:-12,
            }}>
            <Text style={{color: 'white'}}>{status === true?"UnFollow":"Follow"}</Text>
          </TouchableOpacity>
        </View>
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
            <Text style={styles.verticleToptext}>{followings}</Text>
            <Text
              style={styles.verticletext}
              onPress={() => navigation.navigate('Followers')}>
              Following
            </Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.verticleToptext}>{followers}</Text>
            <Text
              style={styles.verticletext}
              onPress={() => navigation.navigate('Followings')}>
              Followers
            </Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Icon name={'star'} size={16} color={'#F7FF00'} />
              <Text style={[styles.verticleToptext, {marginLeft: wp(1)}]}>
                {rattings}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                //backgroundColor: Colors.inactivetextinput,
                paddingVertical: hp(0.6),
                paddingHorizontal: wp(3),
                borderRadius: wp(5),
              }}>
              <Text style={styles.verticletext}>Ratting</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginLeft: wp(5), marginTop: hp(3)}}>
          <Text style={styles.verticleToptext}>Posts</Text>
        </View>
        {my_items.length === 0 ? (
          <Text style={styles.noposttext}>No Posts Available</Text>
        ) : (
          <FlatList
            data={my_items}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            scrollEnabled={false}
            horizontal={true}
          />
        )}

        <View style={{height: hp(10), marginBottom: hp(5)}}>
          <CustomButtonhere
            title={'Rate Profile'}
            widthset={80}
            topDistance={5}
            //loading={loading}
            //disabled={disable}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
      </ScrollView>
      <RattingBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={'Rate Profile'}
        subtitle={'Enter Description'}
        getData={() => GetSellerProfileData()}
        seller_id={route.params.seller_id}
      />
    </SafeAreaView>
  );
};

export default OtherProfile;
