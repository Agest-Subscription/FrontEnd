import { FilterBase } from "../base";
import { EnumStruct } from "../enum";
import { OverrateFee } from "./overrateFee.type";

export type FeeType = "onetime" | "transaction" | "recurrence";
export type RecurrenceType = "day" | "week" | "month" | "year";
export type Fee = {
  id: string;
  name: string;
  fee_type: FeeType;
  //is_overrate: boolean | null;
  recurrence_type: RecurrenceType | null;
  recurrence_cycle_count: number | null;
  price: number | null;
  transaction_unit: string | null;
  description: string | null;
  is_active: boolean;
  overrate_fees?: OverrateFee[] | null;
};

export type FeeTableData = Fee & {
  no: number;
};

export type OverateFeeArrItems = Pick<OverrateFee, "price" | "threshold"> & {
  overrate_id?: Pick<OverrateFee, "id">;
  isTransaction?: boolean | null;
};
// Define a type that omits `isTransaction` from `OverateFeeArrItems`
export type OverrateFeeOmitTransaction = Omit<
  OverateFeeArrItems,
  "isTransaction"
>;
export type FeeFilterParams = FilterBase<FeeTableData> & {
  is_active?: boolean;
  is_recurrence?: boolean;
};

export type FeeFormValues = Omit<Fee, "id"> & {
  overrate_fees?: OverateFeeArrItems[] | null;
};

export type FeeResponseItem = Fee & {
  overrate_fees?: OverrateFeeOmitTransaction[] | null;
};

export type AddFeePayload = Omit<FeeFormValues, "create" | "update" | "delete">;

export type UpdateFeePayload = FeeFormValues & {
  id: string | null;
  create?: Create[] | null;
  update?: Update[] | null;
  delete?: Delete[] | null;
};
// Define the new type combining `Fee` with the modified `OverrateFeeArrItems`
export type Create = OverrateFeeOmitTransaction[];

export type Delete = {
  overrate_id: Pick<OverrateFee, "id">;
};

export type Update = OverrateFeeOmitTransaction & Delete;

export const FeeTypeEnum = Object.freeze({
  onetime: {
    label: "One Time",
    value: "onetime",
  },
  transaction: {
    label: "Transaction",
    value: "transaction",
  },
  recurrence: {
    label: "Recurrence",
    value: "recurrence",
  },
}) satisfies EnumStruct<FeeType>;

export const RecurrenceTypeEnum = Object.freeze({
  daily: {
    label: "Day",
    value: "day",
  },
  weekly: {
    label: "Week",
    value: "week",
  },
  monthly: {
    label: "Month",
    value: "month",
  },
  yearly: {
    label: "Year",
    value: "year",
  },
}) satisfies EnumStruct<RecurrenceType>;
