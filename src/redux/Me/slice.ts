import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../store";

import { axiosClient } from "@/config/axios/client";
import { UserMe } from "@/interfaces/model/me";
type UserMeSate = {
  dataMe?: UserMe | null;
};
const initialState: UserMeSate = {
  dataMe: undefined,
};

const slice = createSlice({
  name: "userMeReducer",
  initialState,
  reducers: {
    setUserMe(state, action: PayloadAction<UserMe | null>) {
      state.dataMe = action.payload;
    },
  },
});

export const { setUserMe } = slice.actions;

export default slice.reducer;

export const getLeadStatuses = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await axiosClient.get("/user/me");
      const content: UserMe = result.data;

      // Dispatch action with the fetched user data
      dispatch(setUserMe(content));
    } catch (err) {
      console.log(err);
    }
  };
};
