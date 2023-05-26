import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

///////navigation////
import {useNavigation} from '@react-navigation/native';

////////////app pakages////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';

///////////////app styles//////////////////
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {updateImagePath} from '../../redux/ImagePathSlice';
import {updateImagesArrayPath} from '../../redux/ImagesArray';

//////////////app pakages//////////////////
import ImagePicker from 'react-native-image-crop-picker';

///////colors///////
import Colors from '../../utills/Colors';

const CamerBottomSheet = props => {
  const navigation = useNavigation();

  /////////////redux states///////
  const dispatch = useDispatch();
  const imagearray = useSelector(state => state.imagesArray.item_images_array);

  //////////////////////cameraimage//////////////////
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      //cropping: true,
      compressImageQuality: 0.7,
      multiple: props.type === 'multiplepic' ? true : false,
      maxFiles: 5 - imagearray.length,
    }).then(image => {
      {
        props.type === 'multiplepic'
          ? dispatch(updateImagesArrayPath([...imagearray, image.path]))
          : props.type === 'onepic' && props.from === 'profile'
          ? dispatch(
              updateImagePath({
                path: '',
                Profilepath: image.path,
              }),
            )
          : props.type === 'onepic' && props.from === 'cover'
          ? dispatch(
              updateImagePath({
                path: '',
                Coverpath: image.path,
              }),
            )
          : dispatch(
              updateImagePath({
                path: image.path,
                Profilepath: image.path,
                Coverpath: image.path,
              }),
            );
      }

      {
        props.type === 'onepic' && props.from === 'profile'
          ? props.onpress()
          : props.type === 'onepic' && props.from === 'cover'
          ? props.onpress()
          : props.refRBSheet.current.close();
      }
    });
  };
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      //cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      {
        props.type === 'multiplepic'
          ? dispatch(updateImagesArrayPath([...imagearray, image.path]))
          : props.type === 'onepic' && props.from === 'profile'
          ? dispatch(
              updateImagePath({
                path: '',
                Profilepath: image.path,
                Coverpath: '',
              }),
            )
          : props.type === 'onepic' && props.from === 'cover'
          ? dispatch(
              updateImagePath({
                path: '',
                Profilepath: '',
                Coverpath: image.path,
              }),
            )
          : dispatch(
              updateImagePath({
                path: image.path,
                Profilepath: image.path,
                Coverpath: image.path,
              }),
            );
      }
      {
        props.type === 'onepic' && props.from === 'profile'
          ? props.onpress()
          : props.type === 'onepic' && props.from === 'cover'
          ? props.onpress()
          : props.refRBSheet.current.close();
      }
    });
  };
  return (
    <RBSheet
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      animationType="fade"
      minClosingHeight={0}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        },
        draggableIcon: {
          backgroundColor: Colors.AppBckGround_color,
        },
        container: {
          borderTopLeftRadius: wp(8),
          borderTopRightRadius: wp(8),
          height: hp(25),
          backgroundColor: Colors.AppBckGround_color,
        },
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: wp(8),
          alignItems: 'center',
        }}>
        <Text style={styles.maintext}>Upload Image</Text>
        <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
          <Ionicons
            name="close"
            size={22}
            color={'white'}
            onPress={() => props.refRBSheet.current.close()}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: 'center',
          marginTop: hp(3),
          backgroundColor: Colors.AppBckGround_color,
        }}>
        <TouchableOpacity
          onPress={() => {
            takePhotoFromCamera();
            props.refRBSheet.current.close();
          }}
          style={styles.modaltextview}>
          <Ionicons name="camera" size={25} color={'white'} />
          <Text style={styles.optiontext}>Upload from Camera</Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'rgba(255, 255, 255, 0.60)',
            borderBottomWidth: hp(0.1),
            width: wp(85),
            alignSelf: 'center',
            marginBottom: hp(2),
            marginTop: hp(2),
          }}></View>
        <TouchableOpacity
          onPress={() => {
            choosePhotoFromLibrary(), props.refRBSheet.current.close();
          }}
          style={styles.modaltextview}>
          <Ionicons name="image" size={25} color={'white'} />
          <Text style={styles.optiontext}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default CamerBottomSheet;
