import { FilterBase } from "../base";

import { EnumStruct } from "@/interfaces/enum";

export type FeeType = "onetime" | "transaction" | "recurrence";
export type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly";
export type Fee = {
  id: number;
  name: string;
  fee: FeeType;
  is_overrate: boolean | null;
  recurrence_type: RecurrenceType | null;
  recurrence_cycle_count: number | null;
  fee_price: number;
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
    label: "Daily",
    value: "daily",
  },
  weekly: {
    label: "Weekly",
    value: "weekly",
  },
  monthly: {
    label: "Monthly",
    value: "monthly",
  },
  yearly: {
    label: "Yearly",
    value: "yearly",
  },
}) satisfies EnumStruct<RecurrenceType>;
