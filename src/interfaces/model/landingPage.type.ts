import { FilterBase } from "../base";


export type recurrenceFee = {
  id: string;
  price: number;
}

export type PricingPlan = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  recurrence_fee: recurrenceFee;
  recurrence_period: string;
}

export type PricingPlanGroupByPeriod = {
  recurrence_period: string;
  pricing_plan: Pick<PricingPlan, "id" | "name">;
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
  recurrence_period: string;
  basic_plan_id: string | null;
  pro_plan_id: string | null;
  premium_plan_id: string | null;
};

export type LandingPageFormValues = { landing_page_items: LandingPageItem[] };

export type AddLandingPagePayload = LandingPageFormValues;
