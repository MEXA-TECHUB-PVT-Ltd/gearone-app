import React, {useState, useRef,useEffect} from 'react';
import {View, Text} from 'react-native';

///////////////app components////////////////
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButtonhere from '../Button/CustomButton';
import CamerBottomSheet from '../CameraBottomSheet/CameraBottomSheet';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

///////////////styles////////////////
import Authstyles from '../../styles/Authstyles';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { editPersonalMenu,editLinksMenu } from '../../redux/EditprofileSlice';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPersonalDetail = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();

    //camera and imagepicker
    const refRBSheet = useRef();

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();

  ///////////////data states////////////////////
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState();
  const [phone_number, setPhoneNumber] = useState('');
  const [Phone_CountryCode, setPhone_CountryCode] = useState();

  const GetProfileData = async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    axios({
      method: 'GET',
      url: BASE_URL + 'auth/specific_user/'+user_id,
    })
      .then(async function (response) {
        setUserName(response.data.result[0].username);
        setPhoneNumber(response.data.result[0].phone);
        setEmail(response.data.result[0].email);
        setPhone_CountryCode(response.data.result[0].country_code)
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  useEffect(() => {
    GetProfileData();
  }, []);
   //////////////Api Calling////////////////////
   const EditProfile = async () => {
    const user_id = await AsyncStorage.getItem('User_id');
    console.log('here user id', user_id);
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
        console.log("here data",response.data)
        // setloading(0);
        // setdisable(0);
        dispatch(editPersonalMenu(false)),
         dispatch(editLinksMenu(true));
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
          term= {Phone_CountryCode+phone_number}
          editable={false}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          placeholder="0000 0000000"
          onTermChange={username => setPhoneNumber(username)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>Email</Text>
        </View>
        <CustomTextInput
          onRef={ref_input2}
          type={'withouticoninput'}
          term={email}
          placeholder="example@gmail.com"
          onTermChange={experience => setEmail(experience)}
        />
      </View>
      <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>UserName</Text>
        </View>
        <CustomTextInput
          onRef={ref_input3}
          type={'withouticoninput'}
          term={username}
          //placeholder="Enter your experience"
          onTermChange={text => setUserName(text)}
        />
      
      <View style={{height: hp(20), marginTop: hp(0), marginBottom: hp(30)}}>
        <CustomButtonhere
          title={'Countinue'}
          widthset={80}
          topDistance={25}
          // loading={loading}
          // disabled={disable}
          onPress={() => {EditProfile()

          }}
        />
      </View>
      <CamerBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={'From Gallery'}
        type={'onepic'}
      />
    </View>
  );
};

export default EditPersonalDetail;
