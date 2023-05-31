import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';
import Loader from '../../../components/Loader/Loader';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////redux///////////
import {useDispatch, useSelector} from 'react-redux';
import {setItemDetail} from '../../../redux/ItemSlice';

////////story package//////////
import Lightbox from 'react-native-lightbox-v2';

/////////////screen id////////////
import ScreensNames from '../../../data/ScreensNames';

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
        screen_id: ScreensNames.Dashboard_Screen,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setDashboardLogo(response.result[0].image);
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
        setDashboardStories(response.result);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [dashboard_stories]);

  ///////////data states/////////
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1); // Reset page to 1 when refreshing
    fetchData().then(() => setRefreshing(false));
  };

  /////////////Get Items/////////////
  const [dashboard_items, setDashboardItems] = useState([]);

  const GetDashboardItems = useCallback(async () => {
    console.log('here page', page);
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    let data = JSON.stringify({
      page: page,
    });

    let config = {
      method: 'post',
      url: BASE_URL + 'items/get_all_items',
      headers: headers,
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status === true) {
          setLoading(false);
          setCount(1);
          var recent_data = response.data.result;
          var newArray = recent_data.concat(dashboard_items);
          setDashboardItems(newArray);

          if (response.data.result[0].promoted ===true )
          {
            const images=images[0]
          }
        } else {
          <NoDataFound title={'No data here'} />;
          setLoading(false);
          setCount(1);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [dashboard_items]);
  useEffect(() => {
    GetDashboardItems();
  }, [page]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count === 0) {
      setLoading(true);
    }

    GetDashboardItems();
    GetDashboardStories();
    GetDashboardLogo();
  }, []);
  const Refresh = () => {
    setPage(page + 1);
    // clearproductlist(page);
    setRefresh(true);
    GetDashboardItems();
    setRefresh(false);
  };
  useEffect(() => {
    if (refreshing && refreshing) {
      Refresh();
      console.log('i run');
    }
  }, [refreshing]);
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
          onLongPress={() => setIsLarge(true)}
          //longPressGapTimer={500}
          //onClose={()=>setIsLarge(false)}
          onOpen={() => setIsLarge(true)}
          willClose={() => setIsLarge(false)}>
          {isLarge === true ? (
            <View style={{alignContent: 'center', justifyContent: 'center'}}>
              <Image
                source={{
                  uri: BASE_URL + item.image,
                }}
                style={styles.imageLarge}
                resizeMode="cover"
              />
              <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                <Text style={styles.Visit_btn}>Visit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.imageroundview}>
                <Image
                  source={{
                    uri: BASE_URL + item.image,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.stories_user}>Username</Text>
            </>
          )}
        </Lightbox>
      </View>
    );
  }
  
  const data = [
    {
      id: 'header',
      number:1,
      column1: 'Header 1',
      column2: 'Header 2',
      image: require('../../../App_dummy_App/dummy_images/hairstyle_1.png'),
    },
    {
      id: 1,
      number:2,
      column1: 'Row 1 - Column 1',
      column2: 'Row 1 - Column 2',
      type: true,
      image: require('../../../App_dummy_App/dummy_images/myprofile_user.png'),
      image1: require('../../../App_dummy_App/dummy_images/hairstyle_2.png'),
      image2: require('../../../App_dummy_App/dummy_images/user_1.png'),
    },
    {
      id: 'header',
      number:3,
      column1: 'Header 1',
      column2: 'Header 2',
      image: require('../../../App_dummy_App/dummy_images/hairstyle_2.png'),
    },

    //   { id: 2, column1: 'Row 2 - Column 1', column2: 'Row 2 - Column 2'  ,
    //   type:true,
    //  // image:require('../../../App_dummy_App/dummy_images/hairstyle_4.png')
    //  },
    {
      id: 'header',
      number:4,
      column1: 'Header 1',
      column2: 'Header 2',
      image: require('../../../App_dummy_App/dummy_images/user_1.png'),
    },
    {
      id: 'header',
      number:5,
      column1: 'Header 1',
      column2: 'Header 2',
      image: require('../../../App_dummy_App/dummy_images/user_1.png'),
    },
  ];

  // Merge the two rows with two columns
  const mergedRow = {
    id: 'merged',
    column1: `${data[1].image} ${data[2].image}`,
    column2: data[1].image + data[2].image,
  };
  data.push(mergedRow);

    // Modify the data to include the next index item as the first item
    const modifiedData = data.map((item, index) => {
      const nextIndex = (index + 1) % data.length;
      return {
        id: item.id,
        title: `${item.title} (Next: ${data[nextIndex].title})`,
      };
    });
    
  // Render function for each item in the list
  const merge_renderItem = ({item,index}) => {
    if (item.id ==='header') {
      return (
        <View style={{flexDirection: 'row', backgroundColor: 'green'}}>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'red',
              margin: 2,
            }}>
            {item.number+index+1}
          </Text>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              textAlign: 'center',
              margin: 1,
              backgroundColor: 'purple',
            }}>
            {item.number+index}
          </Text>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              textAlign: 'center',
              margin: 1,
              backgroundColor: 'orange',
            }}>
            {item.number+index}
          </Text>
        </View>
      );
    } else if (item.type === true) {
      return (
        <View style={{flexDirection: 'row', backgroundColor: 'red'}}>
       
          {/* <Text style={{ flex: 0.7, textAlign: 'center',backgroundColor:'red',width:'80%',marginRight:2 }}>{item.column1}</Text> */}
          <Image
            source=  {item.image}
            style={{height: 170, width: 274}}
            resizeMode="cover"
          />
                       <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'red',
              margin: 2,
              position:'absolute',
              top:50,
              left:50
            }}>
            {item.number}
          </Text>
          <View>
            <Image
              source=  {item.image}
              style={{height: 80, width: 134, margin: 2}}
              resizeMode="cover"
            />
                               <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'red',
              margin: 2,
              position:'absolute',
              top:50,
              left:50
            }}>
            {item.number}
          </Text>
          <View>
          <Image
              source=  {item.image}
              style={{height: 80, width: 134, margin: 2}}
              resizeMode="cover"
            />
                               <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'red',
              margin: 2,
              position:'absolute',
              top:50,
              left:50
            }}>
            {item.number}
          </Text>
          </View>
    
            {/* <Text style={{ flex: 0.5, textAlign: 'center',margin:2,backgroundColor:'yellow',color:'black',width:'119%'  }}>{item.image}</Text> */}
            {/* <Text style={{ flex: 0.5, textAlign: 'center',margin:2,backgroundColor:'yellow',color:'black',width:'119%'   }}>{item.column2}</Text> */}
          </View>
        </View>
      );
    } else {
      <View style={{flexDirection: 'row'}}>
        {/* <Text style={{ flex: 1, textAlign: 'center',backgroundColor:'red' }}>{item.column1}</Text> */}

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            margin: 1,
            backgroundColor: 'yellow',
            color: 'black',
          }}>
          {item.column2}
        </Text>
      </View>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={isLoading} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }>
        <Header
          title={'Home'}
          left_icon={'menu'}
          left_iconPress={() => {
            navigation.toggleDrawer();
          }}
          right_logo={BASE_URL + dashboard_logo}
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
          onEndReachedThreshold={0.7}
          estimatedItemSize={50}
          onEndReached={() => GetDashboardItems()}
          refreshing={refresh}
          onRefresh={() => Refresh()}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />

        <View style={styles.bottomlineview}></View>

        <FlatList
          data={modifiedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={merge_renderItem}
        />
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
