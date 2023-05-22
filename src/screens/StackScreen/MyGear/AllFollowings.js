import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import FollowCard from '../../../components/CustomCards/FollowCards/FollowCard';

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

const AllFollowings = ({navigation, route}) => {
  /////////////Get Notification/////////////
  const [myposts, setMyPosts] = useState('');

  const GetAllFollowers = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'POST',
      url: BASE_URL + 'follow/get_followings',
      body: {
        user_ID: user_id,
      },
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
    GetAllFollowers();
  }, []);

  const renderItem = ({item}) => {
    return (
      <FollowCard
      userimage={ item.user_image}
        username={item.username}
        btn_text={'Follow'}
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
          title={'Followings'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={{marginTop:hp(3)}}>
        <FlatList
          data={myposts}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AllFollowings;
