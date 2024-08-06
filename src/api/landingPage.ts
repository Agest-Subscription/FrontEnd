import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  LandingPageFilterParams,
  LandingPagePayload,
  LandingPageResponseItem,
  PricingPlanGroupByPeriod,
} from "@/interfaces/model/landingPage.type";

export const getListLandingPageApi = (params: LandingPageFilterParams) => {
  return axiosClient.get<GetListResponse<LandingPageResponseItem>>(
    "landing_pages",
    {
      params,
    },
  );
};

export const addLandingPageApi = (data: { data: LandingPagePayload[] }) => {
  return axiosClient.post("landing_pages", data);
};

export const getListPricingPlanGroupByPeriodApi = (
  params: LandingPageFilterParams,
) => {
  return axiosClient.get<GetListResponse<PricingPlanGroupByPeriod>>(
    "landing_pages/recurrence_period",
    {
      params,
    },
  );
};
