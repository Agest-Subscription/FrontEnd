import { useQuery } from "@tanstack/react-query";

import {
  getInvoiceDetailApi,
  getListInvoicesApi,
  getNextBillingDateByUserIdApi,
} from "@/api/invoice";
import { INVOICE, INVOICES } from "@/constants/query";
import { InvoiceFilterParams } from "@/interfaces/model/invoice.type";

export const useGetListInvoices = (params: InvoiceFilterParams) => {
  return useQuery({
    queryKey: [INVOICES, params],
    queryFn: () => getListInvoicesApi(params),
    select: ({ data }) => data,
    enabled: !!params.user_id && !!params.next_billing_date,
  });
};

export const useGetInvoiceDetail = (params: InvoiceFilterParams) => {
  return useQuery({
    queryKey: [INVOICE, params],
    queryFn: () => getInvoiceDetailApi(params),
    select: ({ data }) => data,
    enabled: !!params.user_id && !!params.next_billing_date,
  });
};

export const useGetNextBillingDateByUserId = (params: InvoiceFilterParams) => {
  return useQuery({
    queryKey: [INVOICE, params],
    queryFn: () => {
      if (!params.user_id) return Promise.reject(new Error("Invalid id"));
      return getNextBillingDateByUserIdApi(params);
    },
    select: ({ data }) => data,
    enabled: !!params.user_id,
  });
};
