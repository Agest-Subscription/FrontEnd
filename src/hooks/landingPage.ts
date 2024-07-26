import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addLandingPageApi,
  deleteLandingPageApi,
  getLandingPageByIdApi,
  getListLandingPageApi,
  updateLandingPageApi,
} from "@/api/landingPage";
import { LANDING_PAGE, LANDING_PAGES } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { LandingPageFilterParams } from "@/interfaces/model/landingPage.type";
export const useGetListLandingPage = (params: LandingPageFilterParams) => {
  return useQuery({
    queryKey: [LANDING_PAGES, params],
    queryFn: () => getListLandingPageApi(params),
    select: ({ data }) => data,
  });
};

export const useGetInfiniteLandingPage = (params: LandingPageFilterParams) => {
  return useInfiniteQuery({
    queryKey: ["LANDING_PAGE", params],
    queryFn: ({ pageParam = 1 }) =>
      getListLandingPageApi({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.data.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};

export const useGetLandingPageById = (id: string) => {
  return useQuery({
    queryKey: [LANDING_PAGE, id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error("Invalid id"));
      return getLandingPageByIdApi(id);
    },
    select: ({ data }) => data,
    enabled: !!id,
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

export const useUpdateLandingPage = () => {
  const queryClient = useQueryClient();
  return useMutation(updateLandingPageApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([LANDING_PAGES]);
      queryClient.invalidateQueries([LANDING_PAGE]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useDeleteLandingPage = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteLandingPageApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([LANDING_PAGES]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};
