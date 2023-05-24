import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../components/Header/Header';
import NoDataFound from '../../components/NoDataFound/NoDataFound';
import SellCard from '../../components/CustomCards/SellCards/SellCards';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////redux/////////
import {useDispatch} from 'react-redux';
import { setItemDetail } from '../../redux/ItemSlice';

const MyOrders = ({navigation, route}) => {
  //////redux variable/////////
  const dispatch = useDispatch();

  /////////////Get Notification/////////////
  const [myOrder_items, setMyOrderItems] = useState('');

  const Get_MyOrders = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var user_id = await AsyncStorage.getItem('User_id');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
        user_id: user_id
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_URL+'orders/get_orders_by_user_id',
        headers: headers,
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.result));
        setMyOrderItems(response.data.result)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myOrder_items]);
  useEffect(() => {
    Get_MyOrders();
  }, []);
  const renderItem = ({item}) => {
    return (
      <SellCard
        //image={BASE_URL + item.images[0]}
        maintext={item.merchandise_name}
        subtext={item.location}
        price={item.price}
        description={item.description}
        status={item.status}
        type={'orders'}
        order_date={item.createdat}
        //images_array_length={item.images.length}
        onpress={() => {
          navigation.navigate('MerchandiseDetails', {
            merchandise_id: item.id,
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
          title={'My Oders'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />
        <FlatList
          data={myOrder_items}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrders;
