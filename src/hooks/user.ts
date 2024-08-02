import {
  useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  
  import {
    getListUserApi,
    addUserApi,
    getUserByIdApi,
    updateUserApi,
    deleteUserApi
  } from "@/api/user";
  import { USER, USERS } from "@/constants/query";
  import { UserFilterParams } from "@/interfaces/model/user";
import { CustomError } from "@/interfaces/base";
  
  export const useGetListUser = (params: UserFilterParams) => {
    return useQuery({
      queryKey: [USERS, params],
      queryFn: () => getListUserApi(params),
      select: ({ data }) => data,
    });
  };

  export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation(addUserApi, {
      onSuccess: () => {
        queryClient.invalidateQueries([USERS]);
      },
      onError: (error: CustomError) => {
        return error;
      },
    });
  };

  export const useGetUserById = (id: string) => {
    return useQuery({
      queryKey: [USER, id],
      queryFn: () => {
        if (!id) return Promise.reject(new Error("Invalid id"));
        return getUserByIdApi(id);
      },
      select: ({ data }) => data,
      enabled: !!id,
    });
  };

  export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUserApi, {
      onSuccess: () => {
        queryClient.invalidateQueries([USERS]);
        queryClient.invalidateQueries([USER]);
      },
      onError: (error: CustomError) => {
        return error;
      },
    });
  };
  
  export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteUserApi, {
      onSuccess: () => {
        queryClient.invalidateQueries([USERS]);
      },
      onError: (error: CustomError) => {
        return error;
      },
    });
  };

  