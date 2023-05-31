import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FollowCard = props => {
  return (
    <View style={{paddingHorizontal: wp(5)}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            //source={{uri: IMAGE_URL+item.props.userimage}}
            source={props.userimage}
            style={{width: wp(12), height: hp(6), borderRadius: wp(10)}}
            resizeMode="contain"
          />
          <View style={{marginLeft: wp(4), justifyContent: 'center'}}>
            <Text style={styles.usertext}>{props.username}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.Appthemecolor,
            width: wp(26),
            height: hp(5),
            borderRadius: wp(2),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.usertext}>{props.btn_text}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: wp(90),
          borderWidth: 0.3,
          borderColor: Colors.inactivetextinput,
          alignSelf: 'center',
          marginTop: hp(1.5),
          marginBottom: hp(3),
        }}></View>
    </View>
  );
};

export default FollowCard;
