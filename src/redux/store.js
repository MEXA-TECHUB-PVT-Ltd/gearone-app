import {combineReducers, configureStore} from '@reduxjs/toolkit';

/////////reducer/////////////
import AuthSlice from './AuthSlice';
import LocationReducer from './LocationSlice';
import GenderReducer from './GenderSlice';
import ImagePathReducer from './ImagePathSlice'

export const Store = configureStore({
  reducer: {
    location: LocationReducer,
    gender: GenderReducer,
    image:ImagePathReducer,
    auth:AuthSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
});
