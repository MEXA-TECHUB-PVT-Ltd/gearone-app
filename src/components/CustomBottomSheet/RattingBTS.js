import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { Snackbar } from "react-native-paper";

//////////////////app components///////////////////
import CustomModal from "../Modal/CustomModal";
import CustomTextInput from "../TextInput/CustomTextInput";
import CustomButtonhere from "../Button/CustomButton";

////////////app icons////////////////
import Ionicons from "react-native-vector-icons/Ionicons";


////////////////////app pakages////////////////////////
import {Rating, AirbnbRating} from 'react-native-ratings';

///////////////app packages/////////////
import RBSheet from "react-native-raw-bottom-sheet";

///////////////app styles//////////////////
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";

//////////////////app Images////////////////
import { appImages } from "../../constant/images";

/////////////colors//////////
import Colors from "../../utills/Colors";


const RattingBottomSheet = (props) => {

  const navigation = useNavigation();
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////////redux states///////
  const dispatch = useDispatch();

  ////////////////textinput state//////////////
  const [description, setDescription] = useState("");

    ///////////////button states/////////////
    const [loading, setloading] = useState(0);
    const [disable, setdisable] = useState(0);
    const [visible, setVisible] = useState(false);
    const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
    const onDismissSnackBar = () => setVisible(false);


    let stars = [];
    for (var i = 1; i <= 5; i++) {
      // set the path to filled stars
      let name = 'star-outline';
      // If ratings is lower, set the path to unfilled stars
      if (i > props.ratting) {
        name = 'ios-star-outline';
      }
      stars.push(<Ionicons name={name} size={25} style={styles.star} key={i} />);
    }
  return (
    <RBSheet
      //sstyle={{flex:1}}
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      openDuration={50}
      closeDuration={50}
      animationType="fade"
      //height={500}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(52, 52, 52, 0.5)",
        },
        draggableIcon: {
          backgroundColor: Colors.AppBckGround_color,
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: hp(30),
          backgroundColor: Colors.AppBckGround_color,
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: wp(7),
        }}
      >
        <Text style={styles.Ratting_maintext}>{props.title}</Text>
        <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
          <Ionicons
            name={"close"}
            size={22}
            color={'white'}
            onPress={() => props.refRBSheet.current.close()}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',alignSelf:'center',marginTop:hp(2)}}>
          <Text style={styles.usertext}>{stars}</Text>
            </View>
      <View style={{ marginTop: hp(0) }}>
          <CustomButtonhere
            title={"Rate"}
            widthset={80}
            topDistance={5}
            loading={loading}
            disabled={disable}
            onPress={() => {
              //navigation.navigate("Drawerroute");
              formValidation();
            }}
          />
        </View>
      <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={"Sucess"}
          subtext={
            props.btntext === "REPORT"
              ? "Report Sucessfully"
              : "Review Added Successfully"
          }
          buttontext={"OK"}
          onPress={() => {
            props.onClose()
         setModalVisible(false)
//navigation.navigate('CommentsDetails')
          }}
        />
      <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(9),
            zIndex: 999,
          }}
        >
          {snackbarValue.value}
        </Snackbar>
    </RBSheet>
  );
};

export default RattingBottomSheet;
