import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import { FeeFilterParams } from "@/interfaces/model/fee.type";
import {
  AddOverrateFeePayload,
  IsOverratFee,
  OverrateFeeFilterParams,
  OverrateFeeResponseItem,
  UpdateOverrateFeePayload,
} from "@/interfaces/model/overrateFee.type";

export const getListOverrateFeeApi = (params: OverrateFeeFilterParams) => {
  return axiosClient.get<GetListResponse<OverrateFeeResponseItem>>("overrate", {
    params,
  });
};

export const getOverrateFeeByIdApi = (id: string) => {
  return axiosClient.get<OverrateFeeResponseItem>(`overrate/${id}`);
};

export const addOverrateFeeApi = (data: AddOverrateFeePayload) => {
  return axiosClient.post("overrate", data);
};

export const updateOverrateFeeApi = (data: UpdateOverrateFeePayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`overrate/${id}`, rest);
};

export const deleteOverrateFeeApi = (id: string) => {
  return axiosClient.delete(`overrate/${id}`);
};

export const getListIsOverrateFeesApi = (params: FeeFilterParams) => {
  return axiosClient.get<GetListResponse<IsOverratFee>>("overrate/fee/all", {
    params,
  });
};
