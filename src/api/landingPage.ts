import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  AddLandingPagePayload,
  LandingPageFilterParams,
  LandingPageResponseItem,
} from "@/interfaces/model/landingPage.type";

export const getListLandingPageApi = (params: LandingPageFilterParams) => {
  return axiosClient.get<GetListResponse<LandingPageResponseItem>>(
    "landing_pages",
    {
      params,
    },
  );
};

export const addLandingPageApi = (data: AddLandingPagePayload) => {
  return axiosClient.post("landing_pages", data);
};