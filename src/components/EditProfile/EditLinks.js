import React, {useState, useRef, useCallback, useEffect} from 'react';
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
import {
  editLinksMenu,
  editImagesMenu,
  editPersonalMenu,
} from '../../redux/EditprofileSlice';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditSocialLinks = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  ///////////////data states////////////////////
  const [social_links_id, setSocial_Links_Id] = useState('');
  const [facebook, setfacebook] = useState('');
  const [insta, setInsta] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  /////////socia links////////
  const GetSocailLinks = useCallback(async () => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log('here id', user_id);
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'SocialMedia/get_social_media', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        userID: user_id,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response hgeree are  : ', response.result[0].facebook);
        setSocial_Links_Id(response.result[0].id);
        setfacebook(response.result[0].facebook);
        setLinkedIn(response.result[0].linkedin);
        setTwitter(response.result[0].twitter);
        setInsta(response.result[0].insta);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, []);

  //////////////Api Calling////////////////////
  const EditSocialLinks = async () => {
    // setloading(1);
    // setdisable(1);
    const user_id = await AsyncStorage.getItem('User_id');
    console.log('here user id', user_id);
    var token = await AsyncStorage.getItem('JWT_Token');
    let data = JSON.stringify({
      userID: user_id,
      SocialMediaID: social_links_id,
      facebook: facebook,
      twitter: twitter,
      insta: insta,
      linkedin: linkedIn,
    });

    let config = {
      method: 'PUT',
      url: BASE_URL + 'SocialMedia/update_social_media',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios
      .request(config)
      .then(response => {
        console.log('here data', response.data);
        dispatch(editLinksMenu(false)), dispatch(editImagesMenu(true));
        // setloading(0);
        // setdisable(0);
        //dispatch(setLinksMenu(false)), dispatch(setCoverImageMenu(true));
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    GetSocailLinks();
  }, []);
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
          placeholder="Link here"
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
          placeholder="Link Here"
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
      <View style={{height: hp(20), marginTop: hp(0), marginBottom: hp(20)}}>
        <CustomButtonhere
          title={'Continue'}
          widthset={80}
          topDistance={23}
          // loading={loading}
          // disabled={disable}
          onPress={() => {
            EditSocialLinks();
          }}
        />
      </View>
    </View>
  );
};

export default EditSocialLinks;
