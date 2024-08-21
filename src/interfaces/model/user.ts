import { FilterBase } from "../base";

export type UserModel = {
  id: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
};

export type UserTableData = Omit<UserModel, "is_admin"> & {
  last_login_date?: string;
};

export type UserResponseItem = UserModel & {
  password: string;
};

export type UserFormValues = Omit<UserResponseItem, "id"> & {
  password: string;
};

export type UserFilterParams = FilterBase<UserResponseItem> & {
  is_active?: boolean;
  had_subscriptions?: boolean;
};

export type AddUserPayload = UserFormValues;
export type UpdateUserPayload = UserModel & { password: string };
