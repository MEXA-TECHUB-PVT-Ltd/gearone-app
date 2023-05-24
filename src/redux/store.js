import {combineReducers, configureStore} from '@reduxjs/toolkit';

/////////reducer/////////////
import AuthSlice from './AuthSlice';
import LocationReducer from './LocationSlice';
import GenderReducer from './GenderSlice';
import ImagePathReducer from './ImagePathSlice'
import CreateProfileReducer from './CreateProfileSlice'
import EditProfileReducer from './EditprofileSlice'
import EmojiReducer from './EmojiSlice'
import ImageArrayReducer from './ImagesArray'
import ItemReducer from './ItemSlice'

export const Store = configureStore({
  reducer: {
    location: LocationReducer,
    gender: GenderReducer,
    image:ImagePathReducer,
    auth:AuthSlice,
    createProfile:CreateProfileReducer,
    editProfile:EditProfileReducer,
    emoji:EmojiReducer,
    imagesArray:ImageArrayReducer,
    ItemDetail:ItemReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
});
