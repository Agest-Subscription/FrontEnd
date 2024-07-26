import React from "react";
import { useRouter } from "next/navigation";
import { Col, Flex, Row } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { PricingPlanFormValues } from "@/interfaces/model/pricingplan.type";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
  onAddFeature: any;
}

const PricingPlanDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
  onAddFeature,
}) => {
  const router = useRouter();
  const { FormField } = useFormWrapperCtx<PricingPlanFormValues>();
  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <FormField name="name" />
          </Col>
          <Col span={6}>
            <FormField name="recurrence_fee_name" />
          </Col>
          <Col span={6}>
            <FormField name="start_date" />
          </Col>
          <Col span={6}>
            <FormField name="end_date" />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormField name="description" />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Flex vertical gap={8}>
              <FormField name="is_free_trial" />

              <FormField name="is_active" />
            </Flex>
          </Col>
          <Col span={6}>
            <FormField name="free_trial_period" />
          </Col>
          <Col span={6}>
            <FormField name="free_trial_period_count" />
          </Col>
        </Row>
        <Flex justify="end">
          <ButtonV1
            title="Add feature"
            customType="secondary"
            onClick={onAddFeature}
          />
        </Flex>
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

export default PricingPlanDetails;
