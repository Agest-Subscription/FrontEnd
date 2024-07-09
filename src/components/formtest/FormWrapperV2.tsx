import * as React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { Alert } from "antd";

import FormField, { FormFieldProps } from "./FormField";

import { FieldsData } from "@/interfaces/form";

interface FormWrapperProps<T extends FieldValues = any, V = any> {
  methods: UseFormReturn<T, V>;
  children: React.ReactNode | ((props: FormContextType<T>) => React.ReactNode);
  fields: FieldsData<T>;
}
export interface FormContextType<T extends FieldValues = any> {
  fields: FieldsData<T>;
  FormField: React.FC<FormFieldProps<T>>;
}
export const FormContext = React.createContext<FormContextType>(
  {} as FormContextType,
);
export const useFormWrapperCtx = <T extends FieldValues = any>() =>
  // @ts-ignore-next-line
  React.useContext<FormContextType<T>>(FormContext);

const FormFieldWithType = <T extends FieldValues>(props: FormFieldProps<T>) => {
  return <FormField<T> {...props} />;
};

const FormWrapperV2 = <T extends FieldValues, V>({
  methods,
  children,
  fields,
}: FormWrapperProps<T, V>) => {
  const value = React.useMemo(
    () => ({
      fields,
      FormField: FormFieldWithType,
    }),
    [fields],
  );
  console.log("value fields: ", value);

  const error = methods.formState.errors["form_error"]?.message as string;

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={value}>
        <div>
          {error && (
            <div style={{ paddingBottom: "10px" }}>
              <Alert message={error} type="error" />
            </div>
          )}
          {typeof children === "function" ? children(value) : children}
        </div>
      </FormContext.Provider>
    </FormProvider>
  );
};

export default FormWrapperV2;
