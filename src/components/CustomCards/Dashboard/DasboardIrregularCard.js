import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

////////////icon///////////
import Ionicons from 'react-native-vector-icons/Ionicons';

/////////////styles///////////////
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DashboardIrregularCard = props => {
  /////////price formatter
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  const formattedLikes = formatter.format(props.price);
  return (
    <TouchableOpacity onPress={props.onpress} activeOpacity={0.9}>
      <View
        style={[
          styles.card,
          {
            marginVertical: wp(0.5),
            marginHorizonta: wp(0),
            width: props.type === 'horizontal' ? wp(63) : wp(30),
            height: props.type === 'horizontal' ? hp(38) : hp(16),
            marginBottom: props.type === 'horizontal' ? hp(2) : hp(4),
          },
        ]}>
        <View
          style={[
            styles.imageView,
            {
              width: props.type === 'horizontal' ? wp(60) : wp(30),
              height: props.type === 'horizontal' ? hp(30) : hp(12),
            },
          ]}>
          {props.images_array_length === 0 ? (
            <Ionicons name={'image'} color={'red'} size={hp(10)} />
          ) : (
            <Image
              source={{uri: props.image}}
              style={[
                styles.image,
                {
                  width: props.type === 'horizontal' ? wp(63) : wp(30),
                  height: props.type === 'horizontal' ? hp(30) : hp(12),
                },
              ]}
              resizeMode="cover"
            />
          )}
        </View>
        <View
          style={[
            styles.textView,
            {
              width: props.type === 'horizontal' ? wp(60) : wp(30),
              height: props.type === 'horizontal' ? hp(6) : hp(6),
            },
          ]}>
          <Text numberOfLines={1} style={styles.maintext}>
            {props.maintext}
          </Text>
          <Text numberOfLines={1} style={styles.pricetext}>
            {props.price + '$'}
            {/* {formattedLikes === '0' ? 'free' :formattedLikes+ '$'} */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardIrregularCard;
