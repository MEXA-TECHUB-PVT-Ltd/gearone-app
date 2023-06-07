import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';

////////////////app pakages////////////
import {Snackbar} from 'react-native-paper';

///////////////app components////////////////
import Header from '../../../components/Header/Header';
import CustomTextInput from '../../../components/TextInput/CustomTextInput';
import CustomButtonhere from '../../../components/Button/CustomButton';

/////////////app styles///////////////////
import styles from './styles';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////styles/////////
import Authstyles from '../../../styles/Authstyles';

///////////////svgs/////////////
import LinkedIn from '../../../assets/svgs/linkedIn.svg';
import FaceBook from '../../../assets/svgs/facebook.svg';
import Twitter from '../../../assets/svgs/twitter.svg';
import Instagram from '../../../assets/svgs/insta.svg';

////////screen id/////////
import ScreensNames from '../../../data/ScreensNames';

const EditLinks = ({navigation, route}) => {
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

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  // Regular expressions to validate links
  const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\//;
  const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\//;
  const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\//;
  const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\//;

  /////////////Get Screen Logo/////////////
  const [logo, setLogo] = useState([]);
  const GetLogo = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(BASE_URL + 'logos/get_logos_by_screen', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        screen_id: ScreensNames.MyGear_Screen,
      }),
    })
      .then(response => response.json())
      .then(async response => {
        setLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);

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
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    GetSocailLinks();
    GetLogo();
  }, []);
  //Api form validation
  const formValidation = async () => {
    // input validation
    if (facebook && !facebookRegex.test(facebook)) {
      setsnackbarValue({value: 'Invalid Facebook link', color: 'red'});
      setVisible('true');
    } else if (insta && !instagramRegex.test(insta)) {
      setsnackbarValue({value: 'Invalid Instagram link', color: 'red'});
      setVisible('true');
    } else if (twitter && !twitterRegex.test(twitter)) {
      setsnackbarValue({value: 'Invalid Twitter link', color: 'red'});
      setVisible('true');
    } else if (linkedIn && !linkedInRegex.test(linkedIn)) {
      setsnackbarValue({value: 'Invalid LinkedIn link', color: 'red'});
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
      EditSocialLinks();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'My Account'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL + logo}
        />
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
          <View
            style={{height: hp(20), marginTop: hp(0), marginBottom: hp(20)}}>
            <CustomButtonhere
              title={'Continue'}
              widthset={80}
              topDistance={23}
              // loading={loading}
              // disabled={disable}
              onPress={() => {
                formValidation();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditLinks;
