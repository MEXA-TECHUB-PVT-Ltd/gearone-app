import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import SettingsMenu from '../../../components/SettingsView/SettingsMenu';

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
import Icon from "react-native-vector-icons/Ionicons";

/////////////colors////////////
import Colors from '../../../utills/Colors';

const MyGear = ({navigation}) => {
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
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          marginTop: hp(1.5),
          marginBottom: hp(1),
          //backgroundColor:"red",
        //   /width: wp(62),
        }}
      >
        <View style={{ alignItems: "center" }}>
            <Icon name={"facebook"} size={25} color={"blue"} />
            <Text style={styles.verticletext}>followers</Text>
          <Text
            style={styles.verticletext}
            onPress={() =>navigation.navigate("Followers")}
          >
            following_text
          </Text>
        </View>
        <View style={styles.verticleLine}></View>
        <View style={{ alignItems: "center" }}>
            <Icon name={"star"} size={25} color={"orange"} />
            <Text style={styles.verticletext}>following</Text>
          <Text
            style={styles.verticletext}
            
            onPress={() =>navigation.navigate("Followings")}
          >
           followers_text
          </Text>
        </View>
          <View style={styles.verticleLine}></View>
          <View style={{ alignItems: "center" }}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text style={styles.verticletext}>ratting</Text>
              <Icon name={"star"} size={20} color={"orange"} />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.inactivetextinput,
                paddingVertical: hp(0.6),
                paddingHorizontal: wp(3),
                borderRadius: wp(5),
              }}
            >
              <Text style={styles.verticletext}>
                ratting_text
              </Text>
            </TouchableOpacity>
          </View>

      </View>
      <View>
      <SettingsMenu
       label={'My Account'}
       labelPress={()=>navigation.navigate('ChangePassword',{navplace:'ChangePassword'})}
       />
             <SettingsMenu
       label={'My Posts'}
       labelPress={()=>navigation.navigate('MyPosts',{navplace:'MyPosts'})}
       />
             <SettingsMenu
       label={'Edit Profile'}
       labelPress={()=>navigation.navigate('ChangePassword',{navplace:'ChangePassword'})}
       />
             <SettingsMenu
       label={'Logout'}
       labelPress={()=>navigation.navigate('ChangePassword',{navplace:'ChangePassword'})}
       />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyGear;
