import { array, number, object, ObjectSchema, string } from "yup";

import {
  ActivityFormValues,
  FeaturePlanFeeActivityItem,
} from "@/interfaces/model/activity.type";

const activityFormValuesSchema: ObjectSchema<ActivityFormValues> = object({
  user_id: string().required("User is required"),
  subscription_id: string().required("Subscription is required"),
  description: string()
    .nullable()
    .default(null)
    .max(255, "Description cannot exceed 255 characters"),
  feature_plan_fee_activities: array<FeaturePlanFeeActivityItem>(
    object<FeaturePlanFeeActivityItem>().shape({
      feature_plan_fee_id: string().required("Feature plan fee is required"),
      quantity: number().required("Quantity is required"),
      activity_date: string().required("Activity date is required"),
    }),
  )
    .default(null)
    .required("Feature is required"),
});

export default activityFormValuesSchema;
