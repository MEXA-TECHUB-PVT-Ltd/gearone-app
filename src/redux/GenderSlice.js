import { createSlice } from '@reduxjs/toolkit';

const genderSlice = createSlice({
  name: 'gender',
  initialState: {
    name: '',
    value: ''
  },
  reducers: {
    updateGender: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateGender } = genderSlice.actions;

export default genderSlice.reducer;