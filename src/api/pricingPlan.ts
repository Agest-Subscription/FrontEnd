import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  AddPricingPlanPayload,
  PricingPlanFilterParams,
  PricingPlanResponseItem,
  UpdatePricingPlanPayload,
} from "@/interfaces/model/pricingplan.type";

export const getListPricingPlansApi = (params: PricingPlanFilterParams) => {
  return axiosClient.get<GetListResponse<PricingPlanResponseItem>>("pricingplans", {
    params,
  });
};

export const getPricingPlanbyIdApi = (id: string) => {
  return axiosClient.get<PricingPlanResponseItem>(`pricingplans/${id}`);
};

export const addPricingPlanApi = (data: AddPricingPlanPayload) => {
  return axiosClient.post("pricingplans", data);
};

export const updatePricingPlanApi = (data: UpdatePricingPlanPayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`pricingplans/${id}`, rest);
};

export const deletePricingPlanApi = (id: string) => {
  return axiosClient.delete(`pricingplans/${id}`);
};
