import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";

export const useGenerateFields = () => {
  const fields = useMemo<FieldsData<LandingPageFormValues>>(() => {
    return {
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      display_name: {
        label: "Display Name",
        type: "text",
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
      is_active: {
        label: "Is Active",
        type: "singleCheckbox",
      },
    };
  }, []);
  return fields;
};
