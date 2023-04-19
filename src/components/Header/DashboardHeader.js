import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

////////////////////app styles/////////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';

/////////////app icons/////////////////////
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

////////////////app fonts////////
import {fontFamily} from '../../constant/fonts';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardHeader = ({onpressicon}) => {
  ///////////////data states////////////////////
  const [name, setName] = React.useState();
  const [user_image, setImage] = React.useState();
  ////////////get profile//////////
  const getProfile_Data = useCallback(async () => {
    const user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    let config = {
      method: 'get',
      url:
        BASE_URL +
        'barber/getBarberById?current_user_id=' +
        user_id +
        '&barber_id=' +
        user_id,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status === true) {
          setName(response.data.result[0].user_name);
          response.data.result[0].image === null
            ? setImage('no image')
            : setImage(BASE_URL + response.data.result[0].image);
        } else {
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [name, user_image]);
  useEffect(() => {
    getProfile_Data();
    greeting_func();
  }, []);

  const [greeting, setGreeting] = React.useState();
  const greeting_func = () => {
    const time = new Date().getHours();

    if (time >= 5 && time < 12) {
      setGreeting('Good morning,');
    } else if (time >= 12 && time < 18) {
      setGreeting('Good afternoon,');
    } else {
      setGreeting('Good evening,');
    }
  };
  return (
    <View>
      <View style={[style.headerView]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: user_image}}
              style={style.logo}
              resizeMode="contain"
            />
            <View style={style.labelView}>
              <Text style={style.timestatustext}>{greeting}</Text>
              <Text style={style.usernametext}>{name}</Text>
            </View>
          </View>

          <TouchableOpacity style={style.btn} onPress={onpressicon}>
            <MaterialCommunityIcons
              name="bell-badge-outline"
              color={Colors.Appthemecolor}
              size={28}
              onPress={onpressicon}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: wp(1)}}>
          <Text style={style.priceAdtext}>Each Hairstyle is in only </Text>
          <Text
            style={[style.priceAdtext, {color: 'black', marginTop: hp(0.4)}]}>
            23$
          </Text>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  headerView: {
    width: wp(100),
    height: hp(25),
    paddingHorizontal: wp(7),
    paddingVertical: hp(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
    backgroundColor: Colors.Appthemecolor,
  },

  labelView: {
    width: wp(40),
    marginLeft: wp(3),
  },
  logo: {
    height: wp(16),
    width: wp(16),
    borderRadius: wp(10),
  },
  timestatustext: {
    color: 'white',
    fontSize: hp(1.8),
    fontFamily: fontFamily.Inter_Regular,
    marginBottom: wp(2),
  },
  usernametext: {
    color: 'white',
    fontSize: hp(2),
    fontFamily: fontFamily.Inter_Bold,
  },
  priceAdtext: {
    fontSize: hp(2.5),
    fontFamily: fontFamily.Inter_Bold,
    marginTop: hp(4),
    width: wp(65),
    color: 'white',
  },
  btn: {
    backgroundColor: 'white',
    height: hp(6),
    width: wp(12),
    borderRadius: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DashboardHeader;
