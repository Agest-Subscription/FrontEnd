import React from "react";
import { useRouter } from "next/navigation";
import { Col, Flex, Row } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { OverrateFeeFormValues } from "@/interfaces/model/overrateFee.type";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
}

const OverrateFeeDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
}) => {
  const router = useRouter();
  const { FormField } = useFormWrapperCtx<OverrateFeeFormValues>();
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
            <FormField name="fee_id" />
          </Col>
          <Col span={4}>
            <FormField name="threshold" />
          </Col>
          <Col span={4}>
            <FormField name="price" />
          </Col>
        </Row>
        <Col span={6}>
          <FormField name="description" />
        </Col>
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

export default OverrateFeeDetails;
