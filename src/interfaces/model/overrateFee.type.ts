import { FilterBase } from "../base";

export type OverrateFee = {
  id: string;
  fee_id: string;
  name: string;
  fee_name: string;
  threshold: number;
  price: number;
  description: string | null;
  transaction_unit: string;
};

export type OverrateFeeTableData = OverrateFee & {
  no: number;
};

export type OverrateFeeResponseItem = OverrateFee;

export type OverrateFeeFilterParams = FilterBase<OverrateFeeResponseItem>;

export type OverrateFeeFormValues = Omit<
  OverrateFee,
  "id" | "transaction_unit"
>;

export type AddOverrateFeePayload = OverrateFeeFormValues;

export type UpdateOverrateFeePayload = OverrateFeeFormValues & {
  id: string;
};

export type IsOverratFee = {
  id: string;
  name: string;
};
