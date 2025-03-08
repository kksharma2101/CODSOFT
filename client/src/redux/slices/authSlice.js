import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    login: (state, action) => {
      (state.isLoggedIn = true), (state.user = action.payload);
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
