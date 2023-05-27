import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';

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

import Lightbox from 'react-native-lightbox-v2';
import Colors from '../../../utills/Colors';

const Home = ({navigation}) => {
  ///////redux states/////////
  const dispatch = useDispatch();

  //////////loader state/////
  const [isLoading, setLoading] = useState(false);
  /////////////Get Screen Logo/////////////
  const [dashboard_logo, setDashboardLogo] = useState([]);
  const GetDashboardLogo = useCallback(async () => {
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
        screen_id: '3',
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response here in logos : ', response);
        setDashboardLogo(response.result[0].image)
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [dashboard_logo]);


  /////////////Get Stories/////////////
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
        screen_id: '3',
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setDashboardStories(response.result)
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [dashboard_stories]);

  /////////////Get Items/////////////
  const [dashboard_items, setDashboardItems] = useState('');

  const GetDashboardItems = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'POST',
      url: BASE_URL + 'items/get_all_items',
      body: {},
    })
      .then(async function (response) {
        if (response.data.status === true) {
          setLoading(false);
          setCount(1)
          setDashboardItems(response.data.result);
        } else {
          <NoDataFound title={'No data here'} />;
          setLoading(false);
          setCount(1)
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [dashboard_items]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if(count===0)
    {
      setLoading(true);
    }

    GetDashboardItems();
    GetDashboardStories();
    GetDashboardLogo()
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
  const [isLarge, setIsLarge] = useState(false);
  const storyrenderItem = ({item}) => {
    return (
      <View style={{}}>
        <Lightbox
          activeProps={{resizeMode: 'contain'}}
          onLongPress={()=>setIsLarge(true)}
          //longPressGapTimer={500}
          //onClose={()=>setIsLarge(false)}
          onOpen={()=>setIsLarge(true)}
          willClose={()=>setIsLarge(false)}
          >
          {isLarge === true?
          <View style={{alignContent:'center',justifyContent:'center'}}>

                         <Image
               source={{
                 uri:
                   BASE_URL +item.image,
               }}
               style={ styles.imageLarge}
               resizeMode= 'cover'
             />
               <TouchableOpacity onPress={()=>Linking.openURL(item.link)}>
               <Text style={styles.Visit_btn}>Visit</Text>
               </TouchableOpacity>

          </View>

             :
             <>
                     <View style={styles.imageroundview}>
          <Image
             source={{
               uri:
               BASE_URL +item.image,
             }}
             style={ styles.image}
             resizeMode= 'cover'
           />
             </View>
                           <Text style={styles.stories_user}>Username</Text>
             </>
   
             }
    
        </Lightbox>
      </View>
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
          right_logo={BASE_URL+ dashboard_logo}
        />
        <FlatList
          data={dashboard_stories}
          horizontal={true}
          renderItem={storyrenderItem}
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
