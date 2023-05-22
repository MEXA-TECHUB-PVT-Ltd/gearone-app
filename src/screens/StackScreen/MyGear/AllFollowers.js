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

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      username: 'Item Name',
      price: '45',
      image: require('../../../assets/dummyimages/image_1.png'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      username: 'Item Name',
      price: '45',
      image: require('../../../assets/dummyimages/image_2.png'),
    },
    {
      id: '58694a0f-3dhjk8a1-471f-bd96-145571e29d72',
      title: 'Item Name',
      price: '45',
      image: require('../../../assets/dummyimages/image_3.png'),
    },
    {
      id: 'bd7acbea-c1b781-46c2-aed5-3ad53abb28ba',
      username: 'Item Name',
      price: '45',
      image: require('../../../assets/dummyimages/image_4.png'),
    },
    {
      id: '3ac68afc-c6bjj705-48d3-a47344f8-fbd91aa97f63',
      username: 'Item Name',
      price: '45',
      image: require('../../../assets/dummyimages/image_5.png'),
    },
    {
      id: '58694a0f-3d78ga1-471f-bdhhffh696-145571e29d72',
      username: 'Item Name',
      price: '45',
      image: require('../../../assets/dummyimages/image_6.png'),
    },
  ];

const AllFollowers = ({navigation, route}) => {
  /////////////Get Notification/////////////
  const [myposts, setMyPosts] = useState('');

  const GetAllFollowers = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'POST',
      url: BASE_URL + 'follow/get_followers',
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
          title={'Followers'}
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

export default AllFollowers;
