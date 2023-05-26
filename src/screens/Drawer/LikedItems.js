import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../components/Header/Header';
import DashboardCard from '../../components/CustomCards/Dashboard/DashboardCard';
import NoDataFound from '../../components/NoDataFound/NoDataFound';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////redux///////////
import {useDispatch} from 'react-redux';
import {setItemDetail} from '../../redux/ItemSlice';

const LikedItems = ({navigation, route}) => {
  ///////////redux variable////////
  const dispatch = useDispatch();

  //////////loader state/////
  const [isLoading, setLoading] = useState(false);

  /////////////Get Notification/////////////
  const [liked_items, setLikedItems] = useState('');

  const GetLiked_Items = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'like_item/view_like_Item', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_ID: user_id,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        if (response.result.length === 0) {
          <NoDataFound text={'No data here'} icon={'exclaim'} />;
          setLoading(false);
        } else {
          setLikedItems(response.result);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [liked_items]);
  useEffect(() => {
    GetLiked_Items();
  }, []);
  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={BASE_URL + item?.images[0]}
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
          title={'Liked Items'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />

        <FlatList
          data={liked_items}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LikedItems;
