import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTheme, Drawer, Text, Avatar, Title} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

///////navigation////////
import {useNavigation} from '@react-navigation/native';

//////////////////app components//////////
import CustomModal from '../../components/Modal/CustomModal';

import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////app styles//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';

///////////////app fonts/////////////
import {fontFamily} from '../../constant/fonts';

///////////logo svg/////////
import Logo from '../../assets/svgs/Logo.svg';

export const DrawerContent = props => {
  ////////////navigation variable/////
  const navigation = useNavigation();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  //////logout function//////
  const logout = async () => {
    //await AsyncStorage.removeItem('Userid');
    props.navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.AppBckGround_color}}>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                marginTop: 25,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: wp(60),
              }}>
              <Logo width={wp(45)} height={hp(11)} />
            </View>
          </View>
          <View
            style={{
              marginTop: hp(3),
              height: hp(0.2),
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              width: wp(68),
              alignSelf: 'center',
              marginBottom: hp(3),
            }}></View>
          <Drawer.Section style={styles.drawerSection} showDivider={false}>
            <DrawerItem
              label="Home"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              label="My Gear"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('MyGear');
              }}
            />
            <DrawerItem
              label="Apparel Sale"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              label="Liked Items"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('LikedItems');
              }}
            />
            <DrawerItem
              label="Saved Items"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('SavedItems');
              }}
            />
            <DrawerItem
              label="Messages"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('ChatList');
              }}
            />
            <DrawerItem
              label="Terms & Conditions"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('TermsCondition');
              }}
            />
            <DrawerItem
              label="About Us"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('AboutUs');
              }}
            />
          </Drawer.Section>
        </View>
        <Drawer.Section style={styles.bottomDrawerSection} showDivider={false}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              borderRadius: wp(1),
              width: wp(60),
              height: hp(6),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.Appthemecolor,
              marginBottom: hp(1),
            }}>
            <Text
              style={{color: 'white', fontSize: hp(1.6), fontWeight: 'bold'}}>
              LOGOUT
            </Text>
          </TouchableOpacity>
        </Drawer.Section>
      </DrawerContentScrollView>
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
          //logout()
        }}
        onPress_cancel={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: Colors.AppBckGround_color,
  },
  userInfoSection: {
    marginTop: hp(3),
    paddingLeft: wp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  caption: {
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
    lineHeight: 12,
  },
  title: {
    fontSize: hp(2),
    // /marginTop: hp(5),
    fontFamily: fontFamily.Poppins_SemiBold,
  },

  drawerSection: {
    marginTop: hp(3),
    marginLeft: wp(5),
  },

  subtitle: {
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Regular,
    color: 'white',
    marginTop: hp(-2.4),
  },
  bottomDrawerSection: {
    height: hp(35),
    // marginBottom: hp(3),
    paddingTop: hp(18),
    backgroundColor: Colors.AppBckGround_color,
  },
  icon: {
    width: wp(6),
    height: hp(2.3),
    tintColor: Colors.Appthemecolor,
  },
});
