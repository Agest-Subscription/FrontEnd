import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Col, Flex, Row } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { FeeFormValues } from "@/interfaces/model/fee.type";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
  methods: UseFormReturn<FeeFormValues, any>;
}

const PermissionDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
  methods,
}) => {
  const router = useRouter();
  const { FormField } = useFormWrapperCtx<FeeFormValues>();
  const fee_type = methods.watch("fee_type");
  useEffect(() => {
    if (fee_type === "transaction" && !edit) {
      methods.setValue("is_overrate", false);
    }
  }, [edit, fee_type, methods]);
  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <Row gutter={16}>
          <Col span={4}>
            <FormField name="name" />
          </Col>
          <Col span={4}>
            <FormField name="fee_type" />
          </Col>
          <Col span={4}>
            <FormField name="fee_price" />
          </Col>
          {fee_type === "transaction" && (
            <Col span={4}>
              <FormField name="transaction_unit" />
            </Col>
          )}
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <FormField name="description" />
          </Col>
        </Row>
        {fee_type === "recurrence" && (
          <Row gutter={16}>
            <Col span={4}>
              <FormField name="recurrence_type" />
            </Col>
            <Col span={4}>
              <FormField name="recurrence_cycle_count" />
            </Col>
          </Row>
        )}

        <FormField name="is_active" />
        {fee_type === "transaction" && <FormField name="is_overrate" />}
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
