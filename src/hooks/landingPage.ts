import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addLandingPageApi,
  getListLandingPageApi,
  getPricingPlanGroupByPeriodApi,
} from "@/api/landingPage";
import { LANDING_PAGES } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { LandingPageFilterParams } from "@/interfaces/model/landingPage.type";

export const useGetListLandingPage = (params: LandingPageFilterParams) => {
  return useQuery({
    queryKey: [LANDING_PAGES, params],
    queryFn: () => getListLandingPageApi(params),
    select: ({ data }) => data,
  });
};

export const useAddLandingPage = () => {
  const queryClient = useQueryClient();
  return useMutation(addLandingPageApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([LANDING_PAGES]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useGetPricingPlanGroupByPeriod = () => {
  return useQuery({
    queryKey: [LANDING_PAGES],
    queryFn: () => getPricingPlanGroupByPeriodApi(),
    select: ({ data }) => data,
  });
};
