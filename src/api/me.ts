import { axiosClient } from "@/config/axios/client";

export const getMeApi = () => {
  return axiosClient.get("user/me");
};
