import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  AddSubscriptionPayload,
  SubscriptionFilterParams,
  SubscriptionResponseItem,
  UpdateSubscriptionPayload,
} from "@/interfaces/model/subscription.type";

export const getListSubscriptionApi = (params: SubscriptionFilterParams) => {
  return axiosClient.get<GetListResponse<SubscriptionResponseItem>>(
    "subscriptions",
    {
      params,
    },
  );
};

export const getSubscriptionByIdApi = (id: string) => {
  return axiosClient.get<SubscriptionResponseItem>(`subscriptions/${id}`);
};

export const addSubscriptionApi = (data: AddSubscriptionPayload) => {
  return axiosClient.post("subscriptions", data);
};

export const updateSubscriptionApi = (data: UpdateSubscriptionPayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`subscriptions/${id}`, rest);
};

export const deleteSubscriptionApi = (id: string) => {
  return axiosClient.delete(`subscriptions/${id}`);
};

export const getCheckFirstTime = (user_id: string, pricing_plan_id: string) => {
  return axiosClient.get<boolean>(`subscriptions/check-first-time?user_id=${user_id}&pricing_plan_id=${pricing_plan_id}`);
};