import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';

///////////////app components////////////////
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButtonhere from '../Button/CustomButton';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

///////////////styles////////////////
import Authstyles from '../../styles/Authstyles';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setPersonalMenu, setLinksMenu} from '../../redux/CreateProfileSlice';

////////////////app pakages////////////
import {Snackbar} from 'react-native-paper';

/////////asyc////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////api//////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';

const PersonalDetail = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();
  const {_user_phone_no, phone_country_code} = useSelector(state => state.auth);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  ///////////////data states////////////////////
  const [phone_number, setPhoneNumber] = useState(
    phone_country_code + _user_phone_no,
  );
  const [email, setEmail] = useState();
  const [username, setUseranme] = useState();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  ///////////email//////////////////
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(val)) {
      return true;
    } else {
      return false;
    }
  };

  //Api form validation
  const formValidation = async () => {
    // input validation
    if (phone_number == '') {
      setsnackbarValue({value: 'Please Enter Phone Number', color: 'red'});
      setVisible('true');
    } else if (email == '') {
      setsnackbarValue({value: 'Please Enter Email', color: 'red'});
      setVisible('true');
    } else if (!handleValidEmail(email)) {
      setsnackbarValue({value: 'Incorrect Email', color: 'red'});
      setVisible('true');
    } else if (username == '') {
      setsnackbarValue({value: 'Please Enter Username', color: 'red'});
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
    }
  };
  //////////////Api Calling////////////////////
  const CreateProfile = async () => {
    const user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    let data = JSON.stringify({
      id: user_id,
      username: username,
      email: email,
    });

    let config = {
      method: 'put',
      url: BASE_URL + 'auth/update_profile',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios
      .request(config)
      .then(response => {
        setloading(0);
        setdisable(0);
        dispatch(setPersonalMenu(false)), dispatch(setLinksMenu(true));
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View>
      <View style={{marginTop: hp(6)}}>
        <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>Phone Number</Text>
        </View>
        <CustomTextInput
          type={'withouticoninput'}
          term={phone_number}
          editable={false}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          //placeholder="Enter Username"
          onTermChange={phone_number => setPhoneNumber(phone_number)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>Email</Text>
        </View>
        <CustomTextInput
          onRef={ref_input2}
          type={'withouticoninput'}
          term={email}
          returnType={'next'}
          onNext={() => {
            ref_input3.current.focus();
          }}
          //placeholder="Enter your experience"
          onTermChange={experience => setEmail(experience)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>UserName</Text>
        </View>
        <CustomTextInput
          onRef={ref_input3}
          type={'withouticoninput'}
          term={username}
          //placeholder="Enter your experience"
          onTermChange={experience => setUseranme(experience)}
        />
      </View>
      <View style={{height: hp(20), marginTop: hp(0), marginBottom: hp(30)}}>
        <CustomButtonhere
          title={'Continue'}
          widthset={80}
          topDistance={30}
          loading={loading}
          disabled={disable}
          onPress={() => {
            formValidation();
            console.log('here'), CreateProfile();
            //dispatch(setPersonalMenu(false)),
            //dispatch(setLinksMenu(true));
          }}
        />
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
      </View>
    </View>
  );
};

export default PersonalDetail;
