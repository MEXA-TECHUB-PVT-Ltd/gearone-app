import React, {useEffect, useState, useCallback } from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';
import Loader from '../../../components/Loader/Loader';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';

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

///////////////////stories///////////////
import InstaStory from 'react-native-insta-story';

/////////////////redux///////////
import {useDispatch} from 'react-redux';
import { setItemDetail } from '../../../redux/ItemSlice';

const data = [
  {
    user_id: 1,
    user_image:
      'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
    user_name: 'Ad name',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Ad name',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
];

const Home = ({navigation}) => {
  ///////redux states/////////
  const dispatch = useDispatch();

  //////////loader state/////
  const [isLoading,setLoading]=useState(false)
    /////////////Get Notification/////////////
    const [dashboard_stories, setDashboardStories] = useState('');
    const GetDashboardStories =useCallback( async () => {
      var user_id = await AsyncStorage.getItem('User_id');
      var token = await AsyncStorage.getItem('JWT_Token');
      var headers = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      await fetch( BASE_URL + 'ads/get_ads_by_screen', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          screen_id:"1"
        }),
      })
        .then(response => response.json())
        .then(async response => {
          console.log('response  : ', response);
          setDashboardStories(response.result)
        })
        .catch(error => {
          console.log('Error  : ', error);
        });
    }, [dashboard_stories]);

    const GetDashboardStories11 = useCallback( async () => {
      var user_id = await AsyncStorage.getItem('User_id');
      axios({
        method: 'POST',
        url: BASE_URL + 'ads/get_ads_by_screen',
        body: {
          screen_id:"1"
        },
      })
        .then(async function (response) {
          console.log('here stories data',response.data)
  if(response.data.status === true)
  {
    setDashboardStories(response.data.result);
    setLoading(false)
  }else{
    <NoDataFound title={'No data here'}/>
    setLoading(false)
  }
  
        })
        .catch(function (error) {
          console.log('error', error);
        });
      },[dashboard_items])

  /////////////Get Notification/////////////
  const [dashboard_items, setDashboardItems] = useState('');

  const GetDashboardItems = useCallback( async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'POST',
      url: BASE_URL + 'items/get_all_items',
      body: {},
    })
      .then(async function (response) {
if(response.data.status === true)
{
  setDashboardItems(response.data.result);
  setLoading(false)
}else{
  <NoDataFound title={'No data here'}/>
  setLoading(false)
}

      })
      .catch(function (error) {
        console.log('error', error);
      });
    },[dashboard_items])
  useEffect(() => {
    setLoading(true)
    GetDashboardItems();
    GetDashboardStories()
  }, []);

  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={
          item.image === []
            ? require('../../../assets/dummyimages/image_1.png')
            : BASE_URL + item.image
        }
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        onpress={() => {
          dispatch(setItemDetail(item.id, item.name));
          navigation.navigate('ItemDetails', {
            Item_id: item.id,
          });

        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
        <Loader isLoading={isLoading} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'Home'}
          left_icon={'menu'}
          left_iconPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <InstaStory
          data={dashboard_stories}
          duration={10}
          onStart={item => console.log(item)}
          onClose={item => console.log('close: ', item)}
          showAvatarText={true}
          avatarTextStyle={styles.stories_user}
          customSwipeUpComponent={
            <View>
              <Text>Swipe</Text>
            </View>
          }
          style={{marginTop: 16}}
        />
        <View style={styles.bottomlineview}></View>
        <FlatList
          data={dashboard_items}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
