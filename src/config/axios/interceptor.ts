import { AxiosInstance } from "axios";

import { axiosClient } from "./client";

export type GetAccessToken = () => Promise<string | null>;

export const addInterceptor = (
  clientInstance: AxiosInstance,
  getAccessToken: GetAccessToken,
  refreshToken: () => Promise<void>,
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
      const originalRequest = error.config;
      const { detail } = error.response.data;

      originalRequest._retry = false;
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        detail === "Fail!, Access token expired"
      ) {
        originalRequest._retry = true;
        try {
          await refreshToken();
          return clientInstance.request(error.config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
};

export const initHttpClient = (
  getAccessToken: GetAccessToken,
  refreshToken: () => Promise<void>,
) => {
  addInterceptor(axiosClient, getAccessToken, refreshToken);
};
