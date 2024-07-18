import { FeatureType } from "../Feature";

export type PricingPlanType = {
  id: string;
  pricing_name: string;
  pricing_start_date: string;
  pricing_end_date: string;
  is_free: boolean;
  free_period: string;
  free_time: string;
  fee_id: string;
  feature_id: FeatureType[];
  pricing_desc: string;
};
