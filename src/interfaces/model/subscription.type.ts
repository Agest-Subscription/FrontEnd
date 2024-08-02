import { FilterBase } from "../base";
import { PricingPlan } from "./pricingplan.type";

export type Subscription = {
  id: string;
  user_id: string;
  email: string;
  pricing_plan: PricingPlan;
  is_cancelled: boolean;
  start_date: Date;
  end_date: Date | null;
  suspended_date: Date | null;
  due_date_free_trial: Date | null;
  next_billing_date: Date | null;
  auto_renew: boolean;
};

export type SubscriptionTableData = Subscription & {
  no: number;
};

export type SubscriptionResponseItem = Subscription;

export type SubscriptionFilterParams = FilterBase<SubscriptionResponseItem>

export type SubscriptionFormValues = Omit<Subscription, "id"> 

export type AddSubscriptionPayload = SubscriptionFormValues;

export type UpdateSubscriptionPayload = Subscription;