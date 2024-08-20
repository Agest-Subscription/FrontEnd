import { axiosClient } from "@/config/axios/client";
import { GetListResponse } from "@/interfaces/base";
import {
  InvoiceFilterParams,
  InvoiceResponseItem,
} from "@/interfaces/model/invoice.type";

export const getListInvoicesApi = (params: InvoiceFilterParams) => {
  return axiosClient.get<GetListResponse<InvoiceResponseItem>>("invoices", {
    params,
  });
};
