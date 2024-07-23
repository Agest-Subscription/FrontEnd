import { FilterBase } from "../base";
import { EnumStruct } from "../enum";
import { Feature } from "./feature.type";

export type FreeTrialPeriod = "daily" | "weekly" | "monthly";

export type PricingPlan = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  price: number;
  description: string | null;
  features: Feature[];
  is_free_trial: boolean;
  free_trial_period: FreeTrialPeriod | null;
  free_trial_period_count: number | null;
  is_active: boolean;
};

export type PricingPlanTableData = PricingPlan & {
  no: number;
};

export type PricingPlanLandingPage = PricingPlan 

export type PricingPlanFilterParams = FilterBase<PricingPlanTableData>;

export type PricingPlanFormValues = Omit<
  PricingPlan,
  "id" | "price" | "features"
>;

export type PricingPlanResponseItem = PricingPlan;

export type AddPricingPlanPayload = PricingPlanFormValues;

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
