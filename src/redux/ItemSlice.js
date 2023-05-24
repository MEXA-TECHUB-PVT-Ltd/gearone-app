import { createSlice } from '@reduxjs/toolkit';

const ItemSlice = createSlice({
  name: 'item',
  initialState: {
    name: '',
    id: ''
  },
  reducers: {
    setItemDetail: (state, action) => {
      return action.payload;
    },
  },
});

export const { setItemDetail } = ItemSlice.actions;

export default ItemSlice.reducer;