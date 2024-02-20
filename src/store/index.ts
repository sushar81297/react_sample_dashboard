import { combineReducers, configureStore } from "@reduxjs/toolkit";

import ReportSlice from "./ReportSlice";
import commonSlice from "./commonSlice";
import loginSlice from "./loginSlice";

const rootReducer = combineReducers({
  item: loginSlice,
  report: ReportSlice,
  common: commonSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
