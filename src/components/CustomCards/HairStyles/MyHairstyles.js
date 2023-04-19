import * as React from 'react';
import {View, Text, ActivityIndicator, Image,TouchableOpacity} from 'react-native';

////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////app icons////////////
import Icon from 'react-native-vector-icons/Ionicons';


//////////////app pakages/////////////
import {Avatar} from 'react-native-paper';

////////////api handles///////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyHairStylesCards = props => {
    /////////////////image api calling///////////////
    const delete_Hairstyle = async () => {
      var user_id = await AsyncStorage.getItem('User_id');
      var token = await AsyncStorage.getItem('JWT_Token');
      console.log('data isd here', props.hairstyle_id);
      let config = {
        method: 'delete',
        url:
          BASE_URL +
          'hairStyle/deleteHairStyle?hair_style_id=' +
          props.hairstyle_id +
          '&current_user_id=' +
          user_id,
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      axios
        .request(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
         props.hairstyle_get()
        })
        .catch(error => {
          console.log(error);
        });
    };
  return (
    <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: hp(1),
          justifyContent:'space-between',
          paddingHorizontal:wp(3),
          borderBottomWidth:wp(0.3),
          borderColor: '#DFDFDF',
          width:wp(90),
          alignSelf:'center',
          paddingBottom:hp(1)
        }}>
            <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
            <View style={styles.imageview}>
            <Image
          source={props.hairstyle_image}
          style={{height: hp(10), width: wp(22)}}
          resizeMode={'contain'}
        />
            </View>
          <Text style={styles.nametext}>{props.hairstyle_name}</Text>
        </View>
        <Icon name={'close-circle'} size={wp(6)} color={'red'} 
        onPress={()=>delete_Hairstyle()}
        />
      </View>
  );
};

export default MyHairStylesCards;
