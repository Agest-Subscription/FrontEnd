import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  AddPermissionPayload,
  PermissionFilterParams,
  PermissionResponseItem,
  UpdatePermissionPayload,
} from "@/interfaces/model/permission/permission.type";

export const getListPermissionApi = (params: PermissionFilterParams) => {
  return axiosClient.get<GetListResponse<PermissionResponseItem>>(
    "permissions",
    {
      params,
    },
  );
};

export const getPermissionByIdApi = (id: string) => {
  return axiosClient.get<PermissionResponseItem>(`permissions/${id}`);
};

export const addPermissionApi = (data: AddPermissionPayload) => {
  return axiosClient.post("permissions", data);
};

export const updatePermissionApi = (data: UpdatePermissionPayload) => {
  const { permission_id, ...rest } = data;
  return axiosClient.put(`permissions/${permission_id}`, rest);
};

export const deletePermissionApi = (id: string) => {
  return axiosClient.delete(`permissions/${id}`);
};
