import { createSlice } from '@reduxjs/toolkit';

const EditProfileSlice = createSlice({
  name: 'editProfile',
  initialState:{
    edit_personal: true,
    edit_links: false,
    edit_Images: false,
  },
  reducers: {
    editPersonalMenu(state, action) {
        state.edit_personal = action.payload;
      },
      editLinksMenu(state, action) {
        state.edit_links = action.payload;
      },
      editImagesMenu(state, action) {
        state.edit_Images = action.payload;
      },
  },
});

export const {editPersonalMenu,editLinksMenu,editImagesMenu} = EditProfileSlice.actions;
export default EditProfileSlice.reducer;