import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addPricingPlanApi,
  deletePricingPlanApi,
  getListPricingPlansApi,
  getPricingPlanbyIdApi,
  updatePricingPlanApi,
} from "@/api/pricingPlan";
import { PRICING_PLAN, PRICING_PLANS } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { PricingPlanFilterParams } from "@/interfaces/model/pricingplan.type";

export const useGetListPricingPlans = (params: PricingPlanFilterParams) => {
  return useQuery({
    queryKey: [PRICING_PLANS, params],
    queryFn: () => getListPricingPlansApi(params),
    select: ({ data }) => data,
  });
};

export const useGetPricingPlanById = (id: string) => {
  return useQuery({
    queryKey: [PRICING_PLAN, id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error("Invalid id"));
      return getPricingPlanbyIdApi(id);
    },
    select: ({ data }) => data,
    enabled: !!id,
  });
};

export const useAddPricingPlan = () => {
  const queryClient = useQueryClient();
  return useMutation(addPricingPlanApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([PRICING_PLANS]);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUpdatePricingPlan = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePricingPlanApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([PRICING_PLANS]);
      queryClient.invalidateQueries([PRICING_PLAN]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};

export const useDeletePricingPlan = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePricingPlanApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([PRICING_PLANS]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};
