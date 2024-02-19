import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<Login>) => {
      console.log(action.payload, "action payload");
      state.loginData = action.payload;
    },
  },
});

export const { setLoginData } = loginSlice.actions;

export default loginSlice.reducer;
