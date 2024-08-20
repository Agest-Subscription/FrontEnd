import { FilterBase } from "../base";
import { PricingPlan } from "./pricingplan.type";

export type Subscription = {
  id: string;
  user_id: string;
  email: string;
  is_cancelled: boolean;
  start_date: string;
  end_date: string | null;
  suspended_date: string | null;
  due_date_free_trial: string | null;
  next_billing_date: string | null;
  auto_renew: boolean;
};

export type SubscriptionTableData = Omit<Subscription, "user_id" | "email"> & {
  no: number;
  users?: {
    id: string;
    email: string;
  };
  pricing_plan?: PricingPlan;
};

export type SubscriptionResponseItem = Subscription & {
  users?: {
    id: string;
    email: string;
  };
  pricing_plan?: PricingPlan;
};

export type SubscriptionFilterParams = FilterBase<SubscriptionResponseItem>;

export type SubscriptionFormValues = Omit<Subscription, "id"> & {
  pricing_plan_id: string;
  pricing_plan?: PricingPlan | null;
};

export type AddSubscriptionPayload = SubscriptionFormValues;

export type UpdateSubscriptionPayload = Subscription;
