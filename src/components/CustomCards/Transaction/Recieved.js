import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RecievedCards = props => {
  console.log('here props', props);

  return (
    <View style={{paddingHorizontal: wp(5)}}>
      <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            //source={{uri: IMAGE_URL+item.props.userimage}}
            source={props.userimage}
            style={{width: wp(12), height: hp(6), borderRadius: wp(10)}}
            resizeMode="contain"
          />
          <View style={{marginLeft: wp(4), justifyContent: 'center'}}>
            <Text style={styles.usertext}>{props.username}</Text>
            <Text style={styles.pricetext}>Amount Received: <Text style={styles.price}>{props.price}
                </Text></Text>
          </View>
        </View>
        <View style={{}}>
          <Text style={styles.datetext}>{props.date}</Text>
        </View>
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

export default RecievedCards;
