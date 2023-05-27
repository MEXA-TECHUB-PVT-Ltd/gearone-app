import React, {useEffect, useState, useCallback} from 'react';
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
import {setItemDetail} from '../../../redux/ItemSlice';

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
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  /////////////Get Notification/////////////
  const [dashboard_stories, setDashboardStories] = useState([]);
  const GetDashboardStories = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'ads/get_ads_by_screen', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        screen_id: '1',
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response here in stories : ', response);
        //setDashboardStories(response.result)
        const outputArray = response.result.map(item => ({
          user_id: item.id + 1,
          user_image: item.image
            ? `${BASE_URL + item.image}`
            : 'path_to_placeholder_image',
          user_name: 'Ad name',
          stories: [
            {
              story_id: item.id,
              story_image: item.image
                ? `${BASE_URL + item.image}`
                : 'path_to_placeholder_image',
              swipeText: 'Custom swipe text for this story',
              onPress: () => console.log(`story ${item.id} swiped`),
            },
          ],
        }));

        console.log('heree====', outputArray);
        setDashboardStories([...dashboard_stories, outputArray]);
        console.log('response after set in stories : ', dashboard_stories);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [dashboard_stories]);

  const GetDashboardStories11 = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'POST',
      url: BASE_URL + 'ads/get_ads_by_screen',
      body: {
        screen_id: '1',
      },
    })
      .then(async function (response) {
        //console.log('here stories data',response.data)
        if (response.data.status === true) {
          setDashboardStories(response.data.result);
          setLoading(false);
        } else {
          <NoDataFound title={'No data here'} />;
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [dashboard_items]);

  /////////////Get Notification/////////////
  const [dashboard_items, setDashboardItems] = useState('');

  const GetDashboardItems = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'POST',
      url: BASE_URL + 'items/get_all_items',
      body: {},
    })
      .then(async function (response) {
        console.log('here iem data,', response.data.result);
        if (response.data.status === true) {
          // setDashboardItems(page === 1 ? dashboard_items : [ ...dashboard_items,response.data.result],)
          setLoading(false);
          // setRefreshing(false)
          setDashboardItems(response.data.result);
        } else {
          <NoDataFound title={'No data here'} />;
          setLoading(false);
          setRefreshing(false);
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [dashboard_items]);

  const handleEndReached = () => {
    if (!isLoading) {
      // Increment the page count and fetch the next page of data
      setPage(page + 1);
      GetDashboardItems();
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    GetDashboardItems();
  };
  useEffect(() => {
    setLoading(true);
    GetDashboardItems();
    GetDashboardStories();
  }, []);

  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={BASE_URL + item.images[0]}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        images_array_length={item.images.length}
        onpress={() => {
          dispatch(setItemDetail({id: item.id, navplace: 'Home'}));
          navigation.navigate('ItemDetails', {
            Item_id: item.id,
          });
        }}
      />
    );
  };
  const storyrenderItem = ({item}) => {
    return (
      <Lightbox navigator={navigator}>
        <Image
          style={{height: 300}}
          source={{
            uri: 'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg',
          }}
        />
        <Text style={{color: 'black'}}>Visit here</Text>
      </Lightbox>
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
        <FlatList
          data={dashboard_items}
          horizontal={true}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true} // Unmount components when outside of window
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
        {/* <InstaStory
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
        /> */}
        <View style={styles.bottomlineview}></View>
        <FlatList
          data={dashboard_items}
          numColumns={3}
          inverted
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true} // Unmount components when outside of window
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          // onEndReached={()=>handleEndReached()}
          // onEndReachedThreshold={0.5} // Configure the threshold as needed
          // refreshing={refreshing}
          // onRefresh={()=>onRefresh()}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
