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
      then: (schema) => schema.required("Recurrence cycle count is required"),
    }),
  transaction_unit: string()
    .nullable()
    .default(null)
    .when("fee_type", {
      is: "transaction",
      then: (schema) => schema.required("Transaction unit is required"),
    }),
});

export default feeFormValuesSchema;
