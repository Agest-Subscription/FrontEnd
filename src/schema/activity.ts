import { array, number, object, ObjectSchema, string } from "yup";

import {
  ActivityFormValues,
  FeaturePlanFeeActivityItem,
} from "@/interfaces/model/activity.type";

const activityFormValuesSchema: ObjectSchema<ActivityFormValues> = object({
  user_id: string().required("User is required"),
  subscription_id: string().required("Subscription is required"),
  start_date: string().required("start_date is required"),
  end_date: string().required("end_date is required"),
  description: string()
    .nullable()
    .default(null)
    .max(255, "Description cannot exceed 255 characters"),
  pricing_plan: string().required("pricing_plan is required"),
  feature_plan_fee_activities: array<FeaturePlanFeeActivityItem>(
    object<FeaturePlanFeeActivityItem>().shape({
      feature_plan_fee_id: string().nullable().default(null),
      quantity: number()
        .nullable()
        .default(null)
        .min(1, "Quantity cannot be smaller than 1")
        .max(9999999999, "Quantity cannot exceed 9999999999"),
      activity_date: string().nullable().default(null),
      fee: string().nullable().default(null),
      fee_type: string().nullable().default(null),
    }),
  )
    .default(null)
    .required("Feature is required"),
});

export default activityFormValuesSchema;
