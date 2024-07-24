import { FilterBase } from "../base";

export type LandingPage = {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  is_active: boolean;
};

export type LandingPageTableData = Omit<LandingPage, "is_active"> & {
  no: number;
};

export type LandingPageResponseItem = LandingPage;

export type LandingPageFilterParams = FilterBase<LandingPageResponseItem> & {
  is_active?: boolean;
};

export type LandingPageFormValues = Omit<LandingPage, "id">;

export type AddLandingPagePayload = LandingPageFormValues;

export type UpdateLandingPagePayload = LandingPage;
