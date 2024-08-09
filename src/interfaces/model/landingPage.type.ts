import { FilterBase } from "../base";

export type Feature = {
  feature: { name: string };
};

export type recurrenceFee = {
  id: string;
  price: number;
};

export type PricingPlan = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  recurrence_fee: recurrenceFee;
  recurrence_period: string;
  description: string | null;
  feature_plan_fees: Feature[];
};

export type PricingPlanGroupByPeriod = {
  recurrence_period: string;
  pricing_plans: Pick<PricingPlan, "id" | "name">;
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
  basic: string | null;
  pro: string | null;
  premium: string | null;
};

export type LandingPageFormValues = {
  landing_page_items?: LandingPageItem[] | null;
};

export type LandingPagePayload = {
  pricing_plan_id: string;
  priority: string;
};
