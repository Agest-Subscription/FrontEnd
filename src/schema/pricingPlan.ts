import { array, boolean, number, object, ObjectSchema, string } from "yup";

import {
  FeatureListPayload,
  FreeTrialPeriod,
  PricingPlanFormValues,
} from "@/interfaces/model/pricingplan.type";

const pricingplanFormValuesSchema: ObjectSchema<PricingPlanFormValues> = object(
  {
    name: string()
      .required("Name is required")
      .max(100, "Name cannot exceed 100 characters"),
    description: string()
      .nullable()
      .default(null)
      .max(255, "Description cannot exceed 255 characters")
      .default(null),
    start_date: string().required("Start date is required").default(null),
    end_date: string()
      .required("End date is required")
      .test(
        "is-later",
        "End date must be later than start date",
        function (value) {
          const { start_date } = this.parent;
          return (
            !start_date || !value || new Date(value) > new Date(start_date)
          );
        },
      ),
    is_active: boolean().default(false),
    has_free_trial: boolean().default(false),
    free_trial_period: string<FreeTrialPeriod>()
      .nullable()
      .default(null)
      .when("has_free_trial", {
        is: "true",
        then: (schema) => schema.required("Free trial period type is required"),
      }),
    free_trial_period_count: number()
      .nullable()
      .default(null)
      .when("has_free_trial", {
        is: "true",
        then: (schema) =>
          schema
            .required("Free trial cycle count is required")
            .min(1, "Free trial cycle count cannot be smaller than 1"),
      }),
    features: array<FeatureListPayload>().min(0).default([]),
    recurrence_fee_id: string().nullable().default(null),
  },
);

export default pricingplanFormValuesSchema;
