import React from "react";
import { useRouter } from "next/navigation";
import { Flex } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { PermissionFormValues } from "@/interfaces/model/permission.type";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
}

const PermissionDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
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
        <FormField name="is_active" />
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
          <ButtonV1
            title="Save"
            onClick={onSave}
            customDisabled={disableSaveBtn}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default PermissionDetails;
