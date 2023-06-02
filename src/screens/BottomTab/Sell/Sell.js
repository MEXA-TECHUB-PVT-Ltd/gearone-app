import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList,RefreshControl} from 'react-native';

////////////naviagtion///////////////
import { useIsFocused } from '@react-navigation/native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import SellCard from '../../../components/CustomCards/SellCards/SellCards';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomModal from '../../../components/Modal/CustomModal';

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

/////////////////redux///////////
import {useDispatch,useSelector} from 'react-redux';
import {setItemDetail} from '../../../redux/ItemSlice';

////////////screen id///////////////
import ScreensNames from '../../../data/ScreensNames';

const Sell = ({navigation}) => {
  //////redux variable//////////
  const dispatch = useDispatch();
  const join_as_guest=useSelector(state => state.auth.join_as_guest)
  console.log("here user status",join_as_guest)

  /////////navigation variable/////////////
  const isFocused = useIsFocused();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

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
            screen_id: ScreensNames.Sell_Screen,
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
  const [my_items, setMyItems] = useState();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  const GetMyItems =useCallback( async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var user_id = await AsyncStorage.getItem('User_id');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
      user_ID:user_id,
      page:page
    });

    let config = {
      method: 'post',
      headers: headers,
      url: BASE_URL + 'items/get_items_by_user',
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data.result));
        setMyItems(
          page === 1
            ? response.data.result
            : [...my_items, ...response.data.result],
        );
        //setMyItems(response.data.result);
      })
      .catch(error => {
        console.log(error);
      });
  }, [my_items]);
  useEffect(() => {
    if (isFocused && join_as_guest) {
     setModalVisible(true)
      // You can customize the a message as per your needs
    }
    GetMyItems();
    GetLogo()
  }, [isFocused]);


  const renderItem = ({item}) => {
    return (
      <SellCard
        image={BASE_URL+ item.images[0]}
        maintext={item.name}
        subtext={item.location}
        price={item.price}
        description={item.description}
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
  const handleLoadMore = () => {
    setPage(page+1);
    GetMyItems();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleLoadMore()}
          />
        }
        >
        <Header
          title={'Sell'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          headertype={'header_without_text'}
          right_logo={BASE_URL+logo}
        />
        <FlatList
          data={my_items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
          onEndReached={handleLoadMore}
          // refreshing={refresh}
          // onRefresh={() => Refresh()}
        />
              </ScrollView>
        <View style={{marginBottom: hp(8),position:'absolute',bottom:0,left:wp(10)}}>
          <CustomButtonhere
            title={'Add Item'}
            widthset={80}
            topDistance={5}
            // loading={loading}
            // disabled={disable}
            onPress={() => navigation.navigate('UploadItem')}
          />
        </View>

      <CustomModal
        modalVisible={modalVisible}
        onClose={()=>{setModalVisible(false), navigation.navigate('Home')}}
        text={'Alert'}
        btn_text={'Go to Login'}
        subtext={'Login First To See Content'}
        type={'single_btn'}
        guest={'confirmation'}
        onPress={() => {
          setModalVisible(false);
           navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
};

export default Sell;
