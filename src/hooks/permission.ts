import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addPermissionApi,
  deletePermissionApi,
  getListPermissionApi,
  getPermissionByIdApi,
  updatePermissionApi,
} from "@/api/permission";
import { PERMISSION, PERMISSIONS } from "@/constants/query";
import { PermissionFilterParams } from "@/interfaces/model/permission/permission.type";

export const useGetListPermission = (params: PermissionFilterParams) => {
  return useQuery({
    queryKey: [PERMISSIONS, params],
    queryFn: () => getListPermissionApi(params),
    select: ({ data }) => data,
  });
};

export const useGetPermissionById = (id: string) => {
  return useQuery({
    queryKey: [PERMISSION, id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error("Invalid id"));
      return getPermissionByIdApi(id);
    },
    select: ({ data }) => data,
    enabled: !!id,
  });
};

export const useAddPermission = () => {
  const queryClient = useQueryClient();
  return useMutation(addPermissionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([PERMISSIONS]);
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePermissionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([PERMISSIONS]);
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePermissionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([PERMISSIONS]);
    },
  });
};
