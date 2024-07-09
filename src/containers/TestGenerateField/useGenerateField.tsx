import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import { capitalize } from "@/utils/string";

type FullAddress = {
  street: string;
};
export type TestField = {
  firstName: string;
  lastName: string;
  address: FullAddress;
};
const useGenerateFields = () => {
  const fields = useMemo<FieldsData<TestField>>(() => {
    return {
      firstName: {
        label: capitalize("Name"),
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },

      lastName: {
        label: capitalize("Last name"),
        type: "textarea",
        componentProps: {
          rows: 3,
          placeholder: capitalize("Enter Name"),
          style: { width: 300 },
        },
      },
    };
  }, []);

  return fields;
};

export default useGenerateFields;
