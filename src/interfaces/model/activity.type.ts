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

export type ActivityTableData = Activity & {
  no: number;
};

export type ActivityResponseItem = Activity;

export type ActivityFilterParams = FilterBase<ActivityResponseItem>;

export type ActivityItem = Pick<
  Activity,
  "feature" | "quantity" | "activity_date" | "fee_name" | "fee_type"
>;

export type ActivityFormValues = {
  active_items?: ActivityItem[] | null;
};

export type ActivityPayload = {
  pricing_plan_id: string;
  priority: string;
};
