import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import { FeeFilterParams } from "@/interfaces/model/fee.type";
import {
  AddOverrateFeePayload,
  IsOverrateFee,
  OverrateFeeFilterParams,
  OverrateFeeResponseItem,
  UpdateOverrateFeePayload,
} from "@/interfaces/model/overrateFee.type";

export const getListOverrateFeeApi = (params: OverrateFeeFilterParams) => {
  return axiosClient.get<GetListResponse<OverrateFeeResponseItem>>(
    "overrates",
    {
      params,
    },
  );
};

export const getOverrateFeeByIdApi = (id: string) => {
  return axiosClient.get<OverrateFeeResponseItem>(`overrates/${id}`);
};

export const addOverrateFeeApi = (data: AddOverrateFeePayload) => {
  return axiosClient.post("overrates", data);
};

export const updateOverrateFeeApi = (data: UpdateOverrateFeePayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`overrates/${id}`, rest);
};

export const deleteOverrateFeeApi = (id: string) => {
  return axiosClient.delete(`overrates/${id}`);
};

export const getListIsOverrateFeesApi = (params: FeeFilterParams) => {
  return axiosClient.get<GetListResponse<IsOverrateFee>>("overrates/fee/all", {
    params,
  });
};
