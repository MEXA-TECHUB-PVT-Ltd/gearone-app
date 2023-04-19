import React, { useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

///////////////////app pakages///////////////
import RBSheet from 'react-native-raw-bottom-sheet';

////////////app styles//////////////
import styles from './styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////////redux////////////
import { useDispatch} from 'react-redux';
import {updateGender} from '../../redux/GenderSlice';

const Gender_DropDowns = props => {
  /////////////redux states///////
  const dispatch = useDispatch();

  const [gender_data] = useState([
    {id: '1', name: 'Male', value: 'male'},
    {id: '2', name: 'Female', value: 'female'},
  ]);

  // Function to update the gender state
  const handleUpdateGender = (name, value) => {
    dispatch(updateGender({name, value}));
  };

  return (
    <RBSheet
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      openDuration={50}
      closeDuration={50}
      animationType="fade"
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        },
        draggableIcon: {
          backgroundColor: 'white',
        },
        container: {
          borderTopLeftRadius: wp(10),
          borderTopRightRadius: wp(10),
          height: hp(35),
        },
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 0,
        }}>
        <Text style={styles.bottomsheettext}>{'Select Gender'}</Text>
      </View>
      <FlatList
        data={gender_data}
        renderItem={({item, index, separators}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleUpdateGender(item.name, item.value);
              props.refRBSheet.current.close();
            }}>
            <View style={styles.card}>
              <Text style={styles.cardtext}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </RBSheet>
  );
};

export default Gender_DropDowns;
