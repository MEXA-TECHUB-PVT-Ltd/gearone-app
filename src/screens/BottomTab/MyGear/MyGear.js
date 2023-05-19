import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

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

/////////////colors////////////
import Colors from '../../../utills/Colors';

const MyGear = ({navigation}) => {
  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  
       /////////////Get Notification/////////////
       const [my_items, setMyItems] = useState('');

       const GetMyItems = async () => {
         var user = await AsyncStorage.getItem('Userid');
         console.log('order request function', user);
         axios({
           method: 'GET',
           url: BASE_URL + 'auth/specific_user/2',
           body:
           {
            user_ID:"1"
           }
         })
           .then(async function (response) {
             console.log('list data here ', response.data);
             setMyItems(response.data.result);
           })
           .catch(function (error) {
             console.log('error', error);
           });
       };
         useEffect(() => {
          GetMyItems()
           
         }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header title={'My Gear'} />
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assets/dummyimages/coverImage.png')}
            style={{width: wp(95), height: hp(25)}}
            resizeMode="contain"
          />
          <Image
            source={require('../../../assets/dummyimages/profile_user.png')}
            style={{
              width: wp(25),
              height: hp(12),
              borderRadius: wp(5),
              position: 'absolute',
              bottom: -30,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{alignItems: 'center', marginTop: hp(5)}}>
          <Text style={{color: 'white'}}>Username</Text>
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
            <Text style={styles.verticletoptext}>456</Text>
            <Text
              style={styles.verticletext}
              onPress={() => navigation.navigate('Followers')}>
              Following
            </Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.verticletoptext}>234</Text>
            <Text
              style={styles.verticletext}
              onPress={() => navigation.navigate('Followings')}>
              Followers
            </Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Icon name={'star'} size={20} color={'#F7FF00'} />
              <Text style={[styles.verticletoptext,{marginLeft:wp(1)}]}>4.5</Text>

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
        <View style={{borderBottomWidth:hp(0.15),borderColor:'rgba(255, 255, 255, 0.25)',marginBottom:hp(3),marginTop:hp(0)}}></View>
        <View>
          <SettingsMenu
            label={'My Account'}
            labelPress={() =>
              navigation.navigate('MyAccount', {
                navplace: 'MyAccount'
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
            labelPress={() =>
              navigation.navigate('EditProfile')
            }
          />
          <SettingsMenu
            label={'Logout'}
            labelPress={
              () => setModalVisible(true)
            }
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
          navigation.navigate('Login');
        }}
        onPress_cancel={() => {
          setModalVisible(false);
        }}
        onPress_back={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
};

export default MyGear;
