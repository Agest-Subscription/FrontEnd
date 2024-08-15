import { FilterBase } from "../base";

export type Activity = {
  id: string;
  user: string;
  subscription: string;
  subs_start_date: string;
  subs_end_date: string;
  pricing_plan: string;
  feature: string;
  fee_name: string;
  fee_type: string;
  activity_date: string;
  transaction_unit: string;
  quantity: number;
  description: string;
};

export type ActivityFormType = {
  user_id: string;
  subscription_id: string;
  description?: string | null;
};

export type ActivityTableData = Activity & {
  no: number;
};

export type ActivityResponseItem = Activity;

export type ActivityFilterParams = FilterBase<ActivityResponseItem>;

export type ActivityItem = Pick<
  Activity,
  "feature" | "quantity" | "activity_date" | "fee_name" | "fee_type"
>;

export type FeaturePlanFeeActivityItem = {
  feature_plan_fee_id: string;
  quantity: number;
  activity_date: string;
};

export type ActivityFormValues = ActivityFormType & {
  feature_plan_fee_activities: FeaturePlanFeeActivityItem[];
};

export type ActivityPayload = {
  pricing_plan_id: string;
  priority: string;
};
