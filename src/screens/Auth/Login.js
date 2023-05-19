import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';

/////////app icons//////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

///////////////app components////////////////
import CustomButtonhere from '../../components/Button/CustomButton';
import CustomTextInput from '../../components/TextInput/CustomTextInput';

////////////////app pakages////////////
import {Snackbar} from 'react-native-paper';

/////////////app styles///////////////////
import styles from './styles';
import Authstyles from '../../styles/Authstyles';
import Logostyles from '../../styles/Logostyles';

///////////firebase auth/////////////
import auth from '@react-native-firebase/auth';

///////////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

///////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setUserEmail,
  setUserId,
  setJWT_Token,
  setUserPassword,
} from '../../redux/AuthSlice';

///////////////svg///////////
import Logo from '../../assets/svgs/Logo.svg';

import {CountryPicker} from 'react-native-country-codes-picker';

const Login = ({navigation}) => {
  ////////redux////////////
  const dispatch = useDispatch();
  const {_user_email, _user_password} = useSelector(state => state.auth);

  /////////TextInput References///////////
  const ref_input2 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  //password eye function and states
  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  ///////////email//////////////////
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(val)) {
      console.log('true');
      return true;
    } else {
      console.log('falsse');
      return false;
    }
  };

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+92');

  ///////////////data states////////////////////
  const [phone_no, setPhoneNo] = React.useState('');
  const [email, setEmail] = React.useState(_user_email);
  const [password, setPassword] = React.useState(_user_password);

  //////////////Api Calling////////////////////
  const LoginUser = async () => {
    axios({
      method: 'post',
      url: BASE_URL + 'Barber/login',
      data: {
        email: email.toLowerCase(),
        password: password,
      },
    })
      .then(async function (response) {
        if (response.data.status === true) {
          const string_id = response.data.result.id.toString();
          dispatch(setUserId(response.data.result.id));
          dispatch(setUserEmail(response.data.result.email));
          dispatch(setJWT_Token(JSON.stringify(response.data.jwt_token)));
          dispatch(setUserPassword(password));
          await AsyncStorage.setItem('User_id', string_id);
          await AsyncStorage.setItem(
            'JWT_Token',
            JSON.stringify(response.data.jwt_token),
          );
          await AsyncStorage.setItem('User_email', response.data.result.email);
          navigation.navigate('CreateProfile');
          //navigation.navigate('BottomTab');
          setloading(0);
          setdisable(0);
        } else {
          setloading(0);
          setdisable(0);
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
  //Api form validation
  const formValidation = async () => {
    // input validation
    if (email == '') {
      setsnackbarValue({value: 'Please Enter Email', color: 'red'});
      setVisible('true');
    } else if (!handleValidEmail(email)) {
      setsnackbarValue({value: 'Incorrect Email', color: 'red'});
      setVisible('true');
    } else if (password == '') {
      setsnackbarValue({value: 'Please Enter Password', color: 'red'});
      setVisible('true');
    } else if (password.length <= 5) {
      setsnackbarValue({
        value: 'Please Enter 6 digit Password',
        color: 'red',
      });
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
      LoginUser();
    }
  };
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
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

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("here",confirmation)
    setConfirm(confirmation);

    //navigation.navigate("Verification",{code:confirmation,country_code:countryCode,phone_number:phone_no})
  }

  async function confirmCode() {
    try {
      const res=await confirm.confirm(code);
      console.log(res)
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={Logostyles.Logoview}>
          <Logo width={wp(45)} height={hp(11)} />
        </View>
        <View>
          <View style={Authstyles.textview}>
            <Text style={Authstyles.maintext}>Log In</Text>
            <Text style={Authstyles.subtext}>
              A 6-digit code will be sent via text to verify your phone number
            </Text>
          </View>
          <View style={{marginLeft: wp(12)}}>
            <Text style={Authstyles.textinput_title}>Phone Number</Text>
          </View>

          <View style={styles.TextFieldView}>
            <TouchableOpacity onPress={() => setShow(true)} style={{}}>
              <TextInput
                style={[styles.TextField, {width: wp(15)}]}
                value={countryCode}
                editable={false}
                disabled={false}></TextInput>
            </TouchableOpacity>
            <TextInput
              style={[styles.TextField, {width: wp(60)}]}
              placeholder={'Enter Your Phone Number'}
              value={phone_no}
              onChangeText={(text)=>setPhoneNo(text)}
              keyboardType={'numeric'}
              placeholderTextColor={'#FFFFFF'}></TextInput>
          </View>
          <TextInput style={{backgroundColor:'white',color:'black'}} value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    
          <View style={Authstyles.horizontal_mainview}>
            <View style={Authstyles.horizontal_line} />
            <Text style={Authstyles.horizontal_text}>OR</Text>
            <View style={Authstyles.horizontal_line} />
          </View>
        </View>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('Drawerroute')}>
          <Text style={Authstyles.last_text}>Join as a Guest</Text>
        </TouchableOpacity>
        <View
          style={{
            height: hp(25),
            marginTop: hp(2),
          }}>
          <CustomButtonhere
            title={'Submit'}
            widthset={80}
            topDistance={18}
            // loading={loading}
            // disabled={disable}
            onPress={() => {
             // navigation.navigate("Verification",{country_code:countryCode,phone_number:phone_no})
              //signInWithPhoneNumber(countryCode+phone_no);
              //navigation.navigate("Verification",{data:'001'});
              //formValidation();
              navigation.navigate('Drawerroute')
            }}
          />
        </View>
      </ScrollView>
      <Snackbar
        duration={400}
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: snackbarValue.color,
          marginBottom: hp(20),
          zIndex: 999,
        }}>
        {snackbarValue.value}
      </Snackbar>
      <CountryPicker
        show={show}
        style={{
          modal: {
            height: 500,
            backgroundColor: '#444444',
          },
          // Styles for input [TextInput]
          textInput: {
            height: hp(6.5),
            borderRadius: wp(2),
          },
          // Dial code styles [Text]
          dialCode: {
            color: 'black',
          },
          // Country name styles [Text]
          countryName: {
            color: 'black',
          },
          // Styles for search message [Text]
          searchMessageText: {
            color: 'black',
          },
        }}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Login;
