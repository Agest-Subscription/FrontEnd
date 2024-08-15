import { useMemo } from "react";
import _ from "lodash";

import { FieldsData } from "@/interfaces/form";
import {
  FeeFormValues,
  FeeTypeEnum,
  RecurrenceTypeEnum,
} from "@/interfaces/model/fee.type";
import { enumToSelectOptions } from "@/utils/enum";

export const useGenerateFields = (methods: any): FieldsData<FeeFormValues> => {
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
      price: {
        label: "Price ($)",
        type: "text",
        componentProps: {
          isRequired: true,
          min: 0,
          type: "number",
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
        label: "",
        type: "text",
        componentProps: {
          isRequired: true,
          type: "number",
          onBlur: () => {
            const data = methods.getValues("overrate_fees");
            const sortedData = _.orderBy(data, ["threshold"], ["asc"]);
            methods.setValue("overrate_fees", sortedData);
          },
        },
      },
    }),
    [methods],
  );
};
