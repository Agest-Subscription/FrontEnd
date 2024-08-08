import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  AddPricingPlanPayload,
  PricingPlan,
  PricingPlanFilterParams,
  PricingPlanResponseItem,
  UpdatePricingPlanPayload,
} from "@/interfaces/model/pricingplan.type";

export const getListPricingPlansApi = (params: PricingPlanFilterParams) => {
  return axiosClient.get<GetListResponse<PricingPlan>>(
    "pricing-plans",
    {
    params,
  });
};

export const getPricingPlanbyIdApi = (id: string) => {
  return axiosClient.get<PricingPlanResponseItem>(`pricing-plans/${id}`);
};

export const addPricingPlanApi = (data: AddPricingPlanPayload) => {
  return axiosClient.post("pricing-plans", data);
};

export const updatePricingPlanApi = (data: UpdatePricingPlanPayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`pricing-plans/${id}`, rest);
};

export const deletePricingPlanApi = (id: string) => {
  return axiosClient.delete(`pricing-plans/${id}`);
};
