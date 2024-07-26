import { FilterBase } from "../base";

export type LandingPage = {
  id: string;
  name: string;
  start_date: string;
  end_date: string | null;
  fee_price: number;
  period: string;
  basic_plan_id: string | null;
  pro_plan_id: string | null;
  premium_plan_id: string | null;
};

export type LandingPageTableData = Omit<
  LandingPage,
  "basic_plan_id" | "pro_plan_id" | "premium_plan_id"
> & {
  no: number;
};

export type LandingPageResponseItem = Omit<
  LandingPage,
  "basic_plan_id" | "pro_plan_id" | "premium_plan_id"
>;

export type LandingPageFilterParams = FilterBase<LandingPageResponseItem>;

export type UpdateLandingPagePayload = LandingPage;

export type LandingPageItemArray = Pick<
  LandingPage,
  "period" | "basic_plan_id" | "pro_plan_id" | "premium_plan_id"
>;

export type LandingPageFormValues = Omit<
  LandingPage,
  "period" | "basic_plan_id" | "pro_plan_id" | "premium_plan_id"
> & {
  landing_page_items: LandingPageItemArray[];
};

export type AddLandingPagePayload = LandingPageFormValues
