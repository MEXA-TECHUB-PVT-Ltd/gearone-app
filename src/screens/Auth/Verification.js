import React, {useState} from 'react';
import { View, Text, SafeAreaView} from 'react-native';

///////////////app code fields/////////////
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

///////////////timer/////////////////////
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

/////////////////app components/////////////////
import CustomButtonhere from '../../components/Button/CustomButton';
import CustomModal from '../../components/Modal/CustomModal';

/////////////////////app styles/////////////////////
import Authstyles from '../../styles/Authstyles';
import Logostyles from '../../styles/Logostyles';
import styles from './styles';

////////////////height and width/////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////svgs/////////////
import Logo from '../../assets/svgs/Logo.svg'

const Verification = ({navigation, route}) => {
  /////////////previous data state///////////////
  const [predata] = useState(route.params.data);

  console.log(predata)

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////timer state///////////////
  const [disabletimer, setdisableTimer] = useState(false);

  //////////time function//////////
  const children = ({remainingTime}) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };
  //code Confirmation states
  const [value, setValue] = useState();
  //cell number
  const CELL_COUNT = 6;

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //button states
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  //check OTP Code
  const verifyno = () => {
    setloading(1);
    if (predata.otp == value) {
      setloading(0);
      setModalVisible(true);
    } else {
      setModalVisible(true);
      setloading(0);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[Logostyles.Logoview, {marginTop: hp(10)}]}>
      <Logo width={wp(45)} height={hp(11)} />
      </View>
      <View style={[Authstyles.textview, {marginBottom: hp(0)}]}>
        <Text style={Authstyles.maintext}>Verification</Text>
        <Text style={Authstyles.subtext}>
        Enter 6-digit code that you received on your phone number
        </Text>
      </View>
      <View style={styles.Cellview}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : '0')}
            </Text>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: wp(83),
          alignSelf: 'center',
          marginTop: hp(0.5),
        }}>
        <View style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
          {disabletimer == true ? (
            <CountdownCircleTimer
              size={40}
              strokeWidth={0}
              children={children}
              isPlaying
              duration={7}
              initialRemainingTime={15}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                setdisableTimer(false);
                // do your stuff here
                //return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
              }}>
              {({remainingTime}) => (
                <Text style={{color: 'black', fontSize: hp(2)}}>
                  {remainingTime}(s)
                </Text>
              )}
            </CountdownCircleTimer>
          ) : null}
        </View>
        {/* <TouchableOpacity
          disabled={disabletimer}
          onPress={() => setdisableTimer(true)}
          style={{marginLeft: wp(8)}}>
          <Text style={styles.Cellmaintext}>Resend Code</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.buttonview}>
        <CustomButtonhere
          title={'Submit'}
          widthset={80}
          topDistance={35}
          // loading={loading}
          // disabled={disable}
          onPress={() => 
            setModalVisible(true)
            //verifyno()
          }
        />
      </View>
      <CustomModal
        modalVisible={modalVisible}
        text={'Success'}
        btn_text={'Go to Home'}
        subtext={'Account Verified Successfully'}
        type={'single_btn'}
        onPress={() => {
          setModalVisible(false);
          //  navigation.navigate('CreateProfile');
          navigation.navigate('Drawerroute');
        }}
      />
    </SafeAreaView>
  );
};

export default Verification;
