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

////////////icon///////////
import Ionicons from 'react-native-vector-icons/Ionicons';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';
import Loader from '../../../components/Loader/Loader';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import DashboardIrregularCard from '../../../components/CustomCards/Dashboard/DasboardIrregularCard';

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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Home = ({navigation}) => {
  ///////redux states/////////
  const dispatch = useDispatch();

   /////////////Get Items/////////////
   const [dashboard_items, setDashboardItems] = useState([]);
   const [dashboard_error_status, setDashboardErrorStatus] = useState(false);

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
  const [dashboard_stories_error_status, setDashboardStoriesErrorStatus] =
    useState(false);
  const GetDashboardStories = useCallback(async () => {
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
        page: '1',
      }),
    })
      .then(response => response.json())
      .then(async response => {
        if (response.status === true) {
          setLoading(false);
          setCount(1);
          setDashboardStories(
            page === 1
              ? response.result
              : [...dashboard_stories, ...response.result],
          );
        } else {
          setDashboardStoriesErrorStatus(true);
          setLoading(false);
          setCount(1);
        }
        //setDashboardStories(response.result);

        console.log("Response", dashboard_stories)
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [dashboard_stories]);

  ///////////data states/////////
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);

  const [refreshing, setRefreshing] = React.useState(false);

 

  const GetDashboardItems = useCallback(async () => {
    //console.log(page);
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
          console.log("response", response.data.result)
          setDashboardItems(
            page === 1
              ? response.data.result
              : [...dashboard_items, ...response.data.result],
          );
        } else {
          console.log("not getting response", response.data.result)
          setDashboardErrorStatus(true);
          setLoading(false);
          setCount(1);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [dashboard_items]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count === 0) {
      setLoading(true);
      GetDashboardItems();
    }
    GetDashboardStories();
    GetDashboardLogo();

  }, [page]);
  const [visitedItemIndex, setVisitedItemIndex] = useState(null);

  const handleVisit = (index, link) => {
    setVisitedItemIndex(index);
    Linking.openURL(link);
  };
  const [isLarge, setIsLarge] = useState(false);
  const storyrenderItem = ({item, index}) => {
    
    return (
      
      <View style={{}}>
       {console.log("Key", item)}
        <Lightbox
          activeProps={{resizeMode: 'contain'}}
          onLongPress={() => setIsLarge(true)}
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
              <TouchableOpacity onPress={() => handleVisit(index, item.link)}>
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
              <Text style={styles.stories_user}>
                {item.ad_name === null ? 'ad-name' : item.ad_name}
              </Text>
            </>
          )}
        </Lightbox>
      </View>
    );
  };

  const on_nav = prop => {
    dispatch(
      setItemDetail({
        id: prop,
        navplace: 'dashboard_items',
      }),
    ),
      navigation.navigate('ItemDetails');
  };

  const renderItem_two = ({item, index}) => {
  {console.log("showing", item[0])}
    return (
      <View>
        {item[0]?.promoted === 'true' ||
        item[1]?.promoted === 'true' ||
        item[2]?.promoted === 'true' ? (
          <View
            style={{
              flexDirection: 'row',
              marginBottom: hp(0.5),
            }}>
            {item[0]?.promoted === 'true' ? (
              <>
                <TouchableOpacity onPress={() => on_nav(item[0].id)}>
                    <DashboardIrregularCard
                    image={BASE_URL + item[0]?.images[0]}
                    images_array_length={item[0]?.images.length}
                    maintext={item[0]?.name}
                    subtext={item[0]?.location}
                    price={item[0]?.price}
                    type="horizontal"
                    onpress={() => {
                      dispatch(
                        setItemDetail({
                          id: item[0]?.id,
                          navplace: 'dashboard_Items',
                        }),
                      ),
                        navigation.navigate('ItemDetails');
                    }}
                  />
                </TouchableOpacity>

                <View>
                  <TouchableOpacity onPress={() => on_nav(item[1].id)}>
                      <DashboardIrregularCard
                        image={BASE_URL + item[1]?.images[0]}
                        images_array_length={item[1]?.images.length}
                        maintext={item[1]?.name}
                        subtext={item[1]?.location}
                        price={item[1]?.price}
                        onpress={() => {
                          dispatch(
                            setItemDetail({
                              id: item.id,
                              navplace: 'dashboard_Items',
                            }),
                          ),
                            navigation.navigate('ItemDetails');
                        }}
                      />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity onPress={() => on_nav(item[2].id)}>
                        <DashboardIrregularCard
                          image={BASE_URL + item[2]?.images[0]}
                          images_array_length={item[2]?.images.length}
                          maintext={item[2]?.name}
                          subtext={item[2]?.location}
                          price={item[2]?.price}
                          onpress={() => {
                            dispatch(
                              setItemDetail({
                                id: item[2]?.id,
                                navplace: 'dashboard_Items',
                              }),
                            ),
                              navigation.navigate('ItemDetails');
                          }}
                        />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : item[1]?.promoted === 'true' ? (
              <>
                <View>
                  <TouchableOpacity onPress={() => on_nav(item[2].id)}>
                      <DashboardIrregularCard
                        image={BASE_URL + item[2]?.images[0]}
                        images_array_length={item[2]?.images.length}
                        maintext={item[2]?.name}
                        subtext={item[2]?.location}
                        price={item[2]?.price}
                        onpress={() => {
                          dispatch(
                            setItemDetail({
                              id: item[2]?.id,
                              navplace: 'dashboard_Items',
                            }),
                          ),
                            navigation.navigate('ItemDetails');
                        }}
                      />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity onPress={() => on_nav(item[0].id)}>
                        <DashboardIrregularCard
                          image={BASE_URL + item[0]?.images[0]}
                          images_array_length={item[0]?.images.length}
                          maintext={item[0]?.name}
                          subtext={item[0]?.location}
                          price={item[0]?.price}
                          onpress={() => {
                            dispatch(
                              setItemDetail({
                                id: item[0]?.id,
                                navplace: 'dashboard_Items',
                              }),
                            ),
                              navigation.navigate('ItemDetails');
                          }}
                        />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => on_nav(item[1].id)}>
                    <DashboardIrregularCard
                    image={BASE_URL + item[0]?.images[0]}
                    images_array_length={item[0]?.images.length}
                    maintext={item[0]?.name}
                    subtext={item[0]?.location}
                    price={item[0]?.price}
                    type="horizontal"
                    onpress={() => {
                      dispatch(
                        setItemDetail({
                          id: item[0]?.id,
                          navplace: 'dashboard_Items',
                        }),
                      ),
                        navigation.navigate('ItemDetails');
                    }}
                  />
           
                </TouchableOpacity>
              </>
            ) : item[2]?.promoted === 'true' ? (
              <>
                <View>
                  <TouchableOpacity onPress={() => on_nav(item[1].id)}>
                      <DashboardIrregularCard
                        image={BASE_URL + item[1]?.images[0]}
                        images_array_length={item[1]?.images.length}
                        maintext={item[1]?.name}
                        subtext={item[1]?.location}
                        price={item[1]?.price}
                        onpress={() => {
                          dispatch(
                            setItemDetail({
                              id: item[1]?.id,
                              navplace: 'dashboard_Items',
                            }),
                          ),
                            navigation.navigate('ItemDetails');
                        }}
                      />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity onPress={() => on_nav(item[0].id)}>
                 
                        <DashboardIrregularCard
                          image={BASE_URL + item[0]?.images[0]}
                          images_array_length={item[0]?.images.length}
                          maintext={item[0]?.name}
                          subtext={item[0]?.location}
                          price={item[0]?.price}
                          onpress={() => {
                            dispatch(
                              setItemDetail({
                                id: item[0]?.id,
                                navplace: 'dashboard_Items',
                              }),
                            ),
                              navigation.navigate('ItemDetails');
                          }}
                        />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => on_nav(item[2].id)}>
                <DashboardIrregularCard
                    image={BASE_URL + item[2]?.images[0]}
                    images_array_length={item[2]?.images.length}
                    maintext={item[2]?.name}
                    subtext={item[2]?.location}
                    price={item[2]?.price}
                    type="horizontal"
                    onpress={() => {
                      dispatch(
                        setItemDetail({
                          id: item[2]?.id,
                          navplace: 'dashboard_Items',
                        }),
                      ),
                        navigation.navigate('ItemDetails');
                    }}
                  />
            
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        ) : (
          <FlatList
            data={item}
            horizontal={true}
            scrollEnabled={false}
            keyExtractor={(item, index) => index}
            renderItem={renderItemrow_cards}
            // renderItem={({item}) => (
            //   <View
            //     style={{
            //       alignItems: 'center',
            //       justifyContent: 'center',
            //       alignSelf: 'center',
            //       width: wp(31),
            //       marginHorizontal: wp(1),
            //     }}>
            //     <TouchableOpacity onPress={() => on_nav(item.id)}>
            //       {item.images.length === 0 ? (
            //         <Ionicons
            //           name={'image'}
            //           color={'grey'}
            //           size={hp(15)}
            //           style={{alignSelf: 'center'}}
            //         />
            //       ) : (
            //         <Image
            //           source={{uri: BASE_URL + item?.images[0]}}
            //           style={{height: hp(15), width: wp(32)}}
            //           resizeMode="cover"
            //         />
            //       )}
            //     </TouchableOpacity>
            //   </View>
            // )}
          />
        )}
      </View>
    );
  };

  const renderItemrow_cards = ({item}) => {
    return (
      <DashboardCard
        image={BASE_URL + item.images[0]}
        images_array_length={item.images.length}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        type={'dashboard_card'}
        onpress={() => {
          dispatch(
            setItemDetail({
              id: item.id,
              navplace: 'dashboard_Items',
            }),
          ),
            navigation.navigate('ItemDetails');
        }}
      />
    );
  };
  const handleLoadMore = () => {
    setRefreshing(false);
    setPage(page + 1);
    setRefresh(true);
    GetDashboardItems();
    setRefresh(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      {console.log("storyStatus", dashboard_stories)}
     
      <Loader isLoading={isLoading} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleLoadMore()}
          />
        }>
        <Header
          title={'Home'}
          left_icon={'menu'}
          left_iconPress={() => {
            navigation.toggleDrawer();
          }}
          right_logo={dashboard_logo}
        />
        {dashboard_stories_error_status === true ? (
          <NoDataFound icon={'exclamation-thick'} text={'No Data Found'} />
        ) : (
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
            onEndReached={handleLoadMore}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
        <View style={styles.bottomlineview}>
        
        </View>
        {dashboard_error_status === true ? (
          
          <NoDataFound icon={'exclamation-thick'} text={'No Data Found'} />
          
        ) : (

//dashboard_items[0]
           <FlatList
            data={Object.values(dashboard_items)}
            scrollEnabled={false}
            keyExtractor={(item, index) => index}
            renderItem={renderItem_two}
            onEndReached={handleLoadMore}
            refreshing={refresh}
          /> 
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
