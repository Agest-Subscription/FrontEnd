import React from "react";
import { Col, Flex, Row } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { FeatureFormValues } from "@/interfaces/model/feature.type";
import { useGoToDashboardTab } from "@/utils/navigate";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
}

const FeatureDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
}) => {
  const goToFeature = useGoToDashboardTab("features");
  const { FormField } = useFormWrapperCtx<FeatureFormValues>();
  console.log(FormField);
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
          <Col span={18}>
            <FormField name="permissions" />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={10}>
            <FormField name="description" />
          </Col>
        </Row>

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
            onClick={() => goToFeature()}
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

export default FeatureDetails;
