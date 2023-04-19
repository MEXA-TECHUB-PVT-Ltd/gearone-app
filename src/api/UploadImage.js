////////////////api////////////////
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
 
 
 /////////////////image api calling///////////////
 export const post_UploadImage = async props => {
    var user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    const formData = new FormData();
    formData.append('image_type', 'barber_profile_image');
    formData.append('image', {
      uri: props,
      type: 'image/jpg',
      name: 'image.jpg',
    });
    return fetch(BASE_URL + 'imageUpload/upload?current_user_id=' + user_id, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })

  };