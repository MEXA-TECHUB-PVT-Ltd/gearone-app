import { createSlice } from '@reduxjs/toolkit';

const coverimageSlice = createSlice({
  name: 'coverimage',
  initialState: {
    Coverpath: '',
  },
  reducers: {
    updateCoverImagePath(state, action) {
      state.Coverpath = action.payload;
    },
  },
});

export const {updateCoverImagePath} = coverimageSlice.actions;

export default coverimageSlice.reducer;