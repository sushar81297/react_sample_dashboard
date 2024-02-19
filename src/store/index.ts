import { combineReducers, configureStore } from "@reduxjs/toolkit";

import ReportSlice from "./ReportSlice";
import loginSlice from "./loginSlice";

const rootReducer = combineReducers({
  item: loginSlice,
  report: ReportSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
