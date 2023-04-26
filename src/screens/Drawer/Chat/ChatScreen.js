import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  PermissionsAndroid,
  Text,
} from 'react-native';

///////////////import app components/////////////
import CamerBottomSheet from '../../../components/CameraBottomSheet/CameraBottomSheet';
import Header from '../../../components/Header/Header';

//////////////////app icons////////////////
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

////////////////app styles/////////////////////
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////app components///////////////////
import ChatHeader from '../../../components/Chat/ChatHeader';

///////////////////app Packages//////////////
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
} from 'react-native-gifted-chat';

//////////////furestore/////////////
import firestore from '@react-native-firebase/firestore';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL, IMAGE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////app images///////////////
import {appImages} from '../../../constant/images';
import Colors from '../../../utills/Colors';

////////////////////navigation//////////////////
import {useIsFocused} from '@react-navigation/native';

const ChatScreen = ({route, navigation}) => {

  const isFocused = useIsFocused();

  ////////////previos data//////////
  const [predata] = useState(route.params);

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();

  //////////////chat states/////////////
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  /////////////login user//////////
  const [login_user, setLoginUser] = useState('');

  /////////get login user//////////
  const getUserMessages = async () => {
    var user = await AsyncStorage.getItem('Userid');
    setLoginUser(user);
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const AllMessages = async () => {
    var user = '1';
    const doc_id =
      route.params.userid > '1'
        ? '1' + '-' + route.params.userid
        : route.params.userid + '-' + user;

    const messageRef = firestore()
      .collection('chats')
      .doc(doc_id)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docsnap => {
        const data = docsnap.data();
        if (data.createdAt) {
          return {
            ...docsnap.data(),
            createdAt: docsnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docsnap.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });
  };
  const ref = useRef();

  useEffect(() => {
    requestCameraPermission();
  }, [isFocused]);
  const onSend = useCallback((messages = []) => {
    handleSend(messages);
  }, []);
  const handleSend = async messageArray => {
    console.log('here chat message value array', messageArray);
    var user = await AsyncStorage.getItem('Userid');
    const docid =
      route.params.userid > user
        ? '1' + '-' + route.params.userid
        : route.params.userid + '-' + '1';

    let myMsg = null;
    const msg = messageArray[0];
    console.log('here chat message value', msg);
    myMsg = {
      ...msg,
      //text:text,
      //type: "image_text",
      senderId: '2',
      receiverId: route.params.userid,
      user: {
        _id: user,
        name: 'ali',
      },
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc(docid)
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    messages.forEach(message => {});
    AllMessages();
  };

  const handleImageUpload = useCallback(async (fileName, filePath) => {
    try {
      if (!fileName) return;
      // let fileName = file?.path?.split('/').pop();

      const uploadTask = storage().ref().child(fileName).putFile(filePath);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          // );
        },
        error => {
          // alert(error);
        },
        async () => {
          const url = await storage().ref(fileName).getDownloadURL();

          setImageUrl(url);
          //onSend(message)
          //handleSend(message, url, );
        },
      );
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const CustomInputToolbar = props => {
    return (
      <View
        style={{
          bottom: hp(3.5),
          height: hp(10),
          paddingBottom: hp(3),
          width:wp(100),
          alignItems:'center',
justifyContent:'center',
        }}>
        <InputToolbar
          {...props}
          containerStyle={{
            alignItems:'center',
           backgroundColor: '#F5F5F5',
            height: hp(6.5),
            borderColor: '#ccc',
            borderTopColor: '#ccc',
            borderWidth: 0.3,
            borderRadius: wp(4),
            marginLeft: wp(12),
            width: wp(75),
            //position: 'absolute',
            top: 0,
            left: wp(10),
            bottom: hp(1),
            marginTop: hp(0.5),
          }}
          textInputStyle={{color: 'black'}}
        />
      </View>
    );
  };

  const SendComponent = props => {
    return (
      <Send
        {...props}
        containerStyle={{
alignItems:'center',
justifyContent:'center',
marginRight:wp(2),
marginTop:hp(1),
        }}>
        <View
          style={{
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name={'send'}
            size={25}
            color={Colors.Appthemecolor}
            //onPress={() => Send()}
          />
        </View>
      </Send>
    );
  };
  const CustomBubbleText = props => {
    return (
      <View>
        <Text
          style={{
            color: '#fff',
            paddingHorizontal: wp(1),
            paddingVertical: 0,
            //fontWeight: "bold",
          }}>
          {props.currentMessage.text}
        </Text>
      </View>
    );
  };
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

      <GiftedChat
        alwaysShowSend
        renderInputToolbar={props => {
          return <CustomInputToolbar {...props} />;
        }}
        renderSend={props => {
          return <SendComponent {...props} />;
        }}
        messages={messages}
        onSend={text => {
          onSend(text);
        }}
        user={{
          _id: predata.userid,
        }}
        custontext={{}}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  color: Colors.Appthemecolor,
                  backgroundColor:
                    props.currentMessage.text != ''
                      ? Colors.Appthemecolor
                      : 'orange',
                  width: props.currentMessage.text != '' ? wp(80) : wp(70),
                  marginBottom: hp(1.2),
                  paddingTop: hp(2),
                  paddingHorizontal: wp(3),
                },
                left: {
                  color: Colors.Appthemecolor,
                  backgroundColor:
                    props.currentMessage.text != ''
                      ? Colors.inactivetextinput
                      : 'orange',
                  //width: props.currentMessage.text != "" ? wp(80) : wp(70),
                  marginBottom: hp(1.2),
                  paddingTop: hp(1),
                  paddingHorizontal: wp(2),
                },
              }}
            />
          );
        }}
        renderMessageText={props => {
          return <CustomBubbleText {...props} />;
        }}
      />
      <CamerBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={'From Gallery'}
        type={'Chat_image'}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
