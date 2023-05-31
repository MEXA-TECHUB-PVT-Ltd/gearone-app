import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

/////////app icons//////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

////////////app colors///////////////
import Colors from '../../utills/Colors';

////////////////app fonts////////////
import {fontFamily} from '../../constant/fonts';

//////////////////////responsive library//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomTextInput = ({
  term,
  placeholder,
  onTermChange,
  type,
  icon,
  disable,
  editable,
  length,
  returnType,
  onNext,
  onRef,
  mode,
  secureTextEntry,
  onclick,
  multiline,
  keyboard_type,
  Lines,
  dopdownicon,
  no_icon
}) => {
  const [isfocused, setisFocused] = useState(false);
  return (
    <View>
      <View
        style={[
          styles.TextFieldView,
          {
            width: length === 'small' ? wp(39) : wp(84),
            // borderColor:
            //   isfocused == true
            //     ? Colors.activetextinput
            //     : Colors.inactivetextinput,
            height: multiline === true ? hp(20) : hp(7),
            borderRadius: multiline === true ? wp(3) : wp(2),
          },
        ]}>
         { type === 'withouticoninput'?null
         :type === 'dropdowniconinput'?null
         :no_icon === 'no_icon'?null
         :
        <MaterialCommunityIcons
          name={icon}
          color={'#FFFFFF'}
          size={19}
          style={{marginLeft: wp(4)}}
        />}
        <TextInput
          style={[
            styles.TextField,
            {
              width:
                length === 'small'
                  ? wp(23)
                  : type === 'iconinput' && mode === 'password'
                  ? wp(59)
                  : type === 'iconinput'
                  ? wp(69)
                  :type === 'dropdowniconinput'?wp(64)
                  : wp(75),
              textAlignVertical: multiline === true ? 'top' : null,
              height: multiline === true ? hp(16) : null,
              marginTop: multiline === true ? hp(0) : null,
              marginHorizontal:type === 'iconinput'?wp(2): wp(5)
            },
          ]}
          ref={onRef}
          autoCorrect={false}
          clearTextOnFocus={true}
          placeholder={placeholder}
          value={term}
          editable={editable}
          disabled={disable}
          returnKeyType={returnType}
          keyboardType={keyboard_type}
          placeholderTextColor={'#FFFFFF'}
          onFocus={() => setisFocused(true)}
          onChangeText={onTermChange}
          onEndEditing={() => setisFocused(false)}
          onSubmitEditing={onNext}
          secureTextEntry={secureTextEntry}
          numberOfLines={Lines}
          multiline={multiline}
          ></TextInput>
        {type === 'iconinput' && mode === 'password' ? (
          <TouchableOpacity onPress={onclick}>
            {secureTextEntry ? (
              <Ionicons
                name="eye"
                color={Colors.App_icon_color}
                size={19}
                style={{marginRight:wp(3)}}
                
              />
            ) : (
              <Ionicons
                name="eye-off"
                color={Colors.App_icon_color}
                size={19}
                style={{marginRight:wp(2)}}
           />
            )}
          </TouchableOpacity>
        ):type === 'dropdowniconinput'?
        <MaterialCommunityIcons
          name={dopdownicon}
          color={'white'}
          style={{marginRight: wp(4)}}
        /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextField: {
    fontSize: hp(1.6),
    marginHorizontal: wp(5),
    fontFamily: fontFamily.Poppins_Regular,
    color: 'white',
    width: wp(20),
    fontFamily:fontFamily.Poppins_Regular,
    fontSize:hp(1.4),
  //backgroundColor: 'red',
  },
  TextFieldView: {
    flexDirection: 'row',
    height: hp(7),
    width: wp(85),
    borderRadius: wp(6),
    marginTop: hp(1),
    marginBottom: hp(2),
    //borderColor: '#6B6B6B',
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#444444'
  },
  icon: {
    marginRight: wp(8),
    width: wp(4),
    height: hp(3),
  },
  ErrorText: {
    fontSize: 12,
    color: 'red',
    marginHorizontal: 20,
  },
});

export default CustomTextInput;
