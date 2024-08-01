import { FilterBase } from "../base";

export type Fee = {
  id: string;
  price: number;
};

export type PricingPlan = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  recurrence_fee: Fee;
  recurrence_period: string;
};

export type LandingPage = {
  id: string;
  pricing_plan: PricingPlan;
  priority: "basic" | "pro" | "premium";
};

export type LandingPageTableData = LandingPage & {
  no: number;
};

export type LandingPageResponseItem = LandingPage;

export type LandingPageFilterParams = FilterBase<LandingPageResponseItem>;

export type LandingPageItem = {
  period: string;
  basic_plan_id: string | "";
  pro_plan_id: string | "";
  premium_plan_id: string | "";
};

export type LandingPageFormValues = { landing_page_items: LandingPageItem[] };

export type AddLandingPagePayload = LandingPageFormValues;
