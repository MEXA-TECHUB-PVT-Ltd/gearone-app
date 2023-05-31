import { createSlice } from '@reduxjs/toolkit';

const ItemSlice = createSlice({
  name: 'item',
  initialState: {
    id: '',
    navplace:''
  },
  reducers: {
    setItemDetail: (state, action) => {
      return action.payload;
    },
  },
});

export const { setItemDetail } = ItemSlice.actions;

export default ItemSlice.reducer;