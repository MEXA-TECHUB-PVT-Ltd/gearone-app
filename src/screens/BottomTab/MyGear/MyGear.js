import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

////////////naviagtion///////////////
import { useIsFocused } from '@react-navigation/native';

///////////react native paper///////////
import {Avatar} from 'react-native-paper';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import SettingsMenu from '../../../components/SettingsView/SettingsMenu';
import CustomModal from '../../../components/Modal/CustomModal';

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

////////screen id///////////
import ScreensNames from '../../../data/ScreensNames';

//////redux////////////////
import { useSelector } from 'react-redux';

const MyGear = ({navigation}) => {

  ///////////////redux variable ///////
   const join_as_guest=useSelector(state => state.auth.join_as_guest)
  console.log("here user status",join_as_guest)

  /////////navigation variable/////////////
  const isFocused = useIsFocused();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);
  const [guest_modalVisible, setGuestModalVisible] = useState(false);

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
          setLogo(response.result[0].image)
        })
        .catch(error => {
          console.log('Error  : ', error);
        });
    }, [logo]);

  /////////////Get Notification/////////////
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [followings, setFollowig] = useState('');
  const [followers, setFollowers] = useState('');
  const [rattings, setRattings] = useState('');

  const GetProfileData = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'GET',
      url: BASE_URL + 'auth/specific_user/' + user_id,
    })
      .then(async function (response) {
        console.log('list data here ', response.data.result);
        setCoverImage(response.data.result[0].cover_image);
        setProfileImage(response.data.result[0].image);
        setUsername(response.data.result[0].username);
        setFollowig(response.data.followings);
        setFollowers(response.data.followers);
        var ratting=response.data.avgRatings
        var subratting=ratting.substring(0,1)
        setRattings(subratting === "N"?"0":subratting) ;
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    if (isFocused && join_as_guest) {
      setGuestModalVisible(true)
       // You can customize the a message as per your needs
     }
    GetProfileData();
    GetLogo()
  }, [isFocused]);
  //////logout function//////
  const logout = async () => {
    await AsyncStorage.removeItem('User_id');
    await AsyncStorage.removeItem('JWT_Token');
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header title={'My Gear'} 
        right_logo={BASE_URL+logo}
        />
        <View
          style={{
            alignItems: 'center',
            width: wp(95),
            height: hp(25),
            backgroundColor: 'light_grey',
            alignSelf: 'center',
          }}>
               {coverImage === null ? (
            <View style={styles.coverimage_view}>
              <Text style={styles.coverimage_text}>Cover Image</Text>
            </View>
          ) : (
            <Image
              source={{uri: BASE_URL + coverImage}}
              style={{width: wp(98), height: hp(25)}}
              resizeMode="cover"
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
        <View style={{alignItems: 'center', marginTop: hp(5)}}>
          <Text style={{color: 'white'}}>{username}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: hp(1.5),
            marginBottom: hp(1),
            // /backgroundColor:"red",
            width: wp(80),
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.verticletoptext}>{followings}</Text>
            <Text
              style={styles.verticletext}
              onPress={() => navigation.navigate('AllFollowings')}>
              Following
            </Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.verticletoptext}>{followers}</Text>
            <Text
              style={styles.verticletext}
              onPress={() => navigation.navigate('AllFollowers')}>
              Followers
            </Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Icon name={'star'} size={20} color={'#F7FF00'} />
              <Text style={[styles.verticletoptext, {marginLeft: wp(1)}]}>
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
        <View
          style={{
            borderBottomWidth: hp(0.15),
            borderColor: 'rgba(255, 255, 255, 0.25)',
            marginBottom: hp(3),
            marginTop: hp(0),
          }}></View>
        <View>
          <SettingsMenu
            label={'My Account'}
            labelPress={() =>
              navigation.navigate('MyAccount', {
                navplace: 'MyAccount',
              })
            }
          />
          <SettingsMenu
            label={'My Posts'}
            labelPress={() =>
              navigation.navigate('MyPosts', {navplace: 'MyPosts'})
            }
          />
          <SettingsMenu
            label={'Edit Profile'}
            labelPress={() => navigation.navigate('EditProfile')}
          />
          <SettingsMenu
            label={'Logout'}
            labelPress={() => setModalVisible(true)}
          />
        </View>
      </ScrollView>
      <CustomModal
        modalVisible={modalVisible}
        text={'Confirmation'}
        btn_text={'Go to Home'}
        btn_text_cancel={'Cancel'}
        btn_text_done={'Yes'}
        subtext={'Do you really want to logout?'}
        type={'confirmation'}
        onPress_yes={() => {
          setModalVisible(false);
          logout()
        }}
        onPress_cancel={() => {
          setModalVisible(false);
        }}
 
      />
          <CustomModal
        modalVisible={guest_modalVisible}
        onClose={()=>{setGuestModalVisible(false), navigation.navigate('Home')}}
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

export default MyGear;
