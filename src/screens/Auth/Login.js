import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

///////////////app components////////////////
import CustomButtonhere from '../../components/Button/CustomButton';

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

///////////////svg///////////
import Logo from '../../assets/svgs/Logo.svg';

///////////country picker//////////
// import {CountryPicker} from 'react-native-country-codes-picker';

////////////redux////////////////
import {useDispatch, useSelector} from 'react-redux';
import {setJoin_as_Guest} from '../../redux/AuthSlice';

/////////////////country picker/////////////
import CountryPicker from 'react-native-country-picker-modal';

const Login = ({navigation}) => {
  //////////////redux variable////////////
  const dispatch = useDispatch();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  /////////////picker states and functions////////////
  const openPicker = () => {
    setShow(true);
  };

  const closePicker = () => {
    setShow(false);
  };
  const [show, setShow] = useState(false);
  ///////////////country picker states//////////////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState('92');

  ///////////////data states////////////////////
  const [phone_no, setPhoneNo] = React.useState('');

  //Api form validation
  const formValidation = async () => {
    // input validation
    if (phone_no == '') {
      setsnackbarValue({value: 'Please Enter Phone Number', color: 'red'});
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
      //signInWithPhoneNumber(countryCode + phone_no);
      final();
    }
  };
  const final = () => {
    dispatch(setJoin_as_Guest(false))
    navigation.navigate('Verification', {
      country_code: '+' +countryCode,
      phone_number: phone_no,
      dummy_number: phone_no === '1234567890' ? true : false,
    });
    setloading(0), setdisable(0);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {CountryPickerView == true ? (
          <CountryPicker
            withFilter={true}
            withCallingCode={true}
            withModal={true}
            withFlag={true}
            withFlagButton={true}
            onSelect={e => {
              setCountryPickerView(false);
              //setCountryFlag(JSON.parse(e.flag))
              e.name === 'Antarctica'
                ? setCountryCode('672')
                : setCountryCode(e.callingCode[0]);
            }}
            onClose={e => {
              setCountryPickerView(false);
            }}
            visible={CountryPickerView}
          />
        ) : (
          <View></View>
        )}
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
            <TouchableOpacity
              onPress={() => setCountryPickerView(true)}
              style={{}}>
              <TextInput
                style={[styles.TextField, {width: wp(15)}]}
                value={ '+' +countryCode}
                editable={false}
                disabled={false}></TextInput>
            </TouchableOpacity>
            <TextInput
              style={[styles.TextField, {width: wp(60)}]}
              placeholder={'Enter Your Phone Number'}
              value={phone_no}
              onChangeText={text => setPhoneNo(text)}
              keyboardType={'numeric'}
              placeholderTextColor={'#FFFFFF'}></TextInput>
          </View>
          <View style={Authstyles.horizontal_mainview}>
            <View style={Authstyles.horizontal_line} />
            <Text style={Authstyles.horizontal_text}>OR</Text>
            <View style={Authstyles.horizontal_line} />
          </View>
        </View>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => {
            dispatch(setJoin_as_Guest(true)),
              navigation.navigate('Drawerroute');
          }}>
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
            loading={loading}
            disabled={disable}
            onPress={() => {
              formValidation();
              //final()
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
      {/* {show && (
        <CountryPicker
          show={show}
          //disableBackdrop={true}
          onBackdropPress={() => setShow(false)}
          enableModalAvoiding={true}
          searchMessage={'Please Choose Your Country Code'}
          //inputPlaceholder={'Please Choose Your Country Code'}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={item => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
          style={{
            modal: {
              height: hp(45),
              backgroundColor: '#444444',
            },
            // Styles for input [TextInput]
            textInput: {
              height: hp(6.5),
              borderRadius: wp(2),
              color: 'black',
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
        />
      )} */}
    </SafeAreaView>
  );
};

export default Login;
