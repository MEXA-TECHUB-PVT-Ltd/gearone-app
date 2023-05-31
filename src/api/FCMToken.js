
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkPermission = async () => {

    const enabled = await messaging().hasPermission();
    messaging().notifi;
    if (enabled) {
     return getToken();
    } else {
      requestPermission();
    }
  };
  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    await AsyncStorage.setItem('Device_id', fcmToken);
    return fcmToken

  };
  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {}
  };