import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addSubscriptionApi,
  deleteSubscriptionApi,
  getListSubscriptionApi,
  getSubscriptionByIdApi,
  updateSubscriptionApi,
} from "@/api/subscription";
import { getListUserApi } from "@/api/user";
import { SUBSCRIPTION, SUBSCRIPTIONS, USERS } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { SubscriptionFilterParams } from "@/interfaces/model/subscription.type";
import { UserFilterParams } from "@/interfaces/model/user";
export const useGetListSubscription = (params: SubscriptionFilterParams) => {
  return useQuery({
    queryKey: [SUBSCRIPTIONS, params],
    queryFn: () => getListSubscriptionApi(params),
    select: ({ data }) => data,
  });
};

export const useGetSubscriptionById = (id: string) => {
  return useQuery({
    queryKey: [SUBSCRIPTION, id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error("Invalid id"));
      return getSubscriptionByIdApi(id);
    },
    select: ({ data }) => data,
    enabled: !!id,
  });
};

export const useGetInfiniteUser = (params: UserFilterParams) => {
  const [searchTerm, setSearchTerm] = useState("");

  const query = useInfiniteQuery({
    queryKey: [USERS, searchTerm, params],
    queryFn: ({ pageParam = 1 }) =>
      getListUserApi({
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

export const useAddSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation(addSubscriptionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([SUBSCRIPTIONS]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSubscriptionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([SUBSCRIPTIONS]);
      queryClient.invalidateQueries([SUBSCRIPTION]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSubscriptionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([SUBSCRIPTIONS]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};
