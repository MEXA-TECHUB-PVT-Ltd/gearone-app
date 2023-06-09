import React, {useEffect, useState, useCallback,useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

//////////////paper//////////////////
import {Chip} from 'react-native-paper';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import SearchTextInput from '../../../components/TextInput/SearchInput';

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

////////screeen id//////////////
import ScreensNames from '../../../data/ScreensNames';

const Search = ({navigation}) => {
  /////////////Get Screen Logo/////////////
  const [ad, setAd] = useState();
  const GetAd = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'ads/get_active_ads_by_screen', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        screen_id: ScreensNames.Search_Screen,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setAd(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [ad]);

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
        screen_id: ScreensNames.Search_Screen,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);

  /////////store in async/////////
  const [dataArray, setDataArray] = useState([]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count === 0) {
      getDataArray();
    }
    getDataArray();
  }, []);

  const getDataArray = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('dataArray');
      const retrievedArray = jsonValue != null ? JSON.parse(jsonValue) : [];
      //const reversedArray = retrievedArray.reverse();
      setDataArray(retrievedArray);
      setCount(1);
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  const storeDataArray = async () => {
    try {
      const jsonValue = JSON.stringify(dataArray);
      await AsyncStorage.setItem('dataArray', jsonValue);
    } catch (error) {
      console.log('Error storing data:', error);
    }
  };

  const addDataToArray = () => {
    const newItem = search;
    const updatedArray = [ newItem,...dataArray];
    setDataArray(updatedArray);
  };
  const removeItem = index => {
    const updatedArray = dataArray.filter(
      (item, itemIndex) => itemIndex !== index,
    );
    setDataArray(updatedArray);
  };
  ///////////////post search state////////////
  const [search, setSearch] = useState();

  useEffect(() => {
    GetLogo();
    GetAd();
  }, []);

  const searchResult_navigate = () => {
    storeDataArray();
    addDataToArray();
    navigation.navigate('SearchResults', {search_data: search});
  };

  const deleteArrayDataFromAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const arrayDataKeys = keys.filter(key => key.startsWith('dataArray'));
      await AsyncStorage.multiRemove(arrayDataKeys);
      setDataArray([]);
    } catch (error) {
      console.log('Error deleting array data from async storage:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        >
        <Header
          title={'Search'}
          headertype={'header_without_text'}
          right_logo={logo}
        />
        <View style={{alignSelf: 'center', marginBottom: hp(2)}}>
          {ad === null ? null : (
            <Image
              source={{uri: BASE_URL + ad}}
              style={{width: wp(90), height: hp(22),borderRadius:hp(1.5)}}
              resizeMode="cover"
            />
          )}
        </View>

        <SearchTextInput
          term={search}
          placeholder="Search Here"
          onTermChange={searchhere => setSearch(searchhere)}
          searchiconpress={() => searchResult_navigate()}
          onSubmitEditing={searchResult_navigate}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp(5),
            marginTop: hp(3),
          }}>
          <Text style={styles.horizontal_lefttext}>Recent</Text>
          <TouchableOpacity onPress={() => deleteArrayDataFromAsyncStorage()}>
            <Text style={styles.horizontal_righttext}>Clear All</Text>
          </TouchableOpacity>
        </View>
        {dataArray.length === 0 ? (
          <Text style={[styles.horizontal_righttext, {left: wp(5)}]}>
            No Recent data available
          </Text>
        ) : (
//           <ScrollView
//           horizontal
//           contentContainerStyle={{ flexDirection: 'row',width:wp(90) }}
//           showsHorizontalScrollIndicator={false}>
//             {
//           dataArray.map((search, index) => (
//             <View
//             style={{
//               marginLeft: 10,
//               marginTop: 10,
//               alignItems: 'center',
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}>
//             <Chip
//               closeIcon={'close'}
//               color={'#E6E6E6'}
//               onClose={() => {
//                 removeItem(index);
//               }}
//               style={{backgroundColor: '#444444'}}>
//               <Text style={{color: '#E6E6E6', fontSize: hp(1.6)}}>{search}</Text>
//             </Chip>
//           </View>
//         ))
// }
//           </ScrollView>
<View style={styles.map_container}>
{dataArray.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
        <Chip
          closeIcon={'close'}
          color={'#E6E6E6'}
          onClose={() => {
            removeItem(index);
          }}
          style={{backgroundColor: '#444444'}}>
          <Text style={{color: '#E6E6E6', fontSize: hp(1.6)}}>{item}</Text>
        </Chip>
      </View>
  ))}
</View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
