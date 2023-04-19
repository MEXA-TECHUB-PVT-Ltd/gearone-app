import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TransactionCards = props => {

  return (
    <View style={{paddingHorizontal: wp(5)}}>
      <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
            <Text style={styles.pricetext}>Amount Received: <Text style={styles.price}>{props.price}
                </Text></Text>
          <Text style={styles.datetext}>{props.date}</Text>
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

export default TransactionCards;
