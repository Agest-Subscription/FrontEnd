import React from "react";
import { Col, Flex, Row } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";
import { useGoToDashboardTab } from "@/utils/navigate";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
}

const SubscriptionDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
}) => {
  const goToSubscription = useGoToDashboardTab("subscriptions");
  const { FormField } = useFormWrapperCtx<SubscriptionFormValues>();
  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <FormField name="user_id" />
          </Col>
          <Col span={6}>
            <FormField name="email" />
          </Col>
          <Col span={6}>
            <FormField name="pricing_plan_id" />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <FormField name="start_date" />
          </Col>
          <Col span={6}>
            <FormField name="due_date_free_trial" />
          </Col>
          <Col span={6}>
            <FormField name="next_billing_date" />
          </Col>
          <Col span={6}>
            <FormField name="end_date" />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormField name="is_cancelled" />
          </Col>
          <Col span={6}>
            <FormField name="suspended_date" />
          </Col>
        </Row>
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
            onClick={() => goToSubscription()}
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

export default SubscriptionDetails;
