import { UserModel } from "./user";

export type AuthenticationState = {
  currentUser?: UserModel | null;
  accessToken?: string | null;
  refreshToken?: string;
};

export type AuthModal = {
  id: number;
  email: string;
  is_admin: boolean;
  authenticate: Authenticate;
};

export type Authenticate = {
  access_token: string;
  refresh_token: string;
};
