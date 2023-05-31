import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';

//////////////////icons////////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

/////////////////app pakages//////////////
import RBSheet from 'react-native-raw-bottom-sheet';

////////////app styles///////////////
import styles from './styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ViewHairstyles = props => {
  return (
    // <View style={[styles.container,{ backgroundColor: theme ===false? 'white':'black'}]}>
    <RBSheet
      //style={{flex:1}}
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={500}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.9)',
        },
        draggableIcon: {
          backgroundColor: 'white',
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: hp(45),
          backgroundColor: 'white',
        },
      }}>
      <View
        style={{
          marginHorizontal: wp(5),
        }}>
        <View style={styles.headerview}>
          <Text style={styles.headertext}>{props.hairstyle_name}</Text>
          <TouchableOpacity onPress={props.onClose}>
            <Ionicons
              name={'close'}
              size={22}
              color={'#0A0202'}
              onPress={props.onClose}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderColor: '#DFDFDF',
            borderWidth: wp(0.3),
            borderRadius:wp(3),
            height: hp(30),
            width: wp(85),
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={props.hairstyle_image}
            style={{height: hp(25), width: wp(50)}}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </RBSheet>

    // </View>
  );
};

export default ViewHairstyles;
