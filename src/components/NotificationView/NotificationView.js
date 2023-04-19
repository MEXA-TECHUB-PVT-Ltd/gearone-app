import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,Image,TouchableOpacity } from 'react-native';

//////////////////app styles//////////////////
import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

const NotificationView = ({notitext,notitime,labelPress,notidetail,image}) => {

  return (
<View >
<TouchableOpacity onPress={labelPress}
       style={styles.mainview}
       >
           <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: wp("3%"),
              alignItems:'center'
            }}
          >
        <Image
            source={image}
            style={styles.logo}
            resizeMode='contain'
          />
               <View style={{ marginLeft:wp(2),marginTop:hp(1),width:wp(65)}}>
            <Text style={styles.notitext}>{notitext}</Text>
            <Text style={styles.notidetail}>{notidetail}</Text>
            </View>
          </View>
          <Text style={styles.notitimetext}>{notitime}</Text>
          </TouchableOpacity>
<View style={styles.lineview}></View>
</View>


  );
};

export default NotificationView;