import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addLandingPageApi,
  getListLandingPageApi,
  getListPricingPlanGroupByPeriodApi,
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

export const useGetInfiniteRecurrencePeriod = (
  params: LandingPageFilterParams,
) => {
  const [searchTerm, setSearchTerm] = useState("");

  const query = useInfiniteQuery({
    queryKey: [LANDING_PAGES, searchTerm, params],
    queryFn: ({ pageParam = 1 }) =>
      getListPricingPlanGroupByPeriodApi({
        ...params,
        page: pageParam,
        search: searchTerm,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.data.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
  return { ...query, setSearchTerm };
};
