import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

////////////app styles////////////
import styles from './styles';

/////////////height and width///////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const HairStylesCards = props => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Format time in hh:mm am/pm format
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'pm' : 'am';
    const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    
    // Format date in MM/DD/YY format
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${month}/${day}/${year}`;
  
    return `${formattedTime}, ${formattedDate}`;
  };
  const formattedDate = formatDate(props.hairstyle_date_time);
  return (
    <View style={[styles.card,{marginBottom:props.array_length-4?hp(0):hp(3)}]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={props.hairstyle_press}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: hp(0),
        }}>
        <View style={styles.imageview}>
          <Image
            source={props.hairstyle_image}
            style={{height: hp(8), width: wp(25)}}
            resizeMode={'contain'}
          />
        </View>

        <View style={{marginLeft: wp(2)}}>
          <Text style={styles.nametext}>{props.hairstyle_name}</Text>
          {props.hairstyle_date_time === undefined ? null : (
            <Text style={styles.timetext}>{formattedDate}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HairStylesCards;
