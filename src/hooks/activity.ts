import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addActivityApi, getListActivityApi } from "@/api/activity";
import { LANDING_PAGES } from "@/constants/query";
import { CustomError } from "@/interfaces/base";
import { ActivityFilterParams } from "@/interfaces/model/activity.type";

export const useGetListActivity = (params: ActivityFilterParams) => {
  return useQuery({
    queryKey: [LANDING_PAGES, params],
    queryFn: () => getListActivityApi(params),
    select: ({ data }) => data,
  });
};

export const useAddActivity = () => {
  const queryClient = useQueryClient();
  return useMutation(addActivityApi, {
    onSuccess: () => {
      queryClient.invalidateQueries([LANDING_PAGES]);
    },
    onError: (error: CustomError) => {
      return error;
    },
  });
};
