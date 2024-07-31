import { FilterBase } from "../base";
import { Fee } from "./fee.type";

export type OverrateFee = {
  id: string | null;
  fee_id: string | null;
  // name: string;
  // fee_name: string;
  threshold: number | null;
  price: number | null;
  // description: string | null;
  // transaction_unit: string;
};

export type OverrateFeeTableData = OverrateFee & {
  no: number;
  // fee_name: Pick<Fee, "name">;
};

export type OverrateFeeResponseItem = OverrateFee & Pick<Fee, "name">;

export type OverrateFeeFilterParams = FilterBase<OverrateFeeResponseItem>;

export type OverrateFeeFormValues = Omit<OverrateFee, "id"> & Pick<Fee, "name">;

export type AddOverrateFeePayload = OverrateFeeFormValues;

export type UpdateOverrateFeePayload = OverrateFeeFormValues & {
  id: string;
};

export type IsOverrateFee = {
  id: string;
  name: string;
};
