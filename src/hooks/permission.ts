import { getListpermissionApi } from "@/api/permission";
import { PERMISSIONS } from "@/constants/query";
import { PermissionFilterParams } from "@/interfaces/model/permission/permission.type";
import { useQuery } from "@tanstack/react-query";

export const useGetListPermission = (params: PermissionFilterParams) => {
    return useQuery({
      queryKey: [PERMISSIONS, params],
      queryFn: () => getListpermissionApi(params),
      select: ({ data }) => data,
    });
  };