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

const PersonalDetail = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();

  /////////TextInput References///////////
  const ref_input2 = useRef();

  ///////////////data states////////////////////
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState();

  ///////////emai
  return (
    <View>
      <View style={{marginTop: hp(6)}}>
        <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>Phone Number</Text>
        </View>
        <CustomTextInput
          type={'withouticoninput'}
          term={phone_number}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          //placeholder="Enter Username"
          onTermChange={username => setPhoneNumber(username)}
        />
        <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>Email</Text>
        </View>
        <CustomTextInput
          onRef={ref_input2}
          type={'withouticoninput'}
          term={email}
          //placeholder="Enter your experience"
          onTermChange={experience => setEmail(experience)}
        />
      </View>
      <View style={{height: hp(20), marginTop: hp(0), marginBottom: hp(30)}}>
        <CustomButtonhere
          title={'Countinue'}
          widthset={80}
          topDistance={40}
          // loading={loading}
          // disabled={disable}
          onPress={() => {console.log('here'),
            dispatch(setPersonalMenu(false)), dispatch(setLinksMenu(true));
          }}
        />
      </View>
    </View>
  );
};

export default PersonalDetail;
