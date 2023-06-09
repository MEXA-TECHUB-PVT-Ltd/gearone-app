import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

/////////////styles///////////////
import styles from './styles';

//////////lcons//////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//////height and width//////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SellCard = props => {
  /////////price formatter
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  const formattedLikes = formatter.format(props.price);
  const dateObject = new Date(props.subtext_Content);
  const day = String(dateObject.getUTCDate()).padStart(2, '0');
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
  const year = dateObject.getUTCFullYear();
  const formattedDate = day + '/' + month + '/' + year;
  return (
    <TouchableOpacity
      onPress={props.onpress}
      activeOpacity={0.9}
      style={styles.card}>
      {props.type === 'orders' ? (
        <View
          style={{
            backgroundColor: 'red',
            width: wp(25),
            height: hp(3.5),
            position: 'absolute',
            right: 0,
            top: 0,
            borderTopRightRadius: wp(1.5),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp(2),
          }}>
          <MaterialCommunityIcons
            name={
              props.status === 'pending'
                ? 'clock-outline'
                : props.status === 'in-progress' ||
                  props.status === 'in-process'
                ? 'progress-check'
                : 'check'
            }
            color={'white'}
            size={hp(2)}
          />
          {/* <MaterialCommunityIcons name={'progress-check'} color={'white'} size={hp(2)} /> */}
          <Text style={{color: 'white'}}>
            {props.status === 'pending'
              ? 'Pending'
              : props.status === 'in-progress' || props.status === 'in-process'
              ? 'InProgress'
              : 'Approved'}
          </Text>
        </View>
      ) : null}
      {props.images_array_length === 0 ? (
        <Ionicons name={'image'} color={'grey'} size={hp(10)} />
      ) : (
        <View style={styles.imageView}>
          <Image
            source={{uri: props.image}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
      <View style={styles.textView}>
        <Text style={styles.maintext}>{props.maintext}</Text>
        <Text style={styles.pricetext}>
          {props.type === 'orders' || props.type === 'deals'
            ? props.subtext_Text + formattedDate
            : 'Price: ' + props.price}
        </Text>
        <Text style={styles.subtext} numberOfLines={3}>
          {props.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SellCard;
