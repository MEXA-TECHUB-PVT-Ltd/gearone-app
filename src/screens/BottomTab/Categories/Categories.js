import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity
} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';
import CategoryCard from '../../../components/CustomCards/Categories/Categories';

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

/////////screen id/////////////
import ScreensNames from '../../../data/ScreensNames';

import BrickList from 'react-native-masonry-brick-list';

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Category 1',
    price: '45',
    image: require('../../../assets/dummyimages/image_1.png'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Category 1',
    price: '45',
    image: require('../../../assets/dummyimages/image_2.png'),
  },
  {
    id: '58694a0f-3dhjk8a1-471f-bd96-145571e29d72',
    title: 'Category 1',
    price: '45',
    image: require('../../../assets/dummyimages/image_3.png'),
  },
  {
    id: 'bd7acbea-c1b781-46c2-aed5-3ad53abb28ba',
    title: 'Category 1',
    price: '45',
    image: require('../../../assets/dummyimages/image_4.png'),
  },
  {
    id: '3ac68afc-c6bjj705-48d3-a47344f8-fbd91aa97f63',
    title: 'Category 1',
    price: '45',
    image: require('../../../assets/dummyimages/image_5.png'),
  },
  {
    id: '58694a0f-3d78ga1-471f-bdhhffh696-145571e29d72',
    title: 'Category 1',
    price: '45',
    image: require('../../../assets/dummyimages/image_6.png'),
  },
];

const Categories = ({navigation}) => {

    ///////////data states/////////
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [ads, setAds] = useState(0);
  
    const [refreshing, setRefreshing] = React.useState(false);

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
        setLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);

  /////////////Get Categories/////////////

  const [span_array, setSpanArray] = useState([]);
  const[count,setCount]=useState(0)

  const GetCategories = useCallback(async () => {
    setCount(count+1)
    console.log("in page ads",ads,page)
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
      page: page,
      AdsOffset: ads,
    });

    let config = {
      method: 'Get',
      url: BASE_URL + 'category/get_all_category',
      headers: headers,
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log('response here in maintttt', response.data.result);
        if (response.data.status === true) {
          setAds(response.data.InpageAds)
          // setLoading(false);
          // setCount(1);
          // var recent_data = response.data.result;
          // var newArray = recent_data.concat(dashboard_items);
var idhere=0
          // Create a new array by mapping over the original data and adding the 'span' attribute
          const updatedData = response.data.result.map(item => ({
            ...item,
            id:idhere+1,
            span: item.type === 'ad' ? 3 : 3/2,
            color: item.type === 'ad' ? 'red' : 'yellow',
          }));
          setSpanArray(page === 1 ? updatedData : [span_array,...updatedData ]);
          //setSpanArray(updatedData);
         // console.log('here data in update one', updatedData);
          //setCategories(response.data.result);

          // const adItems = data.filter((item) => item.type === 'ad');
          // setCategories_Ad(adItems);
          // const otherItems = data.filter((item) => item.type !== 'ad');
          // setCategories(otherItems);
        } else {
          <NoDataFound title={'No data here'} />;
          setLoading(false);
          setCount(1);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [span_array]);

  useEffect(() => {
    GetLogo();
    if(count ===0)
    {
      GetCategories();
    }

  }, []);

  const renderView = prop => {
    if (prop.type === 'ad') {
      return (
        // <TouchableOpacity onPress={()=>{}
        
        // }>
        <View
          style={{alignSelf: 'center', marginVertical: hp(2)}}
          key={prop.index}>
          <Image
            source={{uri: BASE_URL + prop.image}}
            style={{width: wp(85), height: hp(20)}}
            resizeMode="contain"
          />
        </View>
        // </TouchableOpacity>

      );
    } else {
      return (
        <TouchableOpacity onPress={()=>{ 
                   navigation.navigate('CategoryItem', {
          category_id: prop.id,
          category_name:prop.name
        }) }}
        style={{alignSelf:'center'}}
      >
        <CategoryCard
          image={{uri: BASE_URL+prop.image}}
          maintext={prop.name}
          subtext={prop.location}
          price={prop.price}
          onpress={() => {
            navigation.navigate('CategoryItem', {
              category_id: prop.id,
              category_name:prop.name
            });
          }}
        /></TouchableOpacity>

      );
    }
  };



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const Refresh = () => {
    setPage(page + 1);
    // clearproductlist(page);
    setRefresh(true);
    GetCategories();
    setRefresh(false);
  };
  useEffect(() => {
    if (refreshing && refreshing) {
      Refresh();
      console.log('i run');
    }
  }, [refreshing]);

  const handleLoadMore = () => {
    setRefreshing(false)
    setPage(page+1);
    GetCategories();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => handleLoadMore()}
        //   />
        // }
        >
        <Header
          title={'Categories'}
          // left_icon={'chevron-back-sharp'}
          // left_iconPress={() => {
          //   navigation.goBack();
          // }}
          right_logo={BASE_URL + logo}
        />
        <BrickList
          data={span_array}
          renderItem={prop => renderView(prop)}
          columns={3}
          rowHeight={185}
          onEndReached={handleLoadMore}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;
