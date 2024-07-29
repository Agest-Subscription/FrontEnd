import { FilterBase } from "../base";
import { EnumStruct } from "../enum";
import { Fee } from "./fee.type";
import { OverrateFee } from "./overrateFee.type";

export type FreeTrialPeriod = "daily" | "weekly" | "monthly";

export type PricingPlan = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  price: number;
  description: string | null;
  is_free_trial: boolean;
  free_trial_period: FreeTrialPeriod | null;
  free_trial_period_count: number | null;
  recurrence_fee_id: string | null;
  is_active: boolean;
  features: FeatureListPayload[];
};

export type PricingPlanTableData = PricingPlan & {
  no: number;
};

export type PricingPlanLandingPage = PricingPlan;

export type PricingPlanFilterParams = FilterBase<PricingPlanTableData>;

export type PricingPlanFormValues = Omit<PricingPlan, "id" | "price">;

export type PricingPlanResponseItem = PricingPlan;

export type AddPricingPlanPayload = PricingPlanFormValues;

export type FeatureListPayload = {
  id?: number;
  feature_id: number;
  new_price: number | null;
  fee_id: number | null;
  overrate_fee?: {
    id: number;
    new_price: number;
  }[];
};

export type UpdatePricingPlanPayload = PricingPlan;

export const FreeTrialPeriodEnum = Object.freeze({
  daily: {
    label: "Daily",
    value: "daily",
  },
  weekly: {
    label: "Weekly",
    value: "weekly",
  },
  monthly: {
    label: "Monthly",
    value: "monthly",
  },
}) satisfies EnumStruct<FreeTrialPeriod>;

export type PricingPlanFeaturesType = {
  id: number;
  no: number;
  name: string;
  description: string | null;
  fee?: Fee | null;
  price: number | null;
  new_price: number | null;
  overrate: boolean | null;
  children?:
    | (OverrateFee[] & {
        new_price?: number | null;
      })
    | null;
};
