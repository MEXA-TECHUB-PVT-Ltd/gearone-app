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
import Categories from '../../screens/BottomTab/Categories/Categories';
import Sell from '../../screens/BottomTab/Sell/Sell';
import Search from '../../screens/BottomTab/Search/Search';
import MyGear from '../../screens/BottomTab/MyGear/MyGear';

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
          backgroundColor: Colors.AppBckGround_color,
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
                <View style={[style.tab]}>
                  <Text style={style.tabtextcolor}>{'Home'}</Text>
                </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,

          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab]}>
                <Text style={style.tabtextcolor}>{'Categories'}</Text>
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab]}>
                <View style={[style.tabview,focused ? style.selectedtabview : null]}>
                  <Text
                    style={[
                      style.tabtextcolor,
                      {fontFamily: fontFamily.Poppins_Regular, color: 'white'},
                    ]}>
                    {'Sell'}
                  </Text>
                </View>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab]}>
                <Text style={style.tabtextcolor}>{'Search'}</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyGear"
        component={MyGear}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab]}>
                <Text style={style.tabtextcolor}>{'MyGear'}</Text>
              </View>
            </View>
          ),
        }}
      />
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
  selectedtabview: {
    width: wp(14),
    height: hp(4.5),
    borderColor: Colors.Appthemecolor,
    borderWidth: wp(0.3),
    borderRadius: wp(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabtextcolor: {
    color: 'grey',
    fontSize: hp(1.4),
    fontFamily: fontFamily.Poppins_Extra_Light,
    width: wp(19),    
    textAlign:'center'

  },
});
export default BottomTab;
