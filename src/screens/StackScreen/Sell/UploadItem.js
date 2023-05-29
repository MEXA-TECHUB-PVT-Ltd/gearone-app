import React, {useEffect, useState, useRef,useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import CustomTextInput from '../../../components/TextInput/CustomTextInput';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomModal from '../../../components/Modal/CustomModal';
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';
import Gender_DropDowns from '../../../components/DropDowns/Gender_DropDowns';

////////////////app pakages////////////
import {Snackbar} from 'react-native-paper';

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

/////////////svg///////////
import UploadIcon from '../../../assets/svgs/upload_icon.svg';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setItemDetail} from '../../../redux/ItemSlice';

////////////screen id//////////////
import ScreensNames from '../../../data/ScreensNames';

const UploadItem = ({navigation}) => {
  ////////////redux////////////
  const dispatch = useDispatch();
  /////////////reducer value////////////
  const item_images_array = useSelector(
    state => state.imagesArray.item_images_array,
  );
  const gender = useSelector(state => state.gender);

  ///////array limit////////
  const maxIndex = 5;

  //camera and imagepicker
  const refRBSheet = useRef();

  ////DROPDOWNS//////////
  const refRBGenderDDSheet = useRef();

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  //////////////data states//////////
  const [Item_name, setItemName] = useState('');
  const [Item_price, setItemPrice] = useState('');
  const [Item_location, setItemLocation] = useState('');
  const [Item_description, setItemDescription] = useState('');

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

        useEffect(() => {
          GetLogo()
        }, []);

  /////////////image array/////////
  const post_Item_Images = async props => {
    const formData = new FormData();
    formData.append('id', props);
    //formData.append("images",item_images_array);
    if (item_images_array?.length > 0) {
      for (let i = 0; i < item_images_array?.length; i++) {
        let url = item_images_array[i];
        var filename = url?.split('/')?.pop();
        let obj = {
          uri: url,
          name: filename,
          type: 'image/jpeg',
        };
        console.log(obj);
        formData.append(`images`, obj);
      }
    }

    return fetch(BASE_URL + 'items/add_item_images', {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.text())
      .then(
        resulthere => console.log('image data', resulthere),

        // dispatch(setItemDetail(result.result[0].id, result.result[0].name)),
        setloading(0),
        setdisable(0),
        setModalVisible(true),
      );
  };

  //////////////Api Calling////////////////////
  const CreateItem = async () => {
    const user_id = await AsyncStorage.getItem('User_id');
    console.log('here user id', user_id);
    var token = await AsyncStorage.getItem('JWT_Token');
    const currentDate = new Date();
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'application/json',
    };
    // var raw = JSON.stringify({
    //   user_ID: user_id,
    //   name: Item_name,
    //   price: Item_price,
    //   category_id: gender.value,
    //   description: Item_description,
    //   location: Item_location,
    //   promoted: 'false',
    //   start_date: currentDate,
    //   end_date: currentDate,
    //   added_by: 'user',
    // });

    // var requestOptions = {
    //   method: 'POST',
    //   headers: headers,
    //   body: raw,
    //   redirect: 'follow',
    // };

    // fetch(
    //   BASE_URL+'items/add_items',
    //   requestOptions,
    // )
    //   .then(response => response.text())
    //   .then(response => {
    //     console.log('here item data', response.result);
    //     dispatch(setItemDetail({id:response.result[0].id, navplace: 'login_user_items'}));
    //     post_Item_Images(response.result[0].id);
    //   })
    //   .catch(error => console.log('error', error));
    let data = JSON.stringify({
      user_ID: user_id,
      name: Item_name,
      price: Item_price,
      category_id: gender.value,
      description: Item_description,
      location: Item_location,
      promoted: 'false',
      start_date: currentDate,
      end_date: currentDate,
      added_by: 'user',
     });

    let config = {
      method: 'POST',
      url: BASE_URL + 'items/add_items',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios
      .request(config)
      .then(response => {
        console.log('here item data', response.data);
        dispatch(setItemDetail({id:response.data.result[0].id, navplace: 'login_user_items'}));
        post_Item_Images(response.data.result[0].id);
      })
      .catch(error => {
        console.log(error);
      });
  };
  //Api form validation
  const formValidation = async () => {
    // input validation
    if (Item_name == '') {
      setsnackbarValue({value: 'Please Enter Item Name', color: 'red'});
      setVisible('true');
    } else if (Item_price == '') {
      setsnackbarValue({value: 'Please Enter Item Price', color: 'red'});
      setVisible('true');
    } else if (Item_location == '') {
      setsnackbarValue({value: 'Please Enter Location', color: 'red'});
      setVisible('true');
    } else if (gender.name == 'Select Category') {
      setsnackbarValue({value: 'Please Select Category', color: 'red'});
      setVisible('true');
    } else if (Item_description == '') {
      setsnackbarValue({value: 'Please Enter Description', color: 'red'});
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
      CreateItem();
    }
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          marginVertical: hp(4),
          borderWidth: hp(0.3),
          borderColor: 'grey',
          borderRadius: wp(2),
          marginHorizontal: wp(1),
        }}>
        <Image
          source={{uri: item}}
          style={{height: hp(10), width: wp(20), borderRadius: wp(2)}}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'UploadItem'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />
        <FlatList
          data={item_images_array.slice(0, maxIndex)}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={() => {
                if (item_images_array.length > maxIndex) {
                  setsnackbarValue({
                    value: 'You can only pick up to 5 images.',
                    color: 'red',
                  });
                  setVisible('true');
                } else {
                  // Perform additional logic to load more data if needed
                  refRBSheet.current.open();
                }
              }}>
              <View style={{alignSelf: 'center', marginVertical: hp(4)}}>
                <UploadIcon width={wp(20)} height={hp(11)} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={styles.textinput_title}>Item Name</Text>
        </View>
        <CustomTextInput
          type={'withouticoninput'}
          term={Item_name}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          //placeholder="Enter Username"
          onTermChange={text => setItemName(text)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={styles.textinput_title}>Item Price</Text>
        </View>
        <CustomTextInput
          onRef={ref_input2}
          type={'withouticoninput'}
          term={Item_price}
          returnType={'next'}
          onNext={() => {
            ref_input3.current.focus();
          }}
          //placeholder="Enter Username"
          onTermChange={text => setItemPrice(text)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={styles.textinput_title}>Location</Text>
        </View>
        <CustomTextInput
          onRef={ref_input3}
          type={'withouticoninput'}
          term={Item_location}
          returnType={'next'}
          onNext={() => {
            ref_input4.current.focus();
          }}
          //placeholder="Enter Username"
          onTermChange={text => setItemLocation(text)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={styles.textinput_title}>Category</Text>
        </View>
        <TouchableOpacity onPress={() => refRBGenderDDSheet.current.open()}>
          <CustomTextInput
            dopdownicon={'chevron-down'}
            type={'dropdowniconinput'}
            //term={Item_category}
            term={gender.name}
            editable={false}
            disable={false}
            placeholder="Select Category"
            onTermChange={text => setItemCategory(text)}
          />
        </TouchableOpacity>

        <View style={{marginLeft: wp(12)}}>
          <Text style={styles.textinput_title}>Description</Text>
        </View>
        <CustomTextInput
          onRef={ref_input4}
          type={'withouticoninput'}
          texterror={'invalid'}
          term={Item_description}
          multiline={true}
          //placeholder="Description"
          onTermChange={text => setItemDescription(text)}
        />
        <View style={{marginBottom: hp(8)}}>
          <CustomButtonhere
            title={'Upload Item'}
            widthset={80}
            topDistance={5}
            loading={loading}
            disabled={disable}
            onPress={() => formValidation()}
          />
        </View>
        <CustomModal
          modalVisible={modalVisible}
          text={'Success'}
          btn_text={'Go to Home'}
          subtext={'Item Uploaded Successfully'}
          type={'single_btn'}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('ItemDetails');
          }}
        />
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={'From Gallery'}
          type={'multiplepic'}
        />
        <Gender_DropDowns
          refRBSheet={refRBGenderDDSheet}
          onClose={() => refRBGenderDDSheet.current.close()}
        />
        <Snackbar
          duration={600}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(12),
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadItem;
