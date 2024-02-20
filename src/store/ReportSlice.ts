import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailId: {},
  orderData: {} as OrderResponse,
  filterReport: {} as FilterReportData,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setDetailId: (state, action: PayloadAction<Login>) => {
      state.detailId = action.payload;
    },
    setOrderData: (state, action: PayloadAction<OrderResponse>) => {
      state.orderData = action.payload;
    },
    setFilterReport: (state, action: PayloadAction<FilterReportData>) => {
      state.filterReport = action.payload;
    },
  },
});

export const { setDetailId, setOrderData, setFilterReport } =
  reportSlice.actions;

export default reportSlice.reducer;
