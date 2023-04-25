import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';

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

const MyPosts = ({navigation,route}) => {
  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={item.image}
        maintext={item.title}
        subtext={item.location}
        price={item.price}
        onpress={() => {
          navigation.navigate('MainListingsDetails', {
            listing_id: item.id,
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
          title={'My Posts'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />

        <FlatList
          data={DATA}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPosts;
