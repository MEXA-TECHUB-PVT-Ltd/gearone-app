import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import CustomTextInput from '../../../components/TextInput/CustomTextInput';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomModal from '../../../components/Modal/CustomModal';
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';

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
import UploadIcon from '../../../assets/svgs/upload_icon.svg'


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

const UploadItem = ({navigation}) => {

  //camera and imagepicker
  const refRBSheet = useRef();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  //////////////data states//////////
  const [Item_name, setItemName] = useState();
  const [Item_price, setItemPrice] = useState();
  const [Item_category, setItemCategory] = useState();
  const [Item_description, setItemDescription] = useState();


  const renderItem = ({item}) => {
    return (
        <TouchableOpacity
        onPress={() => refRBSheet.current.open()}>
 <View style={{alignSelf: 'center', marginVertical: hp(4)}}>
          <UploadIcon width={wp(25)} height={hp(11)} />
      </View>
      </TouchableOpacity>
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
        />
        {/* <View style={{alignSelf: 'center', marginVertical: hp(2)}}>
        <Image
          source={require('../../../assets/dummyimages/banner_1.png')}
          style={{width: wp(90), height: hp(22)}}
          resizeMode="contain"
        />
      </View> */}
      <FlatList
          data={DATA}
          //numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
          horizontal={true}
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
          type={'withouticoninput'}
          term={Item_price}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          //placeholder="Enter Username"
          onTermChange={text => setItemPrice(text)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={styles.textinput_title}>Category</Text>
        </View>
        <TouchableOpacity onPress={() => refRBGenderDDSheet.current.open()}>

            </TouchableOpacity>
        <CustomTextInput
             dopdownicon={'chevron-down'}
             type={'dropdowniconinput'}
          term={Item_category}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          placeholder="Select Category"
          onTermChange={text => setItemCategory(text)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={styles.textinput_title}>Description</Text>
        </View>
        <CustomTextInput
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
            // loading={loading}
            // disabled={disable}
            onPress={() => setModalVisible(true)}
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
            navigation.navigate('BottomTab');
          }}
        />
                <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={'From Gallery'}
          type={'onepic'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadItem;
