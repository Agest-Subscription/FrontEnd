import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  AddFeePayload,
  FeeFilterParams,
  FeeResponseItem,
  UpdateFeePayload,
} from "@/interfaces/model/fee.type";

export const getListFeesApi = (params: FeeFilterParams) => {
  return axiosClient.get<GetListResponse<FeeResponseItem>>("fees", {
    params,
  });
};

export const getFeebyIdApi = (id: string) => {
  return axiosClient.get<FeeResponseItem>(`fees/${id}`);
};

export const addFeeApi = (data: AddFeePayload) => {
  return axiosClient.post("fees", data);
};

export const updateFeeApi = (data: UpdateFeePayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`fees/${id}`, rest);
};

export const deleteFeeApi = (id: string) => {
  return axiosClient.delete(`fees/${id}`);
};
