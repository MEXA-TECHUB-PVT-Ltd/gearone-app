import React, {useState,useEffect} from 'react';
import { View, Text, SafeAreaView} from 'react-native';

///////////////app code fields/////////////
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

///////////////timer/////////////////////
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

/////////////////app components/////////////////
import CustomButtonhere from '../../components/Button/CustomButton';
import CustomModal from '../../components/Modal/CustomModal';

/////////////////////app styles/////////////////////
import Authstyles from '../../styles/Authstyles';
import Logostyles from '../../styles/Logostyles';
import styles from './styles';

////////////////height and width/////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////svgs/////////////
import Logo from '../../assets/svgs/Logo.svg'

///////////token function//////////
import { checkPermission } from '../../api/FCMToken';

/////////asyc////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////api//////////
import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';

///////////firebase auth/////////////
import auth from '@react-native-firebase/auth';

///////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setUserPhone_No, setUserId, setJWT_Token,setUserPhone_Country_Code} from '../../redux/AuthSlice';

const Verification = ({navigation, route}) => {

    ////////redux////////////
    const dispatch = useDispatch();
    const { } = useSelector(
      state => state.auth,
    );
  /////////////previous data state///////////////
  const [predata] = useState(route.params);

  console.log(predata)

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////timer state///////////////
  const [disabletimer, setdisableTimer] = useState(false);

  //////////time function//////////
  const children = ({remainingTime}) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };
  //code Confirmation states
  const [value, setValue] = useState();
  //cell number
  const CELL_COUNT = 6;

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //button states
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  //check OTP Code
  const verifyno = () => {
    setloading(1);
    if (predata.otp == value) {
      setloading(0);
      setModalVisible(true);
    } else {
      setModalVisible(true);
      setloading(0);
    }
  };

  // Handle login
  function onAuthStateChanged(user) {
    console.log("here user",user)
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  async function confirmCode() {
    const credential = auth.PhoneAuthProvider.credential(predata.code_confirmation,value);
    console.log("code",credential)
    const user=await auth().signInWithCredential(credential);
    console.log("user",user)
    //let userData = await auth().currentUser.linkWithCredential(credential);
    //setUser(userData.user);
    if (credential.secret == value) {
      setloading(0);
      setModalVisible(true);
    } else {
      setModalVisible(true);
      setloading(0);
    }
  }
    //////////////Api Calling////////////////////
    const SigUpUser = async () => {
   const device_id = await AsyncStorage.getItem('Device_id'); 
   console.log("here toke",device_id)
      axios({
        method: 'post',
        url: BASE_URL + 'auth/sign_up',
        data: {
          phone: predata.phone_number,
          country_code: predata.country_code,
          deviceToken:device_id
        },
      })
        .then(async function (response) {
          console.log('here id',response.data)
         if (response.data.status === true) {
            const string_id = response.data.result[0].id.toString();
            dispatch(setUserId(response.data.result[0].id));
            dispatch(setUserPhone_No(response.data.result[0].phone));
            dispatch(setUserPhone_Country_Code(response.data.result[0].country_code));
            dispatch(setJWT_Token(JSON.stringify(response.data.jwt_token)));
            await AsyncStorage.setItem('User_id', string_id);
            await AsyncStorage.setItem(
              'JWT_Token',
              JSON.stringify(response.data.token),
            );
            //await AsyncStorage.setItem('User_email', response.data.result.email);
            navigation.navigate('CreateProfile');
            //navigation.navigate('BottomTab');
            setloading(0);
            setdisable(0);
          //setModalVisible(true)
          } else {
            setloading(0);
            setdisable(0);
            SignInUser()
            //navigation.navigate('CreateProfile');
          }
        })
        .catch(function (error) {
          setloading(0);
          setdisable(0);
          if (error) {
            console.log('error', error);
          }
        });
    };

        //////////////Api Calling////////////////////
        const SignInUser = async () => {
          const device_id = await AsyncStorage.getItem('Device_id'); 
          console.log("here toke",device_id)
             axios({
               method: 'post',
               url: BASE_URL + 'auth/sign_in',
               data: {
                 phone: predata.phone_number,
                 country_code: predata.country_code,
                 deviceToken:device_id
               },
             })
               .then(async function (response) {
                 console.log('here id',response.data)
                if (response.data.status === true) {
                   const string_id = response.data.result[0].id.toString();
                   dispatch(setUserId(response.data.result[0].id));
                   dispatch(setUserPhone_No(response.data.result[0].phone));
                   dispatch(setUserPhone_Country_Code(response.data.result[0].country_code));
                   dispatch(setJWT_Token(JSON.stringify(response.data.jwt_token)));
                   await AsyncStorage.setItem('User_id', string_id);
                   await AsyncStorage.setItem(
                     'JWT_Token',
                     JSON.stringify(response.data.token),
                   );
                   navigation.navigate('Drawerroute');
                   setloading(0);
                   setdisable(0);
                 //setModalVisible(true)
                 } else {
                   setloading(0);
                   setdisable(0);
                   signI
                   //navigation.navigate('CreateProfile');
                 }
               })
               .catch(function (error) {
                 setloading(0);
                 setdisable(0);
                 if (error) {
                   console.log('error', error);
                 }
               });
           };

    useEffect(() => {
      checkPermission();
      //confirmCode()
    }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={[Logostyles.Logoview, {marginTop: hp(10)}]}>
      <Logo width={wp(45)} height={hp(11)} />
      </View>
      <View style={[Authstyles.textview, {marginBottom: hp(0)}]}>
        <Text style={Authstyles.maintext}>Verification</Text>
        <Text style={Authstyles.subtext}>
        Enter 6-digit code that you received on your phone number
        </Text>
      </View>
      <View style={styles.Cellview}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : '0')}
            </Text>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: wp(83),
          alignSelf: 'center',
          marginTop: hp(0.5),
        }}>
        <View style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
          {disabletimer == true ? (
            <CountdownCircleTimer
              size={40}
              strokeWidth={0}
              children={children}
              isPlaying
              duration={7}
              initialRemainingTime={15}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                setdisableTimer(false);
                // do your stuff here
                //return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
              }}>
              {({remainingTime}) => (
                <Text style={{color: 'black', fontSize: hp(2)}}>
                  {remainingTime}(s)
                </Text>
              )}
            </CountdownCircleTimer>
          ) : null}
        </View>
        {/* <TouchableOpacity
          disabled={disabletimer}
          onPress={() => setdisableTimer(true)}
          style={{marginLeft: wp(8)}}>
          <Text style={styles.Cellmaintext}>Resend Code</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.buttonview}>
        <CustomButtonhere
          title={'Submit'}
          widthset={80}
          topDistance={35}
          // loading={loading}
          // disabled={disable}
          onPress={() => 
            //confirmCode()
            SigUpUser()
          }
        />
      </View>
      <CustomModal
        modalVisible={modalVisible}
        text={'Success'}
        btn_text={'Go to Home'}
        subtext={'Account Verified Successfully'}
        type={'single_btn'}
        onPress={() => {
          confirmCode()
          //setModalVisible(false);
          //  navigation.navigate('CreateProfile');
          //navigation.navigate('Drawerroute');
        }}
      />
    </SafeAreaView>
  );
};

export default Verification;
