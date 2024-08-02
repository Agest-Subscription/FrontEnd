import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  UserFilterParams,
  UserResponseItem,
  AddUserPayload,
  UpdateUserPayload,
} from "@/interfaces/model/user";

export const getListUserApi = (params: UserFilterParams) => {
  return axiosClient.get<GetListResponse<UserResponseItem>>("users", {
    params,
  });
};

export const getUserByIdApi = (id: string) => {
  return axiosClient.get<UserResponseItem>(`users/${id}`);
};

export const addUserApi = (data: AddUserPayload) => {
  return axiosClient.post("users", data);
};

export const updateUserApi = (data: UpdateUserPayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`users/${id}`, rest);
};

export const deleteUserApi = (id: string) => {
  return axiosClient.delete(`users/${id}`);
};