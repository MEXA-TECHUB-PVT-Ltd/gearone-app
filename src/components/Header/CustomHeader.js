import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

////////////////height width///////////////
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

///////////////icons////////////////
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

/////////////colors///////////////
import Colors from '../../utills/Colors';

//////////////////fonts///////////////
import { fontFamily } from '../../constant/fonts';

const CustomHeader = ({ title,left_icon,left_iconPress, right_icon,right_iconPress }) => {

  return (
    <View style={styles.header}>
        {left_icon === undefined?null:
           <View style={styles.iconContainer}>
           <Icon name={left_icon} size={25} color="black" onPress={left_iconPress}/>
         </View>}
   
      <View style={styles.titleContainer}>
        <Text style={[styles.title,{textAlign: left_icon === undefined?'left':'center',marginLeft:left_icon === undefined?wp(5):wp(0)}]}>{title}</Text>
      </View>
      <View style={styles.iconContainer}>
{      right_icon === 'search-outline'?
<View style={{backgroundColor:Colors.Appthemecolor,borderRadius:wp(10),height:hp(5),width:wp(10),alignItems:'center',justifyContent:'center'}}>
<Icon name={right_icon} size={25} color={'white'} onPress={right_iconPress}/>
</View>
      :
      right_icon === 'calendar-day'?
      <FontAwesome5 name={right_icon} size={25} color={Colors.Appthemecolor} onPress={right_iconPress}/>
      :
      <MaterialCommunityIcons
      name={right_icon}
      size={25}
      color={Colors.Appthemecolor}
      style={{
        // marginLeft: wp(25)
         }}
      onPress={right_iconPress}
    />
      }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: hp(8),
    paddingTop: hp(1),
    backgroundColor: '#fff',
  },
  iconContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red'
  },
  titleContainer: {
    flex: 5,
    justifyContent: 'center',
    //backgroundColor:'yellow'
  },
  title: {
    fontSize:hp(2.3),
    color:Colors.app_header_text,
    textAlign:'center',
    fontFamily:fontFamily.Inter_Medium
  },
});

export default CustomHeader;





