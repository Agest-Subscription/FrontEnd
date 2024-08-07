import { array, boolean, number, object, ObjectSchema, string } from "yup";

import {
  FeeFormValues,
  FeeType,
  OverateFeeArrItems,
  RecurrenceType,
} from "@/interfaces/model/fee.type";

const feeFormValuesSchema: ObjectSchema<FeeFormValues> = object({
  fee_type: string<FeeType>().required("Fee type is required"),
  overrate_fees: array<OverateFeeArrItems>(
    object<OverateFeeArrItems>().shape({
      isTransaction: boolean().default(false),
      price: number()
        .nullable()
        .integer()
        .min(0, "Price cannot be smaller than 0")
        .when("isTransaction", {
          is: true,
          then: (schema) => schema.required("Price cannot be null"),
        }),

      threshold: number()
        .nullable()
        .integer()
        .min(1, "Thresholds must be greater than or equal to 1")
        .when("isTransaction", {
          is: true,
          then: (schema) => schema.required("Threshold cannot be null"),
        })
        .test(
          "unique-thresholds",
          "Thresholds must be unique",
          function (value) {
            const index = parseInt(this.path.split("[")[1].split("]")[0], 10);

            const arr =
              (this.from?.[1].value.overrate_fees as OverateFeeArrItems[]) ??
              [];

            const thresholds = arr.map((item) => {
              return item.threshold;
            });

            // Use `some` to check if there is any threshold equal to `value`, skipping the `index`
            const isDuplicate = thresholds.some(
              (threshold, i) => threshold === value && i !== index,
            );

            return !isDuplicate;
          },
        )
        .test(
          "ascending-thresholds",
          "Thresholds must be greater than previous",
          function (value) {
            const index = parseInt(this.path.split("[")[1].split("]")[0], 10);

            const arr =
              (this.from?.[1].value.overrate_fees as OverateFeeArrItems[]) ??
              [];

            const thresholds = arr.map((item) => {
              return item.threshold;
            });

            if (index > 0) {
              const previousThreshold = thresholds[index - 1];
              if (value == null) return true;
              if (previousThreshold != null && value <= previousThreshold) {
                return false;
              }
            }

            return true;
          },
        ),
    }),
  )
    .nullable()
    .default(null)
    .when("fee_type", {
      is: "transaction",
      then: (schema) => schema.required(),
    }),

  name: string()
    .required("Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  description: string()
    .nullable()
    .default(null)
    .max(255, "Description cannot exceed 255 characters"),
  price: number()
    .integer("Please enter an integer")
    .min(0, "Price cannot be smaller than 0")
    .default(null)
    .max(9999999999, "Price cannot exceed 9999999999")
    .when("fee_type", {
      is: "onetime",
      then: (schema) => schema.required("Fee price is a required fields"),
    }),
  is_active: boolean().default(false),
  recurrence_type: string<RecurrenceType>()
    .nullable()
    .default(null)
    .when("fee_type", {
      is: "recurrence",
      then: (schema) => schema.required("Recurrence type is required"),
    }),
  recurrence_cycle_count: number()
    .integer("Please enter a number")
    .nullable()
    .default(null)
    .when("fee_type", {
      is: "recurrence",
      then: (schema) =>
        schema
          .required("Recurrence cycle count is required")
          .min(1, "Recurrence cycle count cannot be smaller than 1")
          .max(2147483647, "Recurrence cycle count cannot exceed 2147483647"),
    }),
  transaction_unit: string()
    .nullable()
    .default(null)
    .when("fee_type", {
      is: "transaction",
      then: (schema) =>
        schema
          .required("Transaction unit is required")
          .max(100, "Transaction Unit cannot be greater than 100 characters"),
    }),
});

export default feeFormValuesSchema;
