import ButtonV1 from "@/components/button/CustomButton";
import FormWrapperV2, {
  useFormWrapperCtx,
} from "@/components/formV2/FormWrapperV2";
import useGenerateFields from "@/containers/TestGenerateField/useGenerateField";
import { PermissionFormValues } from "@/interfaces/model/permission/permission.type";
import { Flex, Form, Spin } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface DetailsProp<T extends FieldValues = any, V = any> {
  edit?: boolean;
  onDelete?: () => void;
}

const PermissionDetails: React.FC<DetailsProp<PermissionFormValues>> = ({
  edit = false,
  onDelete,
}) => {
  const router = useRouter();
  const { FormField } = useFormWrapperCtx<PermissionFormValues>();
  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <Flex gap={24}>
          <FormField name="name" />
          <FormField name="display_name" />
        </Flex>
        <Flex>
          <FormField name="description" />
        </Flex>
        <FormField name="is_valid" />
      </Flex>
      <Flex
        style={{ width: "100%" }}
        justify={`${edit ? "space-between" : "flex-end"}`}
      >
        {edit && (
          <ButtonV1 title="Delete" customType="danger" onClick={onDelete} />
        )}
        <Flex gap={12}>
          <ButtonV1
            title="Cancel"
            customType="cancel"
            onClick={() => router.back()}
          />
          <ButtonV1 title="Save" htmlType="submit" />
        </Flex>
      </Flex>
    </>
  );
};

export default PermissionDetails;
