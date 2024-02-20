import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailId: "" as string,
  orderData: {} as OrderResponse,
  filterReport: { pageNumber: 0, pageSize: 10 } as FilterReportData,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setDetailId: (state, action: PayloadAction<string>) => {
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
