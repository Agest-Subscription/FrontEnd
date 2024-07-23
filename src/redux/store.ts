import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authentication/slice";
import getMeReducer from "./Me/slice";

// define reducer for rtk
export const store = configureStore({
  reducer: {
    authReducer,
    getMeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
