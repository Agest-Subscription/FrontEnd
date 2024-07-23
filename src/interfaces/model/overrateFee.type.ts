import { FilterBase } from "../base";

export type OverrateFee = {
  id: string;
  name: string;
  fee_id: string;
  threshold: number;
  price: number;
  transaction_unit: string;
  description: string | null;
};

export type OverrateFeeTableData = OverrateFee & {
  no: number;
};

export type OverrateFeeResponseItem = OverrateFee;

export type OverrateFeeFilterParams = FilterBase<OverrateFeeResponseItem>;

export type OverrateFeeFormValues = Omit<
  OverrateFee,
  "id" | "fees" | "transaction_unit"
>;

export type AddOverrateFeePayload = OverrateFeeFormValues;

export type UpdateOverrateFeePayload = OverrateFeeFormValues & {
  id: string;
};
