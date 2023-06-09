import { createSlice } from '@reduxjs/toolkit';

const profileimageSlice = createSlice({
  name: 'profileimage',
  initialState: {
    Profilepath: '',
  },
  reducers: {
    updateProfileImagePath(state, action) {
      state.Profilepath = action.payload;
    }
  },
});

export const {updateProfileImagePath } = profileimageSlice.actions;

export default profileimageSlice.reducer;