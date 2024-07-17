import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addFeeApi,
  deleteFeeApi,
  getFeebyIdApi,
  getListFeesApi,
  updateFeeApi,
} from "@/api/fee";
import { FEE, FEES } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { FeeFilterParams } from "@/interfaces/model/fee.type";

export const useGetListFees = (params: FeeFilterParams) => {
  return useQuery({
    queryKey: [FEES, params],
    queryFn: () => getListFeesApi(params),
    select: ({ data }) => data,
  });
};

export const useGetFeeById = (id: string) => {
  return useQuery({
    queryKey: [FEE, id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error("Invalid id"));
      return getFeebyIdApi(id);
    },
    select: ({ data }) => data,
    enabled: !!id,
  });
};

export const useAddFee = () => {
  const queryClient = useQueryClient();
  return useMutation(addFeeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([FEES]);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUpdateFee = () => {
  const queryClient = useQueryClient();
  return useMutation(updateFeeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([FEES]);
      queryClient.invalidateQueries([FEE]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useDeleteFee = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFeeApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([FEES]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};
