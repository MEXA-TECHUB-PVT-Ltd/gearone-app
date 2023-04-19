import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, ImageComponent} from 'react-native';
import { Snackbar } from 'react-native-paper';

/////////////////components///////////
import CustomModal from '../Modal/CustomModal';

//////////////////icons////////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

////////////////app components////////////////
import CustomButtonhere from '../Button/CustomButton';
import CustomTextInput from '../TextInput/CustomTextInput';

/////////////////app pakages//////////////
import RBSheet from 'react-native-raw-bottom-sheet';

////////////app styles///////////////
import styles from './styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';

const AddTimeSlots = props => {

  ////////redux///////////
  const {_user_id,_jwt_token} = useSelector(state => state.auth);

  /////////TextInput References///////////
  const ref_input2 = useRef();

    ///////////////button states/////////////
    const [loading, setloading] = useState(0);
    const [disable, setdisable] = useState(0);
    const [visible, setVisible] = useState(false);
    const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
    const onDismissSnackBar = () => setVisible(false);

  /////////////data states///////////////
  const [start_time, setStart_Time] = useState();
  const [end_time, setEnd_Time] = useState();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  //Api form validation
  const formValidation = async () => {
    // input validation
    if (start_time == '') {
      setsnackbarValue({value: 'Please Start Time', color: 'red'});
      setVisible('true');
    } else if (end_time == '') {
      setsnackbarValue({value: 'Please  End Time', color: 'red'});
      setVisible('true');
    }else {
      setloading(1);
      setdisable(1);
      CreateTimeSlot()
    }
  };
  //////////////Api Calling////////////////////
  const CreateTimeSlot = async () => {
    const user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    console.log('here redux values',_user_id,_jwt_token)
    let data = JSON.stringify({
      start_time: start_time,
      end_time: end_time,
      barber_id: user_id,
    });

    let config = {
      method: 'post',
      url: BASE_URL + 'time_slot/createTimeSlots?current_user_id=' + user_id,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log('here data',response.data)
        props.onClose()
        setloading(0);
        setdisable(0);
        //navigation.navigate('ProfileSucess');
      })
      .catch(error => {
        console.log(error);
      });

  };
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
          <Text style={styles.headertext}>Time Slot</Text>
          <TouchableOpacity onPress={props.onClose}>
            <Ionicons
              name={'close'}
              size={22}
              color={'#0A0202'}
              onPress={props.onClose}
            />
          </TouchableOpacity>
        </View>
        <CustomTextInput
          type={'withouticoninput'}
          term={start_time}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          placeholder="Enter Start Time"
          onTermChange={starttime => setStart_Time(starttime)}
        />
        <CustomTextInput
          type={'withouticoninput'}
          term={end_time}
          placeholder="Enter End Time"
          onTermChange={endtime => setEnd_Time(endtime)}
        />
        <View style={{marginTop: hp(0)}}>
          <CustomButtonhere
            title={'Save'}
            widthset={85}
            topDistance={4}
            onPress={() => {
              formValidation()
              //setModalVisible(true);
            }}
          />
        </View>
      </View>
      <CustomModal
        modalVisible={modalVisible}
        text={'Sucess'}
        subtext={'TimeSlot Created sucessfully'}
        btn_text={'Go Back'}
        type={'single_btn'}
        onPress_back={() => {
          setModalVisible(false);
          props.onClose();
        }}
      />
              <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(20),
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>
    </RBSheet>

    // </View>
  );
};

export default AddTimeSlots;
