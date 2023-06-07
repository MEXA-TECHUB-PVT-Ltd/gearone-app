import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

////////////icon///////////
import Ionicons from 'react-native-vector-icons/Ionicons'

/////////////styles///////////////
import styles from './styles';

///////////height and width//////
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DashboardCard = props => {
  /////////price formatter
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  const formattedLikes = formatter.format(props.price);
  return (
    <TouchableOpacity onPress={props.onpress} activeOpacity={0.9}>
      <View style={[styles.card,{marginVertical:props.type === "dashboard_card"?hp(0):hp(2)}]}>
        <View
          style={styles.imageView}>
        {props.images_array_length === 0 ? (
          <Ionicons name={'image'} color={'red'} size={hp(10)} />
        ) : (
          <Image source={{uri:props.image}} style={styles.image} resizeMode="cover" />
        )}
        </View>
        <View
          style={styles.textView}>
          <Text numberOfLines={1} style={styles.maintext}>
            {props.maintext}
          </Text>
          <Text numberOfLines={1} style={styles.pricetext}>{props.price+'$'}
            {/* {formattedLikes === '0' ? 'free' :formattedLikes+ '$'} */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardCard;
