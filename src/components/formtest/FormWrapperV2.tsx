import { Alert } from "antd";
import React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormWrapperProps<T extends FieldValues = any, V = any> {
  methods: UseFormReturn<T, V>;
  children: React.ReactNode;
}

const FormWrapperV2 = ({ methods, children }: FormWrapperProps) => {
  return <FormProvider {...methods}>{children}
  </FormProvider>;
};

export default FormWrapperV2;
