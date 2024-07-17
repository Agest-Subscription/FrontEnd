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
  fee_desc: string()
    .nullable()
    .default(null)
    .max(255, "Description cannot exceed 255 characters"),
  fee_type: string<FeeType>().required("Display name is required"),
  fee_price: number()
    .min(0)
    .required("Fee price is a required fields")
    .max(10000000000, "Price cannot exceed 1.000.000.0000")
    .default(null),
  is_active: boolean().required("Validity status is required").default(false),
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
    .nullable()
    .default(null)
    .when("fee_type", {
      is: "recurrence",
      then: (schema) =>
        schema
          .required("Recurrence cycle count is required")
          .min(1, "Recurrence cycle count cannot be smaller than 1"),
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
