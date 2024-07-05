import { FeatureType } from "./Feature";

export  type PricingPlanType = {
    pricing_id: string,
    pricing_name: string,
    pricing_start_date: string,
    pricing_end_date: string,
    is_free: string,
    free_period: string,
    free_period_count: number,
    fee_id: string,
    feature_id: string[],
    pricing_desc: string,
}

export type PricingPlanLandingPageType = PricingPlanType & {
    fee: number;
    features: FeatureType[];
}