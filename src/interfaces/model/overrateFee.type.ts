import { FilterBase } from "../base";
import { Fee } from "./fee.type";

export type OverrateFee = {
  id: string;
  fee_id: string | null;
  threshold: number | null;
  price: number | null;
};

export type OverrateFeeTableData = OverrateFee & {
  no: number;
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
