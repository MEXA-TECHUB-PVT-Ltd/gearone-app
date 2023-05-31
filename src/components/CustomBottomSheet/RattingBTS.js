import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

//////////////////app components///////////////////
import CustomModal from '../Modal/CustomModal';
import CustomButtonhere from '../Button/CustomButton';

////////////app icons////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

////////////////////app pakages////////////////////////
import {Rating} from 'react-native-ratings';

///////////////app packages/////////////
import RBSheet from 'react-native-raw-bottom-sheet';

///////////////app styles//////////////////
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';

/////////////colors//////////
import Colors from '../../utills/Colors';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RattingBottomSheet = props => {
  //////////naviagtion variable////////////
  const navigation = useNavigation();

  //////////////Modal States/////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////redux states///////
  const dispatch = useDispatch();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  ///////////total rattings/////
  const [total_ratting, setTotal_Ratting] = useState('');

  //////ratting function/////////
  let ratingCompleted = rating => {
    setTotal_Ratting(rating);
  };

  //-----------seller ratting///////////
  const seller_Ratting = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log('params',user_id, token);
    axios({
      method: 'POST',
      url: BASE_URL + 'rate_user/rate_user',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
      body: {
        rate_by_user_ID: user_id,
        user_ID: props.seller_id,
        rating: total_ratting,
      },
    })
      .then(async function (response) {
        console.log('list data here in like api', response.data);
        //setItem_Like_User_id(response.data.id);
        //navigation.navigate("Drawerroute");
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  return (
    <RBSheet
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      openDuration={50}
      closeDuration={50}
      animationType="fade"
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        },
        draggableIcon: {
          backgroundColor: Colors.AppBckGround_color,
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: hp(30),
          backgroundColor: Colors.AppBckGround_color,
        },
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: wp(7),
        }}>
        <Text style={styles.Ratting_maintext}>{props.title}</Text>
        <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
          <Ionicons
            name={'close'}
            size={22}
            color={'white'}
            onPress={() => props.refRBSheet.current.close()}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          marginTop: hp(2),
        }}>
        <Rating
          ratingCount={5}
          imageSize={40}
          ratingBackgroundColor={'rgba(52, 52, 52, 0.5)'}
          tintColor={'rgba(52, 52, 52, 1)'}
          ratingColor={'orange'}
          ratingContainerStyle={{backgroundColor: 'black'}}
          starContainerStyle={{backgroundColor: 'black'}}
          onFinishRating={ratingCompleted}
        />
      </View>
      <View style={{marginTop: hp(0)}}>
        <CustomButtonhere
          title={'Rate'}
          widthset={80}
          topDistance={5}
          loading={loading}
          disabled={disable}
          onPress={() => {
            seller_Ratting();
          }}
        />
      </View>
      <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        text={'Sucess'}
        subtext={
          props.btntext === 'REPORT'
            ? 'Report Sucessfully'
            : 'Review Added Successfully'
        }
        buttontext={'OK'}
        onPress={() => {
          props.onClose();
          setModalVisible(false);
          //navigation.navigate('CommentsDetails')
        }}
      />
    </RBSheet>
  );
};

export default RattingBottomSheet;
