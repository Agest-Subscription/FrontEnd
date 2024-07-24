import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  AddLandingPagePayload,
  LandingPageFilterParams,
  LandingPageResponseItem,
  UpdateLandingPagePayload,
} from "@/interfaces/model/landingPage.type";

export const getListLandingPageApi = (params: LandingPageFilterParams) => {
  return axiosClient.get<GetListResponse<LandingPageResponseItem>>(
    "landingpages",
    {
      params,
    },
  );
};

export const getLandingPageByIdApi = (id: string) => {
  return axiosClient.get<LandingPageResponseItem>(`landingpages/${id}`);
};

export const addLandingPageApi = (data: AddLandingPagePayload) => {
  return axiosClient.post("landingpages", data);
};

export const updateLandingPageApi = (data: UpdateLandingPagePayload) => {
  const { id, ...rest } = data;
  return axiosClient.put(`landingpages/${id}`, rest);
};

export const deleteLandingPageApi = (id: string) => {
  return axiosClient.delete(`landingpages/${id}`);
};
