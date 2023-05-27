import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import SellCard from '../../../components/CustomCards/SellCards/SellCards';
import CustomButtonhere from '../../../components/Button/CustomButton';

/////////////app styles///////////////////
import styles from './styles';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////redux///////////
import {useDispatch} from 'react-redux';
import {setItemDetail} from '../../../redux/ItemSlice';

const Sell = ({navigation}) => {
  //////redux variable//////////
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
            screen_id: '5',
          }),
        })
          .then(response => response.json())
          .then(async response => {
            setLogo(response.result[0].image)
          })
          .catch(error => {
            console.log('Error  : ', error);
          });
      }, [logo]);

  /////////////Get Notification/////////////
  const [my_items, setMyItems] = useState();

  const GetMyItems =useCallback( async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var user_id = await AsyncStorage.getItem('User_id');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
      user_ID:user_id,
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
        setMyItems(response.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }, [my_items]);
  useEffect(() => {
    GetMyItems();
    GetLogo()
  }, []);
  const renderItem = ({item}) => {
    return (
      <SellCard
        image={BASE_URL+ item.images[0]}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        description={item.description}
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
          title={'Sell'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          headertype={'header_without_text'}
          right_logo={BASE_URL+logo}
        />
        <FlatList
          data={my_items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
        <View style={{marginBottom: hp(8)}}>
          <CustomButtonhere
            title={'Add Item'}
            widthset={80}
            topDistance={5}
            // loading={loading}
            // disabled={disable}
            onPress={() => navigation.navigate('UploadItem')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sell;
