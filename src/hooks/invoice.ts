import { useQuery } from "@tanstack/react-query";

import { getListInvoicesApi } from "@/api/invoice";
import { INVOICES } from "@/constants/query";
import { InvoiceFilterParams } from "@/interfaces/model/invoice.type";

export const useGetListInvoices = (params: InvoiceFilterParams) => {
  return useQuery({
    queryKey: [INVOICES, params],
    queryFn: () => getListInvoicesApi(params),
    select: ({ data }) => data,
  });
};
