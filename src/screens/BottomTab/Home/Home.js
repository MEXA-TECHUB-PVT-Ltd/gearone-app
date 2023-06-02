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
import {heightPercentageToDP} from 'react-native-responsive-screen';

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
        page:"1"
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
    console.log(page)
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
        console.log('here data of items', response.data);
        if (response.data.status === true) {
          setLoading(false);
          setCount(1);

          // var recent_data = response.data.result;
          // var filteredDashboardItems = dashboard_items.filter((item) => {
          //   // Filter out items that already exist in recent_data
          //   return recent_data.some((recentItem) => recentItem.id === item.id);
          // });
          // var newArray = recent_data.concat(filteredDashboardItems);
          // var arary_length1 = newArray.length;
          //  /console.log(' newArray array length', newArray,page);
          setDashboardItems(
            page === 1
              ? response.data.result
              : [...dashboard_items, ...response.data.result],
          );
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
  // useEffect(() => {
  //   GetDashboardItems();
  // }, [page]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count === 0) {
      setLoading(true);
      GetDashboardItems();
    }
    GetDashboardStories();
    GetDashboardLogo();
  }, [page]);
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
    console.log(item)
    return (
      <View>
        {item[0]?.promoted === 'true' ||
        item[1]?.promoted === 'true' ||
        item[2]?.promoted === 'true' ? (
          <View
            style={{
              flexDirection: 'row',
              marginBottom: heightPercentageToDP(0.5),
            }}>
            {item[0]?.promoted === 'true' ? (
              <>
                <TouchableOpacity onPress={() => on_nav(item[0].id)}>
                  <Image
                    source={{uri: BASE_URL + item[0]?.images[0]}}
                    style={{height: 170, width: 280}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <View>
                  <TouchableOpacity
                    onPress={() =>  on_nav(item[1].id)}>
                    <Image
                      source={{uri: BASE_URL + item[1]?.images[0]}}
                      style={{height: 82, width: 134, margin: 1}}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setItemDetail({
                            id: item[2].id,
                            navplace: 'dashboard_Items',
                          }),
                        ),
                          navigation.navigate('ItemDetails');
                      }}>
                      <Image
                        source={{uri: BASE_URL + item[2]?.images[0]}}
                        style={{height: 82, width: 134, margin: 1}}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : item[1]?.promoted === 'true' ? (
              <>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setItemDetail({
                          id: item[2].id,
                          navplace: 'dashboard_Items',
                        }),
                      ),
                        navigation.navigate('ItemDetails');
                    }}>
                    <Image
                      source={{uri: BASE_URL + item[2]?.images[0]}}
                      style={{height: 82, width: 134, margin: 1}}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setItemDetail({
                            id: item[0].id,
                            navplace: 'dashboard_Items',
                          }),
                        ),
                          navigation.navigate('ItemDetails');
                      }}>
                      <Image
                        source={{uri: BASE_URL + item[0]?.images[0]}}
                        style={{height: 82, width: 134, margin: 1}}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      setItemDetail({
                        id: item[1].id,
                        navplace: 'dashboard_Items',
                      }),
                    ),
                      navigation.navigate('ItemDetails');
                  }}>
                  <Image
                    source={{uri: BASE_URL + item[1]?.images[0]}}
                    style={{height: 170, width: 274}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </>
            ) : item[2]?.promoted === 'true' ? (
              <>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setItemDetail({
                          id: item[1].id,
                          navplace: 'dashboard_Items',
                        }),
                      ),
                        navigation.navigate('ItemDetails');
                    }}>
                    <Image
                      source={{uri: BASE_URL + item[1]?.images[0]}}
                      style={{height: 82, width: 134, margin: 1}}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setItemDetail({
                            id: item[0].id,
                            navplace: 'dashboard_Items',
                          }),
                        ),
                          navigation.navigate('ItemDetails');
                      }}>
                      <Image
                        source={{uri: BASE_URL + item[0]?.images[0]}}
                        style={{height: 82, width: 134, margin: 1}}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      setItemDetail({
                        id: item[2].id,
                        navplace: 'dashboard_Items',
                      }),
                    ),
                      navigation.navigate('ItemDetails');
                  }}>
                  <Image
                    source={{uri: BASE_URL + item[2]?.images[0]}}
                    style={{height: 170, width: 274}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </>
            ) : 
            <>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setItemDetail({
                          id: item[1].id,
                          navplace: 'dashboard_Items',
                        }),
                      ),
                        navigation.navigate('ItemDetails');
                    }}>
                    <Image
                      source={{uri: BASE_URL + item[1]?.images[0]}}
                      style={{height: 82, width: 134, margin: 1}}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setItemDetail({
                            id: item[0].id,
                            navplace: 'dashboard_Items',
                          }),
                        ),
                          navigation.navigate('ItemDetails');
                      }}>
                      <Image
                        source={{uri: BASE_URL + item[0]?.images[0]}}
                        style={{height: 82, width: 134, margin: 1}}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      setItemDetail({
                        id: item[2].id,
                        navplace: 'dashboard_Items',
                      }),
                    ),
                      navigation.navigate('ItemDetails');
                  }}>
                  <Image
                    source={{uri: BASE_URL + item[2]?.images[0]}}
                    style={{height: 170, width: 274}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </>}
          </View>
        ) : (
          <FlatList
            data={item}
            horizontal={true}
            scrollEnabled={false}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() => on_nav(item.id)}>
                  <Image
                    source={{uri: BASE_URL + item?.images[0]}}
                    style={{height: 150, width: 140}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    );
  };
  const handleLoadMore = () => {
    setRefreshing(false)
    setPage(page+1);
    GetDashboardItems();
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
          // onEndReached={() => GetDashboardItems()}
          // refreshing={refresh}
          // onRefresh={() => Refresh()}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
        <View style={styles.bottomlineview}></View>
        <FlatList
          data={dashboard_items}
          scrollEnabled={false}
          keyExtractor={(item, index) => index}
          renderItem={renderItem_two}
          onEndReached={handleLoadMore}
          refreshing={refresh}
          onRefresh={() => Refresh()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
