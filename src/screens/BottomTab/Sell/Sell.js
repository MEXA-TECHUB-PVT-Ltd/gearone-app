import React, {useEffect, useState, useRef} from 'react';
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

const Sell = ({navigation}) => {

       /////////////Get Notification/////////////
       const [my_items, setMyItems] = useState();

       const GetMyItems = async () => {
        var token = await AsyncStorage.getItem('JWT_Token');
        var user_id = await AsyncStorage.getItem('User_id');
        var headers = {
          Authorization: `Bearer ${JSON.parse(token)}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        let data = JSON.stringify({
          "user_ID": "1"
        });
        
        let config = {
          method: 'post',
          headers:headers,
          url: BASE_URL+'items/get_items_by_user',
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data.result));
          setMyItems(response.data.result)
        })
        .catch((error) => {
          console.log(error);
        });
       };
         useEffect(() => {
          GetMyItems()
         }, []);
  const renderItem = ({item}) => {
    return (
      <SellCard
        image={item.image}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        description={item.description}
        onpress={() => {
          navigation.navigate('CategoryItem', {
            listing_id: item.id,
            categoryname: item.title,
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
            onPress={
              () => navigation.navigate('UploadItem')
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sell;
