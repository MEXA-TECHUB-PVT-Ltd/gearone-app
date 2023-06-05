import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList} from 'react-native';

///////////////app components////////////////
import Header from '../../components/Header/Header';

/////////////app styles///////////////////
import styles from './styles';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////screen id/////////////
import ScreensNames from '../../data/ScreensNames';

const TermsCondition = ({navigation, route}) => {
  /////////////Get Screen Logo/////////////
  const [logo, setLogo] = useState();
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
        console.log('response here in logos : ', response);
        setLogo(response.result[0].image);
      })
      .catch(error => {
        console.log('Error  : ', error);
      });
  }, [logo]);

  useEffect(() => {
    GetLogo();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'Terms & Condition'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL + logo}
        />
        <View
          style={{marginTop: hp(3), marginLeft: wp(5), marginBottom: hp(2)}}>
          <Text style={[styles.sub_text, {width: wp(92)}]}>
            Welcome to company! These terms and conditions ("Terms")
            govern your use of Gearone ("the App"), including any
            services, features, content, or functionality offered through the
            App. Acceptance of Terms By accessing or using the App, you agree to
            be bound by these Terms. If you do not agree to these Terms, please
            refrain from using the App. {'\n'}L Use of the App {'\n'} a. The App is intended
            for personal, non-commercial use. You may not use the App for any
            illegal or unauthorized purpose. {'\n'}L b. You are responsible for
            maintaining the confidentiality of any login credentials and are
            liable for any activities that occur using your account.
            Intellectual Property a.  {'\n'}LThe App and its content, including but not
            limited to text, graphics, logos, and images, are the property of
            company and protected by copyright and other
            intellectual property laws. b. {'\n'}L You may not reproduce, modify,
            distribute, or exploit any part of the App without the explicit
            written permission of company.  {'\n'}LUser-Generated Content a.
            The App may allow users to submit content, such as comments,
            reviews, or feedback. By submitting content, you grant company
             a non-exclusive, worldwide, royalty-free license to use,
            reproduce, modify, and publish the content. b. You are solely
            responsible for the content you submit and must ensure it does not
            violate any laws or infringe upon the rights of others. Privacy a.
            company respects your privacy and is committed to
            protecting your personal information. {'\n'}LPlease review our Privacy
            Policy to understand how we collect, use,
            and disclose your information. b. {'\n'}L By using the App, you consent to
            the collection and processing of your personal information as
            described in the Privacy Policy.  {'\n'}LDisclaimers a. The App is provided
            "as is" without any warranties, express or implied. company
             disclaims all warranties regarding the App's availability,
            accuracy, reliability, and fitness for a particular purpose.  {'\n'}L
            company does not guarantee the App will be error-free or
            uninterrupted, and will not be liable for any damages arising from
            the use or inability to use the App. {'\n'}L Limitation of Liability To the
            fullest extent permitted by law, company will not be
            liable for any direct, indirect, incidental, consequential, or
            special damages arising out of or in connection with the use of the
            App or these Terms. {'\n'}L Modifications companyreserves the
            right to modify or update these Terms at any time. Any changes will
            be effective upon posting the revised Terms in the App. Governing
            Law and Jurisdiction These Terms are governed by and construed in
            accordance with the laws. {'\n'}L Any disputes
            arising from the use of the App shall be subject to the exclusive
            jurisdiction of the courts. {'\n'}L Severability If
            any provision of these Terms is deemed invalid or unenforceable, the
            remaining provisions shall remain in full force and effect.
            
        
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsCondition;
