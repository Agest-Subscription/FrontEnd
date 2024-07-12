import { createSelector } from "@reduxjs/toolkit";

import { ReduxStoreState } from "../hooks";

export const selectIsAuthenticated = createSelector(
  (state: ReduxStoreState) => {
    return state.authentication.currentUser;
  },
  (user) => {
    if (!user) return false;

    return true;
  },
);
