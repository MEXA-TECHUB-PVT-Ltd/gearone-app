import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

////////////////navigation//////////////////////
import {useNavigation} from '@react-navigation/native';

////////////////////app styles/////////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////Colors///////////
import Colors from '../../utills/Colors';

/////////////app icons/////////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

////////////////app fonts////////
import {fontFamily} from '../../constant/fonts';

const ProfileHeader = ({headerlabel, onpressicon}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, flexDirection: 'row', marginTop: hp(2)}}>
      <View style={{flex: 0.65, alignSelf: 'center', alignItems: 'flex-end'}}>
        <Text
          style={{
            color: 'black',
            textAlign: 'right',
            fontFamily: fontFamily.Inter_Medium,
            fontSize: hp(2),
          }}>
          Profile
        </Text>
      </View>
      <TouchableOpacity
        style={{flex: 0.5, alignSelf: 'flex-end', alignItems: 'flex-end'}}
        onPress={() => navigation.navigate('Settings')}>
        <Ionicons
          name={'settings-sharp'}
          color={Colors.Appthemecolor}
          size={25}
          style={{marginRight: wp(5)}}
          onPress={() => navigation.navigate('Settings')}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ProfileHeader;
