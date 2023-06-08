import React, {useEffect, useState, useRef,useCallback} from 'react';
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

////////////////screen id////////////////
import ScreensNames from '../../../data/ScreensNames';

const AllFollowers = ({navigation, route}) => {

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
            screen_id: ScreensNames.MyGear_Screen,
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
  const [myposts, setMyPosts] = useState('');
  const [myposts_error, setMyPostsError] = useState("");
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  const GetAllFollowers = async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var user_id = await AsyncStorage.getItem('User_id');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
      user_ID: user_id,
      page:page
    });

    let config = {
      method: 'post',
      headers: headers,
      url: BASE_URL + 'follow/get_followers',
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setCount(1)
        setMyPostsError(JSON.stringify(response.data.status) )
          setMyPosts(
            page === 1
              ? response.data.result
              : [...myposts, ...response.data.result])
         

      })
      .catch(error => {
        console.log(error);
      });
  };

  const Followings = async (props) => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var user_id = await AsyncStorage.getItem('User_id');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
      follow_by_user_ID:user_id,
      user_ID:props
    });

    let config = {
      method: 'post',
      headers: headers,
      url: BASE_URL + 'follow/follow_user',
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setCount(1)
        setMyPostsError(JSON.stringify(response.data.status) )
          setMyPosts(
            page === 1
              ? response.data.result
              : [...myposts, ...response.data.result])
         

      })
      .catch(error => {
        console.log(error);
      });
  };
  const[count,setCount]=useState(0)
  useEffect(() => {
    if(count === 0)
    {
      GetAllFollowers();
    }
    GetLogo()
  }, []);

  const renderItem = ({item}) => {
    return (
      <FollowCard
      userimage={ item.user_image}
        username={item.username}
        btn_text={'Follow'}
        btn_press={()=>Followings(item.user_id)}
        onpress={() => {
          navigation.navigate('MainListingsDetails', {
            listing_id: item.id,
          });
        }}
      />
    );
  };

  const handleLoadMore = () => {
    setPage(page+1);
    setRefreshing(true)
    GetAllFollowers();
    setRefreshing(false)
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
          right_logo={logo}
        />
        <View style={{marginTop:hp(3)}}>
        <FlatList
          data={myposts}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AllFollowers;
