import { useMemo } from "react";
import dayjs from "dayjs";

import { FieldsData } from "@/interfaces/form";
import {
  FreeTrialPeriodEnum,
  PricingPlanFormValues,
} from "@/interfaces/model/pricingplan.type";
import { enumToSelectOptions } from "@/utils/enum";

export const useGenerateFields = (start_date: string) => {
  const fields = useMemo<FieldsData<PricingPlanFormValues>>(() => {
    return {
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      recurrence_fee_name: {
        label: "Recurrent fee name",
        type: "text",
        componentProps: {},
      },
      start_date: {
        label: "Start date",
        type: "datepicker",
        componentProps: {
          isRequired: true,
        },
      },
      end_date: {
        label: "End date",
        type: "datepicker",
        componentProps: {
          isRequired: true,
          minDate: dayjs(start_date),
        },
      },
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          rows: 4,
        },
      },
      free_trial_period: {
        label: "Free trial period",
        type: "select",
        options: enumToSelectOptions(FreeTrialPeriodEnum),
      },
      free_trial_period_count: {
        label: "Free trial cycle count",
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
        label: "Has Free trial",
        type: "singleCheckbox",
      },
    };
  }, [start_date]);
  return fields;
};
