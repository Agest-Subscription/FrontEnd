import { FilterBase } from "../base";
import { PricingPlanTableData } from "./pricingplan.type";

export type Subscription = {
  id: string;
  user_id: string;
  email: string;
  is_cancelled: boolean;
  start_date: Date;
  end_date: Date | null;
  suspended_date: Date | null;
  due_date_free_trial: Date | null;
  next_billing_date: Date | null;
  auto_renew: boolean;
};

export type SubscriptionTableData = Omit<Subscription, "user_id" | "email"> & {
  no: number;
  users?: {
    id: string;
    email: string;
  };
  pricing_plan?: PricingPlanTableData;
};

export type SubscriptionResponseItem = Subscription & {
  users: {
    id: string;
    email: string;
  };
  pricing_plan: PricingPlanTableData;
};

export type SubscriptionFilterParams = FilterBase<SubscriptionResponseItem>;

export type SubscriptionFormValues = Omit<Subscription, "id"> & {
  pricing_plan_id: string;
  pricing_plan?: PricingPlanTableData | null;
};

export type AddSubscriptionPayload = SubscriptionFormValues;

export type UpdateSubscriptionPayload = Subscription;
