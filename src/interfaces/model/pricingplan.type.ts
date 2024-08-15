import { FilterBase } from "../base";
import { EnumStruct } from "../enum";
import { Feature } from "./feature.type";
import { Fee } from "./fee.type";
import { OverrateFee } from "./overrateFee.type";
import { Permission } from "./permission.type";

export type FreeTrialPeriod = "day" | "week" | "month";

export const FreeTrialPeriodEnum = Object.freeze({
  day: { label: "Day", value: "day" },
  week: { label: "Week", value: "week" },
  month: { label: "Month", value: "month" },
}) satisfies EnumStruct<FreeTrialPeriod>;

export type OverrateFeeWithNewPrice = OverrateFee & {
  new_price?: number | null;
  feature_id: string;
};

export type OverrateFeeAssociation = OverrateFee & {
  new_overrate_price: number | null;
  new_price?: number | null;
};

export type PricingPlanFeature = {
  feature: Feature;
  new_price: number | null;
  fee: Fee | null;
  permissions?: Permission[];
  feature_plan_fee_new_overrate: OverrateFeeWithNewPrice[] | null;
};

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
  recurrence_period?: string | null;
  is_active: boolean;
  features: PricingPlanFeature[];
  recurrence_fee?: Fee | null;
};

export type PricingPlanResponseItem = Omit<PricingPlan, "features"> & {
  feature_plan_fees: FeaturePlanFee[];
};

export type FeaturePlanFee = {
  id: number;
  feature: Feature;
  new_price: number;
  fee: Fee | null;
  overrate_fees: OverrateFeeAssociation[];
};

export type PricingPlanTableData = Omit<
  PricingPlan,
  "recurrence_fee_id" | "features"
> & {
  no: number;
  features: Feature[] | null;
  recurrence_period: string;
};

export type PricingPlanLandingPage = PricingPlan;

export type PricingPlanFilterParams = FilterBase<PricingPlanTableData> & {
  is_active?: boolean;
  is_available?: boolean;
  recurrence_period?: string;
};

export type PricingPlanFormValues = Omit<
  PricingPlan,
  "id" | "price" | "features"
>;

export type FeatureListPayload = {
  id?: string;
  feature_id: string;
  new_price: number | null;
  fee_id: string | null;
  feature_plan_fee_new_overrate?: OverrateFeeWithNewPrice[] | null;
};

export type AddPricingPlanPayload = PricingPlanFormValues & {
  features: FeatureListPayload[];
};

export type FeaturePlanFeeUpdate = {
  feature_id: string;
  fee_id: string | null;
  new_price: number | null;
  overrate_fee_associations: UpdatePricingPlanOverrateFee[] | null;
};

export type UpdatePricingPlanOverrateFee = {
  fee_overrate_id: string;
  new_overrate_price: number | null;
};
export type UpdatePricingPlanPayload = PricingPlanFormValues & {
  id: string;
  features: {
    add: FeaturePlanFeeUpdate[];
    update: FeaturePlanFeeUpdate[];
    delete: number[] | null;
  };
};

export type PricingPlanFeaturesType = {
  feature_plan_fee_id?: number | null;
  id: string;
  no: number;
  name: string;
  description: string | null;
  fee?: Fee | null;
  price: number | null;
  new_price: number | null;
  children?: OverrateFeeWithNewPrice[] | null;
};
