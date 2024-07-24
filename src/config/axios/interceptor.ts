import { AxiosInstance } from "axios";

import { axiosClient } from "./client";
import { signOut } from "next-auth/react";

export type GetAccessToken = () => Promise<string | null>;

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
      // const prevRequest = error?.config;
      // const { detail } = error.response.data;

      // if (error.response.status === 401 && !prevRequest?._retry) {
      //   try {
      //     console.log("token refresh");
      //     prevRequest._retry = true;
      //     await refreshToken();
      //     const accessToken = await getAccessToken();
      //     console.log("accesTokken inter: ", accessToken);

      //     if (accessToken) {
      //       prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      //       return clientInstance.request(prevRequest);
      //     }
      //   } catch (error) {
      //     console.log("error: ", error);

      //     signOut();

      //     return Promise.reject(error);
      //   }
      // }
      return Promise.reject(error);
    },
  );
};

export const initHttpClient = (getAccessToken: GetAccessToken) => {
  addInterceptor(axiosClient, getAccessToken);
};
