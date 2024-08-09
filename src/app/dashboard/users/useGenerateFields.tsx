import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import { UserFormValues } from "@/interfaces/model/user";

export const useGenerateFields = (isEdit: boolean = false) => {
  const fields = useMemo<FieldsData<UserFormValues>>(() => {
    return {
      email: {
        label: "Email",
        type: "text",
        componentProps: {
          isRequired: true,
          disabled: isEdit,
        },
      },
      password: {
        label: "Password",
        type: "text",
        componentProps: {
          isRequired: !isEdit,
          disabled: isEdit,
        },
      },
      is_admin: {
        label: "Is Admin",
        type: "singleCheckbox",
        componentProps: {
          disabled: !isEdit,
        },
      },
      is_active: {
        label: "Is Active",
        type: "singleCheckbox",
        componentProps: {
          disabled: !isEdit,
        },
      },
    };
  }, [isEdit]);
  return fields;
};
