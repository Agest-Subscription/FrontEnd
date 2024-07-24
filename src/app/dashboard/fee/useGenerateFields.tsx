import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import {
  FeeFormValues,
  FeeTypeEnum,
  RecurrenceTypeEnum,
} from "@/interfaces/model/fee.type";
import { enumToSelectOptions } from "@/utils/enum";

export const useGenerateFields = () => {
  const fields = useMemo<FieldsData<FeeFormValues>>(() => {
    return {
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
        },
      },
      recurrence_type: {
        label: "Reccurence Type",
        type: "select",
        options: enumToSelectOptions(RecurrenceTypeEnum),
        componentProps: {
          isRequired: true,
          style: { height: "40px" },
        },
      },
      recurrence_cycle_count: {
        label: "Reccurence cycle count",
        type: "text",
        componentProps: {
          isRequired: true,
          type: "number",
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
      is_overrate: {
        label: "Overrate Fee",
        type: "singleCheckbox",
      },
    };
  }, []);
  return fields;
};
