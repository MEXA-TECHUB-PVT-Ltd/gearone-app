import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState:{
    _user_id:0,
    _user_email:'',
    _jwt_token:'',
    _user_password:'',
  },
  reducers: {
    updateAuth: (state, action) => {
      return action.payload;
    },
    setUserId(state, action) {
        state._user_id = action.payload;
      },
      setUserEmail(state, action) {
        state._user_email = action.payload;
      },
      setUserPassword(state, action) {
        state._user_password = action.payload;
      },
      setJWT_Token(state, action) {
        state._jwt_token = action.payload;
      },
  },
});

export const { setUserId,setUserEmail,setUserPassword,setJWT_Token,setDevice_Token} = AuthSlice.actions;
export default AuthSlice.reducer;