import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import { UserFormValues } from "@/interfaces/model/user";

export const useGenerateFields = () => {
  const fields = useMemo<FieldsData<UserFormValues>>(() => {
    return {
      email: {
        label: "Email",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      password: {
        label: "Password",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      is_admin: {
        label: "Is Admin",
        type: "singleCheckbox",
      },
      is_active: {
        label: "Is Active",
        type: "singleCheckbox",
      },
    };
  }, []);
  return fields;
};
