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
    removeArrayImage: (state, action) => {
      const index = state.item_images_array.findIndex(image => image === action.payload);
      if (index !== -1) {
        state.item_images_array.splice(index, 1);
      }
    },
  },
});

export const { updateImagesArrayPath,removeArrayImage } = imagesArraySlice.actions;

export default imagesArraySlice.reducer;