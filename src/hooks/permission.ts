import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addPermissionApi,
  deletePermissionApi,
  getListPermissionApi,
  getPermissionByIdApi,
  updatePermissionApi,
} from "@/api/permission";
import { PERMISSION, PERMISSIONS } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { PermissionFilterParams } from "@/interfaces/model/permission.type";
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
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePermissionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([PERMISSIONS]);
      queryClient.invalidateQueries([PERMISSION]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePermissionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([PERMISSIONS]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};
