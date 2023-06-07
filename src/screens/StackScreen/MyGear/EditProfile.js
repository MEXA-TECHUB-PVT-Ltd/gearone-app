import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

///////////////app components////////////////
import Header from '../../../components/Header/Header';

/////////////////components/////////////
import EditPersonalDetail from '../../../components/EditProfile/EditPersonal';
import EditSocialLinks from '../../../components/EditProfile/EditLinks';
import EditImages from '../../../components/EditProfile/EditImages';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import { editLinksMenu,editPersonalMenu,editImagesMenu } from '../../../redux/EditprofileSlice';

///////screen id/////////
import ScreensNames from '../../../data/ScreensNames';

const EditProfile = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();
  const {edit_personal, edit_links, edit_Images} = useSelector(
    state => state.editProfile,
  );

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
         console.log('response here in logos : ', response);
         setLogo(response.result[0].image)
       })
       .catch(error => {
         console.log('Error  : ', error);
       });
   }, [logo]);
 
  useEffect(() => {
    GetLogo()
    dispatch(editPersonalMenu(true));
    dispatch(editLinksMenu(false));
    dispatch(editImagesMenu(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'Edit Profile'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />

        {edit_personal === true ? (
          <EditPersonalDetail />
        ) : edit_links === true ? (
          <EditSocialLinks />
        ) : edit_Images === true ? (
          <EditImages />
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
