import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList,RefreshControl} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

///////////screen id///////////////
import ScreensNames from '../../../data/ScreensNames'

/////////////////redux///////////
import {useDispatch, useSelector} from 'react-redux';
import {setItemDetail} from '../../../redux/ItemSlice';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_1.png'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Item Name',
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
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_4.png'),
  },
  {
    id: '3ac68afc-c6bjj705-48d3-a47344f8-fbd91aa97f63',
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_5.png'),
  },
  {
    id: '58694a0f-3d78ga1-471f-bdhhffh696-145571e29d72',
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_6.png'),
  },
];

const CategoryItem = ({navigation,route}) => {

  /////redux//////////////
  const dispatch=useDispatch()

  ////////previous data////////
  const[predata]=useState(route.params)

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
         screen_id: ScreensNames.Categoriies_Screen,
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
  const [category_items, setCategoryItems] = useState();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  const GetCategoryItems =useCallback( async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
      category_ID:predata.category_id,
      page:page
    });

    let config = {
      method: 'post',
      headers: headers,
      url: BASE_URL + 'items/get_items_by_category',
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data.result));
        setCategoryItems(
          page === 1
            ? response.data.result
            : [...category_items, ...response.data.result],
        );
        //setMyItems(response.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }, [category_items]);
   useEffect(() => {
     GetLogo()
     GetCategoryItems()
   }, []);

   const handleLoadMore = () => {
    setPage(page+1);
    setRefreshing(true)
    GetCategoryItems();
    setRefreshing(false)
  };

  const renderItem = ({item}) => {
    return (
      <DashboardCard
      image={BASE_URL+ item.images[0]}
      images_array_length={item.images.length}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleLoadMore()}
          />
        }
        >
        <Header
          title={predata.category_name}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />

        <FlatList
          data={category_items}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
          onEndReached={handleLoadMore}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryItem;
