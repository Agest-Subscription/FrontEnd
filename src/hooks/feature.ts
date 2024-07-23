import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addFeatureApi,
  deleteFeatureApi,
  getFeatureByIdApi,
  getListFeatureApi,
  updateFeatureApi,
} from "@/api/feature";
import { FEATURE, FEATURES } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { FeatureFilterParams } from "@/interfaces/model/feature.type";

export const useGetListFeature = (params: FeatureFilterParams) => {
  return useQuery({
    queryKey: [FEATURES, params],
    queryFn: () => getListFeatureApi(params),
    select: ({ data }) => data,
  });
};
export const useGetInfiniteFeatures = (params: FeatureFilterParams) => {
  return useInfiniteQuery({
    queryKey: ["PERMISSIONS", params],
    queryFn: ({ pageParam = 1 }) =>
      getListFeatureApi({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.data.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};

export const useGetFeatureById = (id: string) => {
  return useQuery({
    queryKey: [FEATURE, id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error("Invalid id"));
      return getFeatureByIdApi(id);
    },
    select: ({ data }) => data,
    enabled: !!id,
  });
};

export const useAddFeature = () => {
  const queryClient = useQueryClient();
  return useMutation(addFeatureApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([FEATURES]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();
  return useMutation(updateFeatureApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([FEATURES]);
      queryClient.invalidateQueries([FEATURE]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFeatureApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([FEATURES]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};
