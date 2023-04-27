import React, {useState, useRef} from 'react';
import {SafeAreaView, ScrollView, Image, View, Text} from 'react-native';

///////////////app components////////////////
import CustomButtonhere from '../../components/Button/CustomButton';
import CustomTextInput from '../../components/TextInput/CustomTextInput';

////////////////app pakages////////////
import {Snackbar} from 'react-native-paper';

/////////////app styles///////////////////
import styles from './styles';
import Authstyles from '../../styles/Authstyles';
import Logostyles from '../../styles/Logostyles';

//////////////Colors//////
import Colors from '../../utills/Colors';
/////////fonts/////////
import {fontFamily} from '../../constant/fonts';

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

  ///////////////data states////////////////////
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
          <CustomTextInput
            type={'withouticoninput'}
            texterror={'invalid'}
            term={email}
            returnType={'next'}
            onNext={() => {
              ref_input2.current.focus();
            }}
            onTermChange={newEmail => setEmail(newEmail)}
          />
          <View style={Authstyles.horizontal_mainview}>
            <View style={Authstyles.horizontal_line} />
            <Text style={Authstyles.horizontal_text}>OR</Text>
            <View style={Authstyles.horizontal_line} />
          </View>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={Authstyles.last_text}>Join as a Guest</Text>
        </View>
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
              navigation.navigate("Verification",{data:'001'});
              //formValidation();
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
    </SafeAreaView>
  );
};

export default Login;
