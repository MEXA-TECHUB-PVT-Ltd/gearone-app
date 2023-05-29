import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  Text
} from 'react-native';

////////////naviagtion///////////////
import { useIsFocused } from '@react-navigation/native';

/////////////////firebase all users//////////////
//import firestore from '@react-native-firebase/firestore';

//////////////////////app components///////////////
import Header from '../../../components/Header/Header';
import CustomModal from '../../../components/Modal/CustomModal';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';

/////////////////app images///////////
import {appImages} from '../../../constant/images';

//////////////list dta///////////////
import { chatlist_data } from '../../../App_dummy_App/data/Chatlist_data';

const ChatList = ({navigation}) => {
  //////redux variable//////////
  const dispatch = useDispatch();
  const join_as_guest=useSelector(state => state.auth.join_as_guest)
  
  /////////navigation variable/////////////
  const isFocused = useIsFocused();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

////////////////loading/////////////
const [loading, setloading] = useState(true);

  /////////////main menu status states/////////////
  const [Orders, setOrders] = useState('');
  const GetOrders = async () => {
    var user= await AsyncStorage.getItem('Userid')
    axios({
      method: 'GET',
      url: BASE_URL + 'api/driver/searchOrder/'+user,
    })
      .then(async function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const[data,setData]=useState()

  useEffect(() => {
    if (isFocused && join_as_guest) {
      setModalVisible(true)
       // You can customize the a message as per your needs
     }
      //firebase_all_users()
      console.log('User dta here : ', data);
  }, [isFocused]);


  ///////////////////firebase all users///////////////
  // const firebase_all_users=()=>{
  //   const userList = [];
  //   firestore()
  // .collection('Users')
  // .get()
  // .then(querySnapshot => {
  //   console.log('Total users: ', querySnapshot.size);
  //   //console.log('Total users: ', querySnapshot.data());
  //   querySnapshot.forEach(documentSnapshot => {
  //     const user_data=documentSnapshot.data()
  //     userList.push(user_data);
  //     setData(userList)
  //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
  //   });
  // });
  // }

   ///////////////////flatlist render item///////////////
   const renderitem=({item})=>{
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ChatScreen",{navtype:"chatlist",
      userid:item.id})}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              // alignItems: "center",
              marginBottom: wp("3%"),
              alignItems:'center'
            }}
          >
            <View style={{}}>
              <Image
                source={item.user_image}
                style={{width:wp(15),height:hp(8)}}
                resizeMode="contain"
              />
            </View>

            <View style={{ marginLeft:wp(2),marginTop:hp(1),width:wp(65)}}>
                <Text
                  style={styles.user_name_txt}
                >
                  {item.user_name}
                </Text>
              <Text style={[styles.detailtxt, { color: "#7A8FA6" }]}>
                {item.detail}
              </Text>
            </View>
        
          </View>
          <View style={{}}>
            <Text style={[styles.timetxt, { color: "#7A8FA6" }]}>
             {item.time}
            </Text>
          </View>
      
        </View>
        </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={styles.container}>

<Header
          title={'Messages'}
          left_icon={'chevron-back-sharp'}
          type={'withoutlogo'}
          left_iconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={{marginTop:hp(3)}}>
        <FlatList
         data={chatlist_data}
         renderItem={renderitem}
         keyExtractor={(item, index) => index.toString()}
         scrollEnabled={true}
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
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

export default ChatList;
