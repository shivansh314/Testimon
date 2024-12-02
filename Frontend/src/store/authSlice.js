import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;   // Correctly update state
      state.userData = action.payload.userData;   // Correctly update userData
    },

    logout: (state) => {
      state.status = false;  // Correctly update status
      state.userData = null;  // Correctly reset userData
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
