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

export const getSubscriptionsByUserId = (id: string) => {
  return axiosClient.get<SubscriptionResponseItem[]>(
    `users/${id}/subscriptions`,
  );
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

type response = {
  is_first_time: boolean;
};
export const getCheckFirstTime = async (
  user_id: string,
  pricing_plan_id: string,
) => {
  const response = await axiosClient.get<response>(
    `subscriptions/check-first-time?user_id=${user_id}&pricing_plan_id=${pricing_plan_id}`,
  );
  if (response !== undefined) {
    return response;
  }
  throw new Error("No valid data received");
};
