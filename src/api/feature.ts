import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  AddFeaturePayload,
  FeatureFilterParams,
  FeatureResponseItem,
  UpdateFeaturePayload,
} from "@/interfaces/model/feature.type";

export const getListFeatureApi = (params: FeatureFilterParams) => {
  return axiosClient.get<GetListResponse<FeatureResponseItem>>(
    "features",
    {
      params,
    },
  );
};

export const getFeatureByIdApi = (id: string) => {
  return axiosClient.get<FeatureResponseItem>(`features/${id}`);
};

export const addFeatureApi = (data: AddFeaturePayload) => {
  return axiosClient.post("features", data);
};

export const updateFeatureApi = (data: UpdateFeaturePayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`features/${id}`, rest);
};

export const deleteFeatureApi = (id: string) => {
  return axiosClient.delete(`features/${id}`);
};
