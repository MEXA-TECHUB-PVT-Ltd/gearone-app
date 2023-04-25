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

const SellCard = props => {
  /////////price formatter
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  const formattedLikes = formatter.format(props.price);
  return (
    <TouchableOpacity onPress={props.onpress} activeOpacity={0.9} 
    style={styles.card}
    >
        <View
          style={styles.imageView}>
          <Image
            source={props.image}
            style={styles.image}
            resizeMode="cover"/>
        </View>
        <View
          style={styles.textView}>
          <Text style={styles.maintext}>
            {props.maintext}
          </Text>
          <Text style={styles.pricetext}>
        {   'Price: '+formattedLikes === '0' ? 'free' :   'Price: '+ formattedLikes+ '$'}
          </Text>
          <Text style={styles.subtext}>
            {props.description}
          </Text>
        </View>
    </TouchableOpacity>
  );
};

export default SellCard;
