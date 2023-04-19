import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//////////////app icons///////////
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////app styles///////////////////
import Colors from '../../utills/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

///////////app fonts////////////
import {fontFamily} from '../../constant/fonts';

const Tab = createBottomTabNavigator();

//screeens
import Home from '../../screens/BottomTab/Home/Home';
// import ChatList from '../../screens/BottomTabs/ChatList/ChatList';
// import Profile from '../../screens/BottomTabs/Profile/Profile';

function BottomTab() {
  return (
    <Tab.Navigator
      labeled={false}
      activeColor={Colors.Appthemecolor}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Colors.Appthemecolor,
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          height: hp(8),
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 10,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,

          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
            {!focused ? (
              <Entypo
                name="home"
                color={ Colors.App_Tab_icon }
                size={25}
              />
            ) : (
              <View style={[style.tab]}>
                <Text style={style.tabtextcolor}>{'Home'}</Text>
                <View style={[style.tabview]}></View>
              </View>
            )}
          </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          headerShown: false,

          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
            {!focused ? (
              <Ionicons
                name="chatbubbles-sharp"
                color={Colors.App_Tab_icon}
                size={25}
              />
            ) : (
              <View style={[style.tab]}>
                <Text style={style.tabtextcolor}>{'Inbox'}</Text>
                <View style={[style.tabview]}></View>
              </View>
            )}
          </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,

          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              {!focused ? (
                <Ionicons
                  name="person"
                  color={Colors.App_Tab_icon}
                  size={25}
                />
              ) : (
                <View style={[style.tab]}>
                  <Text style={style.tabtextcolor}>{'Profile'}</Text>
                  <View style={[style.tabview]}></View>
                </View>
              )}
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
const style = StyleSheet.create({
  maintabview: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  tab: {
    width: wp(15),
    height: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabview: {
    width: wp(8),
    height: hp(0.5),
    backgroundColor: Colors.Appthemecolor,
    borderRadius: wp(2),
    alignSelf: 'center',
    marginTop: hp(0.8),
  },
  tabtextcolor: {
    color: Colors.Appthemecolor,
    fontSize: hp(2),
    fontFamily: fontFamily.Inter_Medium,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
export default BottomTab;
