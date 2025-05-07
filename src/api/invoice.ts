import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  InvoiceDetail,
  InvoiceFilterParams,
  InvoiceResponseItem,
  NextBillingDate,
} from "@/interfaces/model/invoice.type";

export const getListInvoicesApi = (params: InvoiceFilterParams) => {
  return axiosClient.get<GetListResponse<InvoiceResponseItem>>("invoices", {
    params,
  });
};

export const getNextBillingDateByUserIdApi = (params: InvoiceFilterParams) => {
  return axiosClient.get<NextBillingDate[]>(`invoices/billing-date`, {
    params,
  });
};

export const getInvoiceDetailApi = (params: InvoiceFilterParams) => {
  return axiosClient.get<InvoiceDetail>(`invoices/detail`, {
    params,
  });
};
