import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthenticationState } from "@/interfaces/model/authentications";
import { UserModel } from "@/interfaces/model/user";

const initialState: AuthenticationState = {
  accessToken: undefined,
  refreshToken: undefined,
  currentUser: undefined,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserModel | null>) {
      state.currentUser = action.payload;
    },
  },
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
