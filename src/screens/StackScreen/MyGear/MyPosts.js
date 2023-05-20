import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';

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

const MyPosts = ({navigation,route}) => {
     /////////////Get Notification/////////////
     const [myposts, setMyPosts] = useState('');

     const GetMyPosts = async () => {
      var user_id = await AsyncStorage.getItem('User_id');
       console.log('order request function', user_id);
       axios({
         method: 'POST',
         url: BASE_URL + 'items/get_items_by_user',
         body:
         {
          user_ID:user_id
         }
       })
         .then(async function (response) {
           console.log('list data here ', response.data.result);
           setMyPosts(response.data.result);
         })
         .catch(function (error) {
           console.log('error', error);
         });
     };
       useEffect(() => {
        GetMyPosts()
         
       }, []);

  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={item.image}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        onpress={() => {
          navigation.navigate('MainListingsDetails', {
            listing_id: item.id,
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
