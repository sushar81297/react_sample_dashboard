import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailId: {},
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setDetailId: (state, action: PayloadAction<Login>) => {
      state.detailId = action.payload;
    },
  },
});

export const { setDetailId } = reportSlice.actions;

export default reportSlice.reducer;
