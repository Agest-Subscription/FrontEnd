import { AxiosInstance } from "axios";
import { axiosClient } from "./client";

export type GetAccessToken = () => Promise<string> | string;
  
export const addInterceptor = (
  clientInstance: AxiosInstance,
  getAccessToken: GetAccessToken,
) => {
  clientInstance.interceptors.request.use(async (config) => {
    if (config.headers.Authorization) return config;
    const accessToken = await getAccessToken();
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  clientInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error);
      return Promise.reject(error);
    },
  );
};

export const initHttpClient = (getAccessToken: GetAccessToken) => {
  addInterceptor(axiosClient, getAccessToken);
};
