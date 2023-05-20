import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState:{
    _user_id:0,
    _user_phone_no:'',
    phone_country_code:'',
    _jwt_token:'',
  },
  reducers: {
    updateAuth: (state, action) => {
      return action.payload;
    },
    setUserId(state, action) {
        state._user_id = action.payload;
      },
      setUserPhone_No(state, action) {
        state._user_phone_no = action.payload;
      },
      setUserPhone_Country_Code(state, action) {
        state.phone_country_code= action.payload;
      },
      setJWT_Token(state, action) {
        state._jwt_token = action.payload;
      },
  },
});

export const { setUserId,setUserPhone_No,setJWT_Token,setDevice_Token,setUserPhone_Country_Code} = AuthSlice.actions;
export default AuthSlice.reducer;