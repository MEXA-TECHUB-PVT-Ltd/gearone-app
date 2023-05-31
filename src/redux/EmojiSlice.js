import { createSlice } from '@reduxjs/toolkit';

const EmojiSlice = createSlice({
  name: 'emoji',
  initialState: {
    emoji_name: null,
  },
  reducers: {
    updateEmoji: (state, action) => {
        state.emoji_name =  action.payload;
    },
  },
});

export const { updateEmoji } = EmojiSlice.actions;

export default EmojiSlice.reducer;