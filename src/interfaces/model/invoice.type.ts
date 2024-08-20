import { FilterBase } from "../base";

export type Invoice = {
  id: string;
  feature: string;
  sub_id: string;
  subs_start_date: string;
  subs_end_date: string;
  next_billing_date: string;
  pricing_plan: string;
  fee_name: string;
  fee_type: string;
  activity_date: string | null;
  transaction_unit: string | null;
  quantity: number;
};

export type InvoiceTableData = Omit<Invoice, "is_active"> & {
  no: number;
};

export type InvoiceResponseItem = Invoice;

export type InvoiceFilterParams = FilterBase<InvoiceResponseItem> & {
  is_active?: boolean;
  user_id?: string;
  next_bill_date?: string;
};

export type InvoiceFormValues = Pick<Invoice, "next_billing_date"> & {
  user_id: string;
};

export type AddInvoicePayload = InvoiceFormValues;

export type UpdateInvoicePayload = Invoice;
