import * as React from 'react';
import {View, Text, Image} from 'react-native';

////////////app styles////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////app icons////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReviewsCards = props => {

  let stars = [];
  for (var i = 1; i <= 5; i++) {
    // set the path to filled stars
    let name = 'ios-star';
    // If ratings is lower, set the path to unfilled stars
    if (i > props.ratting) {
      name = 'ios-star-outline';
    }
    stars.push(<Ionicons name={name} size={15} style={styles.star} key={i} />);
  }
  return (
    <View style={{paddingHorizontal: wp(5)}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          //source={{uri: IMAGE_URL+item.props.userimage}}
          source={props.userimage}
          style={{width: wp(12), height: hp(6), borderRadius: wp(10)}}
          resizeMode="contain"
        />
        <View style={{marginLeft: wp(4), justifyContent: 'center'}}>
          <Text style={styles.usertext}>{props.username}</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.usertext}>{stars}</Text>
            </View>

        </View>
      </View>
      <View
        style={{marginTop: hp(2), marginLeft: wp(1)}}>
        <Text style={styles.subtext}>{props.detail}</Text>
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

export default ReviewsCards;
