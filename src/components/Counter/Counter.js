import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import Colors from '../../utills/Colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Counter = ({ endTime }) => {
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = moment();
      const remainingTime = moment(endTime).diff(currentTime);

      // Check if the end time has passed
      if (remainingTime <= 0) {
        clearInterval(interval);
        setCounter("Expire Deal!");
      } else {
        // Format the remaining time as hours, minutes, and seconds
        const duration = moment.duration(remainingTime);
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        // Format the counter string
        const counterString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        setCounter(counterString);
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [endTime]);

  return <Text style={{color:Colors.Appthemecolor,fontSize:heightPercentageToDP(3) ,textAlign:'center',width:widthPercentageToDP(60),alignSelf:'center'}}>{counter}</Text>;
};

export default Counter;