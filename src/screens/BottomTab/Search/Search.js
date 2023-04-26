import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList,Image} from 'react-native';

//////////////paper//////////////////
import { Chip } from 'react-native-paper';

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


const Search = ({navigation}) => {
   ///////////////post search state////////////
   const [search, setSearch] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'Search'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />
              <View style={{alignSelf: 'center', marginVertical: hp(2)}}>
        <Image
          source={require('../../../assets/dummyimages/banner_1.png')}
          style={{width: wp(90), height: hp(22)}}
          resizeMode="contain"
        />
      </View>
 
          <SearchTextInput
            term={search}
            placeholder="Search Here"
            onTermChange={(searchhere) => setSearch(searchhere)}
            searchiconpress={() => listing_Search(search)}
          />
<View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:wp(5),marginTop:hp(3)}}>
  <Text style={styles.horizontal_lefttext}>Recent</Text>
  <Text style={styles.horizontal_righttext}>Clear All</Text>
</View>
<Chip 
mode={'outlined'}
closeIcon
 onPress={() => console.log('Pressed')}>Example Chip</Chip>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
