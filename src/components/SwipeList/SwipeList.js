import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';

/////////////navigation////////////
import {useNavigation} from '@react-navigation/native';

///////swipe list package/////////////////
import {SwipeListView} from 'react-native-swipe-list-view';

////////components//////////////
import HairStylesCards from '../CustomCards/HairStyles/HairStylesCard';
import CustomModal from '../Modal/CustomModal';

////////////height and width/////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////redux//////////
import {useSelector, useDispatch} from 'react-redux';
import {fetchApiData} from '../../redux/api/Specific_Hairstyle_apiSlice';

//////////async//////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////////icons////////////////////
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SwipeList = props => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();

  ////////navigation/////////
  const navigation = useNavigation();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  ///////////deleete id////////////
  const [hairstle_id, sethairstyle_id] = useState();
  /////////////////image api calling///////////////
  const delete_Hairstyle = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log('data isd here', hairstle_id);
    let config = {
      method: 'delete',
      url:
        BASE_URL +
        'hairStyle/deleteHairStyle?hair_style_id=' +
        hairstle_id +
        '&current_user_id=' +
        user_id,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        GetHairstyles();
      })
      .catch(error => {
        console.log(error);
      });
  };
  ///////////////hairstyle data////////////
  const GetHairstyles = async () => {
    const user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    // Define custom headers to be sent with the API request
    const headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      // Add other custom headers as needed
    };

    // Dispatch the fetchApiData action with headers on component mount
    dispatch(
      fetchApiData({
        endpoint:
          'hairStyle/getAllHairStyles?barber_id=' +
          user_id +
          '&current_user_id=' +
          user_id,
        headers,
      }),
    );
  };

  const renderItem = ({item}) => {
    return (
      <HairStylesCards
        //hairstyle_image={item.hairstyle_image}
        hairstyle_name={item.title}
        //hairstyle_press={() => refRBViewHairstyleSheet.current.open()}
      />
    );
  };
  return (
    <>
      <SwipeListView
        data={props.list_data}
        renderItem={renderItem}
        scrollEnabled={false}
        // disableLeftSwipe={true}
        disableRightSwipe={true}
        keyExtractor={(item, index) => index}
        renderHiddenItem={(item, rowMap) => (
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                right: wp(3),
                height: hp(10.5),
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingRight: wp(3),
                paddingTop: hp(1.5),
              }}>
              <View
                style={{
                  borderColor: '#DFDFDF',
                  borderWidth: wp(0.3),
                  borderRadius: wp(4),
                  height: hp(10),
                  width: wp(18),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UpdateHairStyles', item)}>
                  <MaterialCommunityIcons
                    name="refresh"
                    color={'#27CCE6'}
                    size={25}
                    onPress={() =>
                      navigation.navigate('UpdateHairStyles', item)
                    }
                  />
                </TouchableOpacity>

                <View
                  style={{
                    borderColor: '#DFDFDF',
                    borderBottomWidth: wp(0.3),
                    width: wp(15),
                    alignSelf: 'center',
                    marginBottom: hp(1),
                    marginTop: hp(1),
                  }}></View>
                <TouchableOpacity
                  onPress={() => {
                    sethairstyle_id(item.item),
                      //delete_Hairstyle(item.item.hairstyle_id)
                      setModalVisible(true);
                  }}>
                  <MaterialCommunityIcons
                    name="delete"
                    color={'red'}
                    size={25}
                    onPress={() => {
                      sethairstyle_id(item.item.hairstyle_id),
                        //delete_Hairstyle(item.item.hairstyle_id)
                        setModalVisible(true);
                    }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-105}
      />
      <CustomModal
        modalVisible={modalVisible}
        text={'Confirmation'}
        subtext={'Do you really want to delete this Hairstyle?'}
        onPress_yes={() => {
          setModalVisible(false);
          delete_Hairstyle();
        }}
        onPress_cancel={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};
export default SwipeList;
