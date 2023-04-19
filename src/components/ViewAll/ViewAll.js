import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';

////////////////app fonts////////
import {fontFamily} from '../../constant/fonts';

const ViewAll = ({headerlabel, onpress}) => {
  return (
    <TouchableOpacity style={[style.headerView]} onPress={onpress}>
      <Text style={style.leftlabeltext}>{headerlabel}</Text>
      <Text style={style.rightlabeltext}>View All</Text>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  headerView: {
    width: wp(100),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: wp(5),
    // / marginTop:hp(3)
  },

  leftlabeltext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.8),
    fontFamily: fontFamily.Inter_SemiBold,
  },
  rightlabeltext: {
    color: '#0F0E0E',
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
  },
});
export default ViewAll;
