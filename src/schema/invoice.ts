import { object, ObjectSchema, string } from "yup";

import { InvoiceFormValues } from "@/interfaces/model/invoice.type";

const invoiceFormValuesSchema: ObjectSchema<InvoiceFormValues> = object({
  user_id: string().required("User is required"),
  subs_next_billing_date: string().required("Next billing date is required"),
});

export default invoiceFormValuesSchema;
