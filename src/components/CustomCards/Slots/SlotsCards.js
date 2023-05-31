import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

////////////app Colors////////////
import Colors from '../../../utills/Colors';

////////////////app components///////////////
import CustomModal from '../../Modal/CustomModal';

//////////////app height and width////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////app icons////////////
import Icon from 'react-native-vector-icons/Ionicons';

//////////////////app fonts//////////
import {fontFamily} from '../../../constant/fonts';

///////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SlotsCards = ({time,type,time_slot_id,getTimeSlots_Data,select_id,item_id,select_func}) => {
    //Modal States
    const [modalVisible, setModalVisible] = React.useState(false);

      /////////////////image api calling///////////////
  const delete_TimeSlot = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log('data isd here', time_slot_id);
    let config = {
      method: 'delete',
      url:
        BASE_URL +
        'time_slot/deleteTimeSlot?&time_slot_id=' +
        time_slot_id +
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
        getTimeSlots_Data()
        //GetHairstyles();
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <TouchableOpacity
      style={{
        position: 'relative',
        width: wp(50),
        height: hp(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(5),
      }}
      onPress={()=>select_func()}
      >
      <View style={styles.card}>
        <Text style={styles.title}>{time}</Text>
      </View>
      <View style={styles.button}>
        <Icon
          name={type === 'day_slot' && select_id === item_id? 'checkmark-circle':'close-circle'}
          size={25}
          color={type === 'day_slot'&& select_id === item_id?Colors.Appthemecolor:"#777777"}
          onPress={()=>setModalVisible(true)}
        />
      </View>
      <CustomModal
          modalVisible={modalVisible}
          text={'Confirmation'}
          subtext={'Do you really want to delete this slot?'}
          onPress_yes={() => {
            setModalVisible(false);
            delete_TimeSlot()
            //navigation.navigate('Login');
          }}
          onPress_cancel={() => {
            setModalVisible(false);
          }}
        />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingTop: hp(2),
    paddingBottom: hp(2),
    width: wp(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  title: {
    fontSize: hp(1.8),
    color: '#323232',
    fontFamily: fontFamily.Poppins_Regular,
  },
});

export default SlotsCards;
