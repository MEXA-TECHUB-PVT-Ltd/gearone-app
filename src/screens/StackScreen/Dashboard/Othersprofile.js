import React, {useEffect, useState, useRef} from 'react';
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
import CustomModal from '../../../components/Modal/CustomModal';
import DashboardCard from '../../../components/CustomCards/Dashboard/DashboardCard';
import CustomButtonhere from '../../../components/Button/CustomButton';
import RattingBottomSheet from '../../../components/CustomBottomSheet/RattingBTS';

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

///////////////////icons///////////
import Icon from 'react-native-vector-icons/Ionicons';

/////////////colors////////////
import Colors from '../../../utills/Colors';

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

const OtherProfile = ({navigation}) => {

  //camera and imagepicker
  const refRBSheet = useRef();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}) => {
    return (
      <DashboardCard
        image={item.image}
        maintext={item.title}
        subtext={item.location}
        price={item.price}
        onpress={() => {
          navigation.navigate('ItemDetails', {
            Item_id: item.id,
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
          title={'Profile Details'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../assets/dummyimages/otherscover.png')}
            style={{width: wp(95), height: hp(25)}}
            resizeMode="contain"
          />
          <Image
            source={require('../../../assets/dummyimages/profile.png')}
            style={{
              width: wp(25),
              height: hp(12),
              borderRadius: wp(5),
              position: 'absolute',
              bottom: -30,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{alignItems: 'center', marginTop: hp(5)}}>
          <Text style={{color: 'white'}}>Username</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: hp(1.5),
            marginBottom: hp(1),
            //backgroundColor:"red",
            //   /width: wp(62),
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.verticleToptext}>456</Text>
            <Text
              style={styles.verticletext}
              onPress={() => navigation.navigate('Followers')}>
              Following
            </Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.verticleToptext}>234</Text>
            <Text
              style={styles.verticletext}
              onPress={() => navigation.navigate('Followings')}>
              Followers
            </Text>
          </View>
          <View style={styles.verticleLine}></View>
          <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Icon name={'star'} size={16} color={'#F7FF00'} />
              <Text style={[styles.verticleToptext,{marginLeft:wp(1)}]}>4.5</Text>
            </View>
            <TouchableOpacity
              style={{
                //backgroundColor: Colors.inactivetextinput,
                paddingVertical: hp(0.6),
                paddingHorizontal: wp(3),
                borderRadius: wp(5),
              }}>
              <Text style={styles.verticletext}>Ratting</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginLeft:wp(5),marginTop:hp(3)}}>
        <Text style={styles.verticleToptext}>Posts</Text>
        </View>
 
        <FlatList
          data={DATA}
          //numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
          horizontal={true}
        />
              <View style={{height:hp(10),marginBottom:hp(5)}}>
        <CustomButtonhere
          title={'Rate Profile'}
          widthset={80}
          topDistance={5}
          //loading={loading}
          //disabled={disable}
          onPress={() => refRBSheet.current.open()}
        />
      </View>
      </ScrollView>
            <RattingBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={"Rate Profile"}
        subtitle={"Enter Description"}
        btntext={"REPORT"}
        onpress={() => {
          {
          }
        }}
      />
    </SafeAreaView>
  );
};

export default OtherProfile;
