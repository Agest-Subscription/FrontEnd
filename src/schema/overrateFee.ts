import { number, object, ObjectSchema, string } from "yup";

import { OverrateFeeFormValues } from "@/interfaces/model/overrateFee.type";

const overrateFeeFormValuesSchema: ObjectSchema<OverrateFeeFormValues> = object(
  {
    name: string()
      .required("Name is required")
      .max(100, "Name cannot exceed 100 characters"),
    fee_id: string().required("Fee name is required"),
    threshold: number()
      .required("Threshold is required")
      .min(0)
      .max(10000000000),
    price: number().required("Price is required").min(0).max(10000000000),
    description: string()
      .nullable()
      .default("")
      .max(255, "Description cannot exceed 255 characters"),
  },
);

export default overrateFeeFormValuesSchema;
