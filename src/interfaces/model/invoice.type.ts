import { FilterBase } from "../base";

export type NextBillingDate = {
  date: string;
};

export type Invoice = {
  id: string;
  feature_name: string;
  subs_id: string;
  subs_start_date: string;
  subs_end_date: string;
  subs_next_billing_date: string;
  pricing_plan_name: string;
  fee_name: string;
  fee_type: string;
  activity_date: string | null;
  transaction_unit: string | null;
  quantity: number;
};

export type InvoiceDetail = {
  id: number;
  user_email: string;
  total: number;
  tax: number;
  invoice_date: string;
  due_date: string;
  invoice_items: [
    {
      sub_id: number;
      pricing_plan: string;
      pricing_plan_desc: string;
      sub_start_date: string;
      sub_end_date: string;
      rate: number;
      invoice_details: [
        {
          feat_name: string;
          feat_desc: string;
          quantity: number;
          rate: number;
          overrate_fees: [
            {
              start: number;
              end: number;
              quantity: number;
              price: number;
            },
          ];
        },
      ];
    },
  ];
};

export type InvoiceDetailTableData = {
  key: string;
  item_detail: string;
  description?: string;
  subs_start_date?: string;
  subs_end_date?: string;
  quantity: number;
  rate: number;
  amount: number;
  isFeature?: boolean;
};

export type InvoiceTableData = Omit<Invoice, "is_active"> & {
  no: number;
};

export type InvoiceResponseItem = Invoice;

export type InvoiceFilterParams = FilterBase<InvoiceResponseItem> & {
  is_active?: boolean;
  user_id?: string;
  next_billing_date?: string | null;
};

export type InvoiceFormValues = Pick<Invoice, "subs_next_billing_date"> & {
  user_id: string;
};

export type AddInvoicePayload = InvoiceFormValues;

export type UpdateInvoicePayload = Invoice;
