import { FieldsData } from "@/interfaces/form";
import { PermissionFormValues } from "@/interfaces/model/permission/permission.type";
import { useMemo } from "react";

export const useGenerateFields = () => {
  const fields = useMemo<FieldsData<PermissionFormValues>>(() => {
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
        },
      },
      is_valid: {
        label: "Is Valid",
        type: "singleCheckbox",
      },
    };
  }, []);
  return fields;
};
