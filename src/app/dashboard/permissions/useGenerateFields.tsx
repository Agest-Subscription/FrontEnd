import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import { PermissionFormValues } from "@/interfaces/model/permission.type";

export const useGenerateFields = () => {
  const fields = useMemo<FieldsData<PermissionFormValues>>(() => {
    return {
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
          disabled: true,
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
        componentProps: {
          defaultChecked: true,
        },
      },
    };
  }, []);
  return fields;
};
