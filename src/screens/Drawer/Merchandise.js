import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../components/Header/Header';
import NoDataFound from '../../components/NoDataFound/NoDataFound';
import SellCard from '../../components/CustomCards/SellCards/SellCards';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////redux/////////
import {useDispatch} from 'react-redux';
import { setItemDetail } from '../../redux/ItemSlice';

//////screen id//////////////
import ScreensNames from '../../data/ScreensNames';

const Merchandise = ({navigation, route}) => {
  //////redux variable/////////
  const dispatch = useDispatch();

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
          setLogo(response.result[0].image);
        })
        .catch(error => {
          console.log('Error  : ', error);
        });
    }, [logo]);
  

  /////////////Get Notification/////////////
  const [merchandise_items, setMerchandiseItems] = useState('');

  const GetLiked_Items = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'merchandise/get_all_merchandise', {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(async response => {
        if (response.result.length === 0) {
          <NoDataFound text={'No data here'} icon={'exclaim'} />;
        } else {
          setMerchandiseItems(response.result);
        }
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [merchandise_items]);
  useEffect(() => {
    GetLiked_Items();
    GetLogo()
  }, []);
  const renderItem = ({item}) => {
    return (
      <SellCard
        image={BASE_URL + item.images[0]}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        description={item.description}
        images_array_length={item.images.length}
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
          title={'Merchandise'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />
        <FlatList
          data={merchandise_items}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Merchandise;
