import { boolean, object, ObjectSchema, string } from "yup";

import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";

const subscriptionFormValuesSchema: ObjectSchema<
  Omit<SubscriptionFormValues, "pricing_plan">
> = object({
  user_id: string().required("User ID is required"),
  email: string().required("Email is required"),
  start_date: string().required("Start date is required"),
  end_date: string().nullable().default(null),
  due_date_free_trial: string().nullable().default(null),
  suspended_date: string().nullable().default(null),
  next_billing_date: string().nullable().default(null),
  auto_renew: boolean().default(true),
  is_cancelled: boolean().default(false),
  pricing_plan_id: string().required("Pricing plan is required"),
});

export default subscriptionFormValuesSchema;
