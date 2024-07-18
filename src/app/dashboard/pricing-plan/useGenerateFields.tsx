import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import {
  FreeTrialPeriodEnum,
  PricingPlanFormValues,
} from "@/interfaces/model/pricingplan.type";
import { enumToSelectOptions } from "@/utils/enum";

export const useGenerateFields = () => {
  const fields = useMemo<FieldsData<PricingPlanFormValues>>(() => {
    return {
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      recurrent_fee_name: {
        label: "Recurrent fee name",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      start_day: {
        label: "Start date",
        type: "datepicker",
        componentProps: {
          isRequired: true,
        },
      },
      end_day: {
        label: "Start date",
        type: "datepicker",
        componentProps: {
          isRequired: true,
        },
      },
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          style: { width: "100%" },
          rows: 3,
        },
      },
      free_trial_period: {
        label: "Free trial period",
        type: "select",
        options: enumToSelectOptions(FreeTrialPeriodEnum),
      },
      free_trial_period_count: {
        label: "Free trial period count",
        type: "text",
        componentProps: {
          type: "number",
        },
      },
      is_active: {
        label: "Is Active",
        type: "singleCheckbox",
      },
      is_free_trial: {
        label: "Is Active",
        type: "singleCheckbox",
      },
    };
  }, []);
  return fields;
};
