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
import {setItemDetail} from '../../redux/ItemSlice';

const DailyDeals = ({navigation, route}) => {
  //////redux variable/////////
  const dispatch = useDispatch();

  /////////////Get Notification/////////////
  const [daily_deals, setDailyDeals] = useState('');

  const Get_DailyDeals = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let config = {
      method: 'post',
      url: BASE_URL+'dailydeals/get_all_daily_deals',
      headers: headers,
      data: {},
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.result.length === 0) {
          <NoDataFound text={'No data here'} icon={'exclaim'} />;
        } else {
          setDailyDeals(response.data.result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [daily_deals]);
  useEffect(() => {
    Get_DailyDeals();
  }, []);
  const renderItem = ({item}) => {
    return (
      <SellCard
        image={BASE_URL + item.image}
        maintext={item.title}
        subtext={item.ends_at}
        subtext_Text={'Expiry Date: '}
        subtext_Content={item.ends_at}
        price={item.ends_at}
        type={'deals'}
        description={item.description}
        images_array_length={item.image === null?0:1}
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
          title={'Daily Deals'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />
        <FlatList
          data={daily_deals}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyDeals;
