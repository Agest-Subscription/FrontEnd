import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  ActivityFilterParams,
  ActivityPayload,
  ActivityResponseItem,
} from "@/interfaces/model/activity.type";

export const getListActivityApi = (params: ActivityFilterParams) => {
  return axiosClient.get<GetListResponse<ActivityResponseItem>>(
    "landing_pages",
    {
      params,
    },
  );
};

export const addActivityApi = (data: { data: ActivityPayload[] }) => {
  return axiosClient.post("landing_pages", data);
};

