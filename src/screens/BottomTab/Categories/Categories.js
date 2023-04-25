import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
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
  const renderItem = ({item}) => {
    return (
      <CategoryCard
        image={item.image}
        maintext={item.title}
        subtext={item.location}
        price={item.price}
        onpress={() => {
          navigation.navigate('CategoryItem', {
            listing_id: item.id,categoryname:item.title
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
        title={'Categories'}
        // left_icon={'chevron-back-sharp'}
        // left_iconPress={() => {
        //   navigation.goBack();
        // }}
      />
      <View style={{alignSelf: 'center', marginVertical: hp(2)}}>
        <Image
          source={require('../../../assets/dummyimages/banner_1.png')}
          style={{width: wp(85), height: hp(20)}}
          resizeMode="contain"
        />
      </View>

      <View style={{alignSelf: 'center'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;
