import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';

///////////////app components////////////////
import CustomTextInput from '../../components/TextInput/CustomTextInput';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

///////////////styles////////////////
import Authstyles from '../../styles/Authstyles';

const SocialLinks = ({navigation}) => {
  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  ///////////////data states////////////////////
  const [facebook, setfacebook] = useState('');
  const [insta, setInsta] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  ///////////emai
  return (
    <View>
      <View style={{marginTop: hp(6)}}>
        <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>Social Media Links</Text>
        </View>
        <CustomTextInput
          icon={'facebook'}
          type={'iconinput'}
          term={facebook}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          placeholder="Enter Facebook Link"
          onTermChange={text => setfacebook(text)}
        />
        <CustomTextInput
          onRef={ref_input2}
          icon={'instagram'}
          type={'iconinput'}
          term={insta}
          returnType={'next'}
          onNext={() => {
            ref_input3.current.focus();
          }}
          placeholder="Enter Instagram Link"
          onTermChange={text => setInsta(text)}
        />
        <CustomTextInput
          onRef={ref_input3}
          icon={'twitter'}
          type={'iconinput'}
          term={twitter}
          returnType={'next'}
          onNext={() => {
            ref_input4.current.focus();
          }}
          placeholder="Enter Twitter Link"
          onTermChange={text => setTwitter(text)}
        />
        <CustomTextInput
          onRef={ref_input4}
          icon={'linkedin'}
          type={'iconinput'}
          term={linkedIn}
          placeholder="Enter LinkedIn Link"
          onTermChange={text => setLinkedIn(text)}
        />
      </View>
    </View>
  );
};

export default SocialLinks;
