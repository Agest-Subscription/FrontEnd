import { FilterBase } from "../base";
import { EnumStruct } from "../enum";
import { Feature } from "./feature.type";
import { Fee } from "./fee.type";
import { OverrateFee } from "./overrateFee.type";

export type FreeTrialPeriod = "day" | "week" | "month";

export type PricingPlan = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  price: number;
  description: string | null;
  has_free_trial: boolean;
  free_trial_period: FreeTrialPeriod | null;
  free_trial_period_count: number | null;
  recurrence_fee_id: string | null;
  is_active: boolean;
  features: PricingPlanFeatureList[];
};

export type PricingPlanTableData = PricingPlan & {
  no: number;
};

export type PricingPlanLandingPage = PricingPlan;

export type PricingPlanFilterParams = FilterBase<PricingPlanTableData>;

export type PricingPlanFormValues = Omit<
  PricingPlan,
  "id" | "price" | "features"
>;

export type PricingPlanResponseItem = PricingPlan;

export type AddPricingPlanPayload = PricingPlanFormValues & {
  features: FeatureListPayload[];
};

export type FeatureListPayload = {
  id?: string;
  feature_id: string;
  new_price: number | null;
  fee_id: string | null;
  feature_plan_fee_new_overrate?: {
    fee_overrate_id: string;
    new_overrate_price?: number | null;
  }[];
};

export type PricingPlanFeatureList = {
  feature: Feature;
  new_price: number | null;
  fee: Fee | null;
  feature_plan_fee_new_overrate: {
    fee_overrate: OverrateFee;
    new_overrate_price: number | null;
  } | null;
};

export type UpdatePricingPlanPayload = PricingPlan;

export const FreeTrialPeriodEnum = Object.freeze({
  day: {
    label: "Day",
    value: "day",
  },
  week: {
    label: "Week",
    value: "week",
  },
  month: {
    label: "Month",
    value: "month",
  },
}) satisfies EnumStruct<FreeTrialPeriod>;
export type OverrateFeeWithNewPrice = OverrateFee & {
  new_price?: number | null;
};

export type PricingPlanFeaturesType = {
  id: string;
  no: number;
  name: string;
  description: string | null;
  fee?: Fee | null;
  price: number | null;
  new_price: number | null;
  overrate: boolean | null;
  children?: OverrateFeeWithNewPrice[] | null;
};
