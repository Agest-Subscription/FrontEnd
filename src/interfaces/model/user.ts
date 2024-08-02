import { FilterBase } from "../base";

export type UserModel = {
  id: string;
  email: string;
  is_admin: boolean;
};

export type UserTableData = Omit<UserModel, "is_admin" > & {
  is_active: boolean;
  last_login_date: string;
};

export type UserResponseItem = UserModel & {
  is_active: boolean;
};;

export type UserFormValues = Omit<UserResponseItem, "id">

export type UserFilterParams = FilterBase<UserResponseItem> & {
  is_active?: boolean;
}

export type AddUserPayload = UserFormValues
export type UpdateUserPayload = UserResponseItem