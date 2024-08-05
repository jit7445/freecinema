import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user:null,
  isLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true; 
    },
    loginSuccess(state, action) {
      state.user = action.payload; 
      state.loading = false; 
      state.isLoggedIn = true; 
    },
    loginFailure(state) {
      state.loading = false; 
      state.isLoggedIn = false; 
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false; 
    }
  }
});


export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;


export default userSlice.reducer;
