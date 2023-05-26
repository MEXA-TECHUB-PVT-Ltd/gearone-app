import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../components/Header/Header';
import DashboardCard from '../../components/CustomCards/Dashboard/DashboardCard';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////redux///////////
import {useDispatch} from 'react-redux';
import {setItemDetail} from '../../redux/ItemSlice';

const SavedItems = ({navigation, route}) => {
  ///////////redux variable////////
  const dispatch = useDispatch();

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
    GetSaved_Items();
  }, []);
  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={BASE_URL + item?.images[0]}
        maintext={item?.name}
        subtext={item?.location}
        price={item?.price}
        images_array_length={item.images.length}
        onpress={() => {
          dispatch(setItemDetail({id: item.id, navplace: 'login_user_items'}));
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
        />
        <FlatList
          data={saved_items}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedItems;
