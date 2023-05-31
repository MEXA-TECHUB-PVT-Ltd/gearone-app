import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

/////////////app icons/////////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////app styles//////////////////
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app color///////////
import Colors from '../../utills/Colors';

const SettingsMenu = ({label, labelPress, icon, last_item}) => {
  return (
    <TouchableOpacity onPress={labelPress} style={styles.mainview}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp(80),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={[
              styles.labeltext,
              {marginLeft: icon === undefined ? wp(0) : wp(3)},
            ]}>
            {label}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          color={'#FFFFFF'}
          size={18}
          onPress={labelPress}
        />
      </View>
      {/* {last_item === 'yes' ? null : (
        <View
          style={{
            width: wp(85),
            borderWidth: 0.3,
            borderColor: Colors.inactivetextinput,
            alignSelf: 'center',
            marginTop: hp(1),
          }}></View>
      )} */}
    </TouchableOpacity>
  );
};

export default SettingsMenu;
