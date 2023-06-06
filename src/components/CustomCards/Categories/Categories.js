import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

////////////icon///////////
import Ionicons from 'react-native-vector-icons/Ionicons';

/////////////styles///////////////
import styles from './styles';
import { BASE_URL } from '../../../utills/ApiRootUrl';

////////////height and width///////////
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen';


const CategoryCard = props => {
  console.log("hree image",props.image)
  /////////price formatter
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  const formattedLikes = formatter.format(props.price);
  return (
    <TouchableOpacity
      onPress={props.onpress}
      activeOpacity={0.9}
      style={styles.card}>
      <View style={styles.imageView}>
        {props.image === null ? (
          <Ionicons name={'image'} color={'red'} size={hp(10)} />
        ) : (
          <Image source={{uri:BASE_URL+ props.image}} style={styles.image} resizeMode="cover" />
        )}
      </View>
      <View style={styles.textView}>
        <Text numberOfLines={1} style={styles.maintext}>
          {props.maintext}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
