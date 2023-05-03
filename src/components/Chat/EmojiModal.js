import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';

/////////////////////picker emoji/////////
import EmojiPicker from 'react-native-emoji-picker-staltz';

/////////////redux////
import {useDispatch} from 'react-redux';
import {updateEmoji} from '../../redux/EmojiSlice';

//////////////app colors////////
import Colors from '../../utills/Colors';

///////////height and width//////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const EmojiSelector = props => {
  /////////redux variable////
  const dispatch = useDispatch();

  /////emoji function/////////
  const emojiSelected = emoji => {
    //console.log(emoji)
    dispatch(updateEmoji(emoji));
  };
  return (
    <View style={styles.container}>
      <Modal
        visible={props.modal_open}
        transparent={true}
        containerStyle={{position: 'absolute', bottom: 0}}>
        <EmojiPicker
          onEmojiSelected={emojiSelected}
          rows={7}
          hideClearButton={false}
          onPressOutside={props.modal_close}
          localizedCategories={[
            // Always in this order:
            'Smileys and emotion',
            'People and body',
            'Animals and nature',
            'Food and drink',
            'Activities',
            'Travel and places',
            'Objects',
            'Symbols',
          ]}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //height: hp(30),
    //width: wp(100),
  },
});

export default EmojiSelector;
