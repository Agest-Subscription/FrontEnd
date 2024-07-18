import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, UnknownAction } from "@reduxjs/toolkit";

import { AuthenticationState } from "@/interfaces/model/authentications";
import type { AppDispatch, RootState } from "@/redux/store";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type ReduxStoreState = {
  authentication: AuthenticationState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxStoreState,
  unknown,
  UnknownAction
>;
