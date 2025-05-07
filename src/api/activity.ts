import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  ActivityFilterParams,
  ActivityResponseItem,
  AddActivityPayload,
} from "@/interfaces/model/activity.type";

export const getListActivityApi = (params: ActivityFilterParams) => {
  return axiosClient.get<GetListResponse<ActivityResponseItem>>("activities", {
    params,
  });
};

export const addActivityApi = (data: AddActivityPayload) => {
  return axiosClient.post("activities", data);
};
