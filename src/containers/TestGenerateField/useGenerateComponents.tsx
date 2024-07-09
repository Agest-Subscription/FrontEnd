import { TestField } from "./useGenerateField";

import { useFormWrapperCtx } from "@/components/formtest/FormWrapperV2";
import { ComponentRenderer } from "@/interfaces/Gridlayout.type";

interface UseGetComponents {
  FirstName: ComponentRenderer;
  LastName: ComponentRenderer;
  AddressStreet: ComponentRenderer;
}

export const useGetModalComponents = (): UseGetComponents => {
  const { FormField } = useFormWrapperCtx<TestField>();

  return {
    FirstName: () => <FormField name="firstName" />,
    LastName: () => <FormField name="lastName" />,
    AddressStreet: () => <FormField name="address.street" />,
  };
};
