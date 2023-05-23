import { createSlice } from '@reduxjs/toolkit';

const imagesArraySlice = createSlice({
  name: 'imagesArray',
  initialState: {
    item_images_array: [],
  },
  reducers: {
    updateImagesArrayPath(state, action) {
      state.item_images_array = action.payload;
    },
  },
});

export const { updateImagesArrayPath } = imagesArraySlice.actions;

export default imagesArraySlice.reducer;