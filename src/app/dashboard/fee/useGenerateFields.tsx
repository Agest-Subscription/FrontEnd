import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import {
  FeeFormValues,
  FeeTypeEnum,
  RecurrenceTypeEnum,
} from "@/interfaces/model/fee.type";
import { enumToSelectOptions } from "@/utils/enum";

export const useGenerateFields = (): FieldsData<FeeFormValues> => {
  return useMemo<FieldsData<FeeFormValues>>(
    () => ({
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
          style: { width: "100%" },
        },
      },
      fee_type: {
        label: "Fee Type",
        type: "select",
        options: enumToSelectOptions(FeeTypeEnum),
        componentProps: {
          isRequired: true,
          style: { height: "40px" },
        },
      },
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          rows: 3,
          style: { width: "100%" },
        },
      },
      fee_price: {
        label: "Price ($)",
        type: "text",
        componentProps: {
          isRequired: true,
          type: "number",
          min: 0,
        },
      },
      recurrence_type: {
        label: "Recurrence type",
        type: "select",
        options: enumToSelectOptions(RecurrenceTypeEnum),
        componentProps: {
          isRequired: true,
          style: { height: "40px" },
        },
      },
      recurrence_cycle_count: {
        label: "Recurrence cycle count",
        type: "text",
        componentProps: {
          isRequired: true,
          type: "number",
          min: 1,
        },
      },
      transaction_unit: {
        label: "Transaction unit",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      is_active: {
        label: "Is Active",
        type: "singleCheckbox",
      },
      "overrate_fees.[].price": {
        label: "Price ($)",
        type: "text",
        componentProps: {
          isRequired: true,
          type: "number",
          min: 1,
        },
      },
      "overrate_fees.[].threshold": {
        label: "Threshold",
        type: "text",
        componentProps: {
          isRequired: true,
          type: "number",
          min: 1,
        },
      },
    }),
    [],
  );
};
