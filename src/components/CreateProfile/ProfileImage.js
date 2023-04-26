import React, {useState, useRef} from 'react';
import {
  View,
  Text
} from 'react-native';


/////////////app components//////////
import CustomButtonhere from '../Button/CustomButton';

/////////////icons//////////////////
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////fonts///////////
import { fontFamily } from '../../constant/fonts';

const ProfileImage = ({navigation}) => {

  return (
        <View style={{marginTop:hp(20)}}>
    <View style={{
      width: wp(30),
      height: hp(15),
      borderWidth: wp(1),
      borderStyle: 'dotted',
      borderRadius: wp(40),
      borderColor: 'white',
      alignSelf:'center',
      justifyContent:"center",
      alignItems:'center'
    }}>
   <FontAwesome5
          name={'user-alt'}
          color={'#444444'}
          size={hp(3)}

        />
    </View>
    <View style={{alignItems:'center',justifyContent:'center',marginTop:hp(3)}}>
        <Text style={{color:'white',fontFamily:fontFamily.Poppins_Light,fontSize:hp(1.6)}}>Profile Image</Text>
    </View>
    <View style={{height:hp(20), marginTop: hp(0), marginBottom: hp(20)}}>
          <CustomButtonhere
            title={'Countinue'}
            widthset={80}
            topDistance={15}
            loading={loading}
            disabled={disable}
            onPress={() =>
              //navigation.navigate('ProfileSucess')
              formValidation()
            }
          />
        </View>
        </View>
  );
};

export default ProfileImage;
