import { useQuery } from "@tanstack/react-query";

import { getMeApi } from "@/api/me";
import { USER_ME } from "@/constants/query";

export const useGetMe = () => {
  return useQuery({
    queryKey: [USER_ME],
    queryFn: () => getMeApi(),
    select: ({ data }) => data,
  });
};
