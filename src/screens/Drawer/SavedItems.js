import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

////////////naviagtion///////////////
import { useIsFocused } from '@react-navigation/native';

///////////////app components////////////////
import Header from '../../components/Header/Header';
import DashboardCard from '../../components/CustomCards/Dashboard/DashboardCard';
import CustomModal from '../../components/Modal/CustomModal';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////redux///////////
import {useDispatch,useSelector} from 'react-redux';
import {setItemDetail} from '../../redux/ItemSlice';

///////////screen id//////////
import ScreensNames from '../../data/ScreensNames';

const SavedItems = ({navigation, route}) => {
  //////redux variable//////////
  const dispatch = useDispatch();
  const join_as_guest=useSelector(state => state.auth.join_as_guest)
  
  /////////navigation variable/////////////
  const isFocused = useIsFocused();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////Get Screen Logo/////////////
  const [logo, setLogo] = useState();
  const GetLogo = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'logos/get_logos_by_screen', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        screen_id: ScreensNames.MyGear_Screen,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('here logo response',response)
        setLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);

  /////////////Get Notification/////////////
  const [saved_items, setSavedtems] = useState('');

  const GetSaved_Items = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log('hree data', token);
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'save_item/view_save_Item', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_ID: user_id,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setSavedtems(response.result);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [saved_items]);
  useEffect(() => {
    if (isFocused && join_as_guest) {
      setModalVisible(true)
       // You can customize the a message as per your needs
     }
    GetSaved_Items();
    GetLogo()
  }, [isFocused]);
  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={BASE_URL + item?.images[0]}
        maintext={item?.name}
        subtext={item?.location}
        price={item?.price}
        images_array_length={item.images.length}
        onpress={() => {
          dispatch(setItemDetail({id: item.id, navplace: 'login_user_items',type:'save'}));
          navigation.navigate('ItemDetails', {
            Item_id: item.id,
          });
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'Saved Items'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />
        <FlatList
          data={saved_items}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
      <CustomModal
        modalVisible={modalVisible}
        onClose={()=>{setModalVisible(false), navigation.navigate('Home')}}
        text={'Alert'}
        btn_text={'Go to Login'}
        subtext={'Login First To See Content'}
        type={'single_btn'}
        guest={'confirmation'}
        onPress={() => {
          setModalVisible(false);
           navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
};

export default SavedItems;
