import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import SellCard from '../../../components/CustomCards/SellCards/SellCards';
import CustomButtonhere from '../../../components/Button/CustomButton';

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
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_2.png'),
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
  },
  {
    id: '58694a0f-3dhjk8a1-471f-bd96-145571e29d72',
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_3.png'),
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
  },
  {
    id: 'bd7acbea-c1b781-46c2-aed5-3ad53abb28ba',
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_4.png'),
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
  },
  {
    id: '3ac68afc-c6bjj705-48d3-a47344f8-fbd91aa97f63',
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_5.png'),
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
  },
  {
    id: '58694a0f-3d78ga1-471f-bdhhffh696-145571e29d72',
    title: 'Item Name',
    price: '45',
    image: require('../../../assets/dummyimages/image_6.png'),
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
  },
];
const Sell = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <SellCard
        image={item.image}
        maintext={item.title}
        subtext={item.location}
        price={item.price}
        description={item.desc}
        onpress={() => {
          navigation.navigate('CategoryItem', {
            listing_id: item.id,
            categoryname: item.title,
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
          title={'Sell'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          headertype={'header_without_text'}
        />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
        <View style={{marginBottom: hp(8)}}>
          <CustomButtonhere
            title={'Add Item'}
            widthset={80}
            topDistance={5}
            // loading={loading}
            // disabled={disable}
            onPress={
              () => navigation.navigate('UploadItem')
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sell;
