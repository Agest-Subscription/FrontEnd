import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  PermissionFilterParams,
  PermissionResponseItem,
} from "@/interfaces/model/permission/permission.type";

export const getListpermissionApi = (params: PermissionFilterParams) => {
  return axiosClient.get<GetListResponse<PermissionResponseItem>>(
    "permissions",
    {
      params,
    },
  );
};
