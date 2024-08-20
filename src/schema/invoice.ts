import { object, ObjectSchema, string } from "yup";

import { InvoiceFormValues } from "@/interfaces/model/invoice.type";

const permissionFormValuesSchema: ObjectSchema<InvoiceFormValues> = object({
  user_id: string().required("User is required"),
  next_billing_date: string().required("Next billing date is required"),
});

export default permissionFormValuesSchema;
