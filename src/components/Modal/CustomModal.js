import React from 'react';
import {View,Text,TouchableOpacity,Modal,Image} from 'react-native';

import styles from './styles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

//////////////app colors////////////
import Colors from '../../utills/Colors';

/////////////svg//////////
import CheckIcon from '../../assets/svgs/check_icon.svg'

const CustomModal = (props) => {

    return(

        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={props.CloseModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
      <View style={{height:hp(14)}}>
      <CheckIcon width={wp(30)} height={hp(16)} />
      </View>

              <View style={{justifyContent:'center', marginTop:hp(2),
              alignItems:'center',marginBottom:hp(2),
              alignSelf:'center'}}>
                       <Text style={styles.modaltext}>
                            {props.text}</Text>
              </View>
              <View style={{justifyContent:'center', 
              alignItems:'center',marginBottom:hp(5),
              alignSelf:'center'}}>
                       <Text style={styles.modalsubtext}>
                            {props.subtext}</Text>
              </View>
              {props.type ==='confirmation'?null:
                   <TouchableOpacity 
        onPress={props.onPress}>
    <View  style={styles.ApprovedView}>
   
        <Text style={styles.Pendingtext}>{props.btn_text}</Text>

    </View>
    </TouchableOpacity>
}
    {props.type ==='confirmation'?
        <View  style={styles.logoutbtnView}>
        <TouchableOpacity 
            onPress={props.onPress}
            style={styles.cancelbtn}
            >
            <Text style={[styles.Pendingtext,{color:Colors.Appthemecolor}]}>{props.btn_text}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={props.onPress1}
            style={styles.donebtn}
            >
            <Text style={styles.Pendingtext}>{props.btn_text}</Text>
            </TouchableOpacity>
        </View>
  :null}


            </View>
          </View>
        </Modal>

    )
};

export default CustomModal;