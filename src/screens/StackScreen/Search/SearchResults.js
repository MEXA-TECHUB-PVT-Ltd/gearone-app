import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////redux///////////
import {useDispatch} from 'react-redux';
import {setItemDetail} from '../../../redux/ItemSlice';

//////////screeen id//////////////
import ScreensNames from '../../../data/ScreensNames';

const SearchResults = ({navigation, route}) => {
  ///////////redux variable////////
  const dispatch = useDispatch();

  ///////previous data/////////
  const[predata]=useState(route.params)

  //////////loader state/////
  const [isLoading, setLoading] = useState(false);
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
          screen_id:ScreensNames.Search_Screen,
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

        /////////////Get Screen Logo/////////////
        const [search_results, setSearchResults] = useState();
        const GetSearchResults = useCallback(async () => {
          var token = await AsyncStorage.getItem('JWT_Token');
          var headers = {
            Authorization: `Bearer ${JSON.parse(token)}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };
          await fetch(BASE_URL + 'items/search_items_by_name', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              name:predata.search_data
            }),
          })
            .then(response => response.json())
            .then(async response => {
              setSearchResults(response.items)
            })
            .catch(error => {
              console.log('Error  : ', error);
            });
        }, [search_results]);

  useEffect(() => {
    GetLogo()
    GetSearchResults()
  }, []);
  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={BASE_URL + item?.images[0]}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        images_array_length={item.images.length}
        onpress={() => {
          dispatch(setItemDetail({id: item.id, navplace: 'login_user_items'}));
          navigation.navigate('ItemDetails', {
            Item_id: item.id,
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
          title={'Search Reults'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />

        <FlatList
          data={search_results}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchResults;
