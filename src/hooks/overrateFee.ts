import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addOverrateFeeApi,
  deleteOverrateFeeApi,
  getListIsOverrateFeesApi,
  getListOverrateFeeApi,
  getOverrateFeeByIdApi,
  updateOverrateFeeApi,
} from "@/api/overrateFee";
import { OVERRATE_FEE, OVERRATE_FEES } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { FeeFilterParams } from "@/interfaces/model/fee.type";
import { OverrateFeeFilterParams } from "@/interfaces/model/overrateFee.type";
export const useGetListOverrateFee = (params: OverrateFeeFilterParams) => {
  return useQuery({
    queryKey: [OVERRATE_FEES, params],
    queryFn: () => getListOverrateFeeApi(params),
    select: ({ data }) => data,
  });
};

export const useGetOverrateFeeById = (id: string) => {
  return useQuery({
    queryKey: [OVERRATE_FEE, id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error("Invalid id"));
      return getOverrateFeeByIdApi(id);
    },
    select: ({ data }) => data,
    enabled: !!id,
  });
};

export const useAddOverrateFee = () => {
  const queryClient = useQueryClient();
  return useMutation(addOverrateFeeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([OVERRATE_FEES]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useUpdateOverrateFee = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOverrateFeeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([OVERRATE_FEES]);
      queryClient.invalidateQueries([OVERRATE_FEE]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useDeleteOverrateFee = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOverrateFeeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([OVERRATE_FEES]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useGetInfiniteIsOverrateFee = (params: FeeFilterParams) => {
  return useInfiniteQuery({
    queryKey: ["FEES", params],
    queryFn: ({ pageParam = 1 }) =>
      getListIsOverrateFeesApi({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.data.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};
