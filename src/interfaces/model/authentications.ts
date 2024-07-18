import { UserModel } from "./user";

export type AuthenticationState = {
  currentUser?: UserModel | null;
  accessToken?: string | null;
  refreshToken?: string;
};
