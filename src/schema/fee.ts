import { boolean, number, object, ObjectSchema, string } from "yup";

import {
  FeeFormValues,
  FeeType,
  RecurrenceType,
} from "@/interfaces/model/fee.type";

const feeFormValuesSchema: ObjectSchema<FeeFormValues> = object({
  name: string()
    .required("Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  description: string()
    .nullable()
    .default(null)
    .max(255, "Description cannot exceed 255 characters"),
  fee_type: string<FeeType>().required("Fee type is required"),
  fee_price: number()
    .min(0, "Price cannot be smaller than 0")
    .required("Fee price is a required fields")
    .max(9999999999, "Price cannot exceed 9999999999"),
  is_active: boolean().default(false),
  is_overrate: boolean()
    .nullable()
    .default(null)
    .when("fee_type", {
      is: "transaction",
      then: (schema) => schema.nullable().default(false),
    }),
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
