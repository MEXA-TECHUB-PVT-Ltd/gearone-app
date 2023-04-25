import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

/////////////styles///////////////
import styles from './styles';

/////////////colors////////////
import Colors from '../../../utills/Colors';

///////////////height and width/////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/////////app imagaes////////
import {appImages} from '../../../constant/images';

const DashboardCard = props => {
  /////////price formatter
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  const formattedLikes = formatter.format(props.price);
  return (
    <TouchableOpacity onPress={props.onpress} activeOpacity={0.9}>
      <View style={styles.card}>
        <View
          style={styles.imageView}>
          <Image
            source={props.image}
            style={styles.image}
            resizeMode="cover"/>
        </View>
        <View
          style={styles.textView}>
          <Text numberOfLines={1} style={styles.maintext}>
            {props.maintext}
          </Text>
          <Text numberOfLines={1} style={styles.pricetext}>
            {formattedLikes === '0' ? 'free' :formattedLikes+ '$'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardCard;
