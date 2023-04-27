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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Lorem ipsum',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Lorem ipsum',
  },
  {
    id: '58694a0f-3dhjk8a1-471f-bd96-145571e29d72',
    title: 'Lorem ipsum Lorem ipsum',
  },
  {
    id: 'bd7acbea-c1b781-46c2-aed5-3ad53abb28ba',
    title: 'Lorem ipsum',
  },
  {
    id: '3ac68afc-c6bjj705-48d3-a47344f8-fbd91aa97f63',
    title: 'Lorem ipsum',
  },
  {
    id: '58694a0f-3d78ga1-471f-bdhhffh696-145571e29d72',
    title: 'Lorem ipsum',
  },
];

const Search = ({navigation}) => {
   ///////////////post search state////////////
   const [search, setSearch] = useState();
   const renderItem = ({item}) => {
    return (
<View style={{ marginLeft: 10, marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Chip
                closeIcon={'close'}
                color={'#E6E6E6'}
                onClose={() => {
                    // deleteSelectedElement(id, name)
                    const filteredData = dayDescription.filter(item => item.id !== id);
                    setdayDescription(filteredData);
                }}
                style={{backgroundColor:'#444444'}}>
                <Text style={{ color: '#E6E6E6', fontSize: hp(1.6)}}>
             {item.title}
                </Text>
            </Chip>
        </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'Search'}
          headertype={'header_without_text'}
        />
              <View style={{alignSelf: 'center', marginBottom: hp(2)}}>
        <Image
          source={require('../../../assets/dummyimages/Search_banner.png')}
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
<FlatList
          data={DATA}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
