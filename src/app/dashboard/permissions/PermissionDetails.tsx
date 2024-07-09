import FormWrapperV2, {
  useFormWrapperCtx,
} from "@/components/formV2/FormWrapperV2";
import useGenerateFields from "@/containers/TestGenerateField/useGenerateField";
import { PermissionFormValues } from "@/interfaces/model/permission/permission.type";
import { Flex, Form, Spin } from "antd";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface DetailsProp<T extends FieldValues = any, V = any> {
//   methods: UseFormReturn<T, V>;
  onSubmit: () => void;
//   isLoading: boolean;
}

const PermissionDetails: React.FC<DetailsProp<PermissionFormValues>> = () => {
  const { FormField } = useFormWrapperCtx<PermissionFormValues>();
  return (
    <Flex vertical gap={24}>
      <Flex gap={24}>
        <FormField name="name" />
        <FormField name="display_name" />
      </Flex>
      <Flex>
        <FormField name="description" />
      </Flex>
      <FormField name="is_valid" />
    </Flex>
  );
};

export default PermissionDetails;
