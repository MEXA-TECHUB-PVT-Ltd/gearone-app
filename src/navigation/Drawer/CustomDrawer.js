import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme, Drawer, Text, Avatar, Title } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

//////////////////app components//////////
import CustomModal from "../../components/Modal/CustomModal";

import AsyncStorage from "@react-native-async-storage/async-storage";

////////////////app styles//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../utills/Colors";

/////////////////app images///////////
import { appImages } from "../../constant/images";

///////////////app fonts/////////////
import { fontFamily } from "../../constant/fonts";

/////////////image url////////////////
import { IMAGE_URL } from "../../utills/ApiRootUrl";

///////////logo svg/////////
import Logo from '../../assets/svgs/Logo.svg'

export const DrawerContent = (props) => {
  const paperTheme = useTheme();
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const logout = async () => {
    await AsyncStorage.removeItem("Userid");
    props.navigation.navigate("Login");
  };
  /////////////main menu status states/////////////
  const [username, setUsername] = useState("");
  const [user_image, setUser_Image] = useState("");
  const [user_fullname, setUser_FullName] = useState("");
  const GetUserData = async () => {
    get_Login_UserData().then((response) => {
      console.log("here user data in drawer:", response.data);
      setUsername(response.data.user_name);
      setUser_FullName(response.data.full_name);
      setUser_Image(response.data.image);
    });
  };
  useEffect(() => {
    //GetUserData();
  }, []);
  return (
    <View style={{ flex: 1,backgroundColor:Colors.AppBckGround_color }}>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ marginTop: 25, alignSelf: "center",alignItems:'center',justifyContent:'center',
            width:wp(60) }}>
        <Logo width={wp(45)} height={hp(11)} />
            </View>
            <View style={{ alignSelf: "center", marginLeft: wp(4) }}>
              <Title style={styles.title}>{user_fullname}</Title>
              <Title style={styles.caption}>{username}</Title>
            </View>
          </View>
          <View
            style={{
              marginTop: hp(3),
              height: hp(0.1),
              backgroundColor: "white",
              width: wp(68),
              alignSelf: "center",
              marginBottom: hp(3),
            }}
          ></View>
          <Drawer.Section style={styles.drawerSection} showDivider={false}>
            <DrawerItem
              icon={({ color, size }) => (
                <Image source={appImages.drawercard} style={styles.icon} />
              )}
              label="Home"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("ShippingAddressList");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={appImages.drawerlanguage}
                  style={[styles.icon, { width: wp(7) }]}
                  resizeMode="contain"
                />
              )}
              label="My Gear"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("Language");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={appImages.drawerchat}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label="Apparel Sale"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("InviteFriends");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={appImages.drawerbanner}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label="Liked Items"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("LikedItems");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={appImages.drawerblogs}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label="Saved Items"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("SavedItems");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={appImages.drawerpolicy}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label="Messages"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("ChatList");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={appImages.drawerterms}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label="Terms & Conditions"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("TermsCondition");
              }}
            />
                    <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={appImages.drawerterms}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label="About Us"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("AboutUs");
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
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.Appthemecolor,
              marginBottom: hp(1),
            }}
          >
            <Text
              style={{ color: "white", fontSize: hp(1.6), fontWeight: "bold" }}
            >
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
        }}
        onPress_cancel={() => {
          setModalVisible(false);
        }}
        onPress_back={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor:Colors.AppBckGround_color
  },
  userInfoSection: {
    marginTop: hp(3),
    paddingLeft: wp(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  caption: {
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
    lineHeight: 12,
  },
  title: {
    fontSize: hp(2),
    marginTop: hp(5),
    fontFamily: fontFamily.Poppins_SemiBold,
  },

  drawerSection: {
    marginTop: hp(0),
  },

  subtitle: {
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
    color: "white",
  },
  bottomDrawerSection: {
    height:hp(30),
    // marginBottom: hp(3),
     paddingTop: hp(10),
    backgroundColor:Colors.AppBckGround_color,
  },
  icon: {
    width: wp(6),
    height: hp(2.3),
    tintColor: Colors.Appthemecolor,
  },
});
