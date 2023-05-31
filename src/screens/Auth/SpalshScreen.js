import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, Image} from 'react-native';

////////////////app store data//////////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

///////////app colors/////////////
import Colors from '../../utills/Colors';

/////////////app height and width/////////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SplashScreen = ({navigation}) => {
  const getData = async () => {
    try {
      await AsyncStorage.getItem('User_id')
        .then(db => {
          if (db === null) {
            navigation.navigate('Login');
          } else {
            navigation.navigate('Drawerroute');
          }
        })
        .done();
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.AppBckGround_color}
        barStyle="light-content"
      />
      <View style={styles.imageview}>
      </View>
    </SafeAreaView>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.AppBckGround_color,
    alignItems: 'center',
  },
  imageview: {
    marginTop: hp(38),
  },
  image: {
    height: hp(12),
    width: wp(59),
  },
});
