import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    path: '',
    Profilepath: '',
    Coverpath: '',
  },
  reducers: {
    updateImagePath(state, action) {
      return action.payload;
    },
  },
});

export const { updateImagePath } = imageSlice.actions;

export default imageSlice.reducer;