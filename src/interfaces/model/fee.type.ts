import { FilterBase } from "../base";

import { EnumStruct } from "@/interfaces/enum";

export type FeeType = "onetime" | "transaction" | "recurrence";
export type RecurrenceType = "day" | "week" | "month" | "year";
export type Fee = {
  id: string;
  name: string;
  fee_type: FeeType;
  is_overrate: boolean | null;
  recurrence_type: RecurrenceType | null;
  recurrence_cycle_count: number | null;
  price: number;
  transaction_unit: string | null;
  description: string | null;
  is_active: boolean;
};

export type FeeTableData = Fee & {
  no: number;
};

export type FeeFilterParams = FilterBase<FeeTableData>;

export type FeeFormValues = Omit<Fee, "id">;

export type FeeResponseItem = Fee;

export type AddFeePayload = FeeFormValues;

export type UpdateFeePayload = Fee;

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
