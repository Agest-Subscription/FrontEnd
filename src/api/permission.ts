import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  PermissionFilterParams,
  PermissionResponseItem,
  UpdatePermissionPayload,
} from "@/interfaces/model/permission.type";

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

export const addPermissionApi = () => {
  return axiosClient.post("permissions");
};

export const updatePermissionApi = (data: UpdatePermissionPayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`permissions/${id}`, rest);
};

export const deletePermissionApi = (id: string) => {
  return axiosClient.delete(`permissions/${id}`);
};
