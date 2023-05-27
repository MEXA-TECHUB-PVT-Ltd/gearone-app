import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////redux///////////
import {useDispatch} from 'react-redux';
import {setItemDetail} from '../../../redux/ItemSlice';

const MyPosts = ({navigation, route}) => {
  /////redux variable///////////
  const dispatch = useDispatch();

   /////////////Get Screen Logo/////////////
   const [logo, setLogo] = useState([]);
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
         screen_id: '7',
       }),
     })
       .then(response => response.json())
       .then(async response => {
         console.log('response here in logos : ', response);
         setLogo(response.result[0].image)
       })
       .catch(error => {
         console.log('Error  : ', error);
       });
   }, [logo]);
 

  /////////////Get Notification/////////////
  const [myposts, setMyPosts] = useState('');

  useEffect(() => {
    GetMyPosts();
    GetLogo()
  }, []);

  //////////////////my Posts///////////
  const GetMyPosts = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var user_id = await AsyncStorage.getItem('User_id');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
      user_ID: user_id,
    });

    let config = {
      method: 'post',
      headers: headers,
      url: BASE_URL + 'items/get_items_by_user',
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data.result));
        setMyPosts(response.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }, [myposts]);

  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={BASE_URL+ item.images[0]}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
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
          title={'My Posts'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />

        <FlatList
          data={myposts}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPosts;
