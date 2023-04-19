import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    name: '',
    latitude: null,
    longitude: null,
  },
  reducers: {
    updateLocation: (state, action) => {
      state.name = action.payload.name;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { updateLocation } = locationSlice.actions;

export default locationSlice.reducer;