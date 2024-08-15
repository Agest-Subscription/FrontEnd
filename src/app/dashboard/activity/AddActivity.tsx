import React from "react";
import { Col, Flex, Row } from "antd";

import AddMultipleItems from "./AddMultipleItems";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { ActivityFormValues } from "@/interfaces/model/activity.type";
import { useGoToDashboardTab } from "@/utils/navigate";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onSave: any;
}

const AddActivity: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onSave,
}) => {
  const { FormField } = useFormWrapperCtx<ActivityFormValues>();
  const goToActivity = useGoToDashboardTab("activity");

  console.log(FormField);

  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{
          border: "1px solid #BDC1CA",
          padding: "16px",
          borderRadius: "4px",
        }}
      >
        <Row gutter={16}>
          <Col span={4}>{/* <FormField name="description" /> */}</Col>
        </Row>
        <AddMultipleItems />
      </Flex>
      <Flex
        style={{ width: "100%" }}
        justify={`${edit ? "space-between" : "flex-end"}`}
      >
        <Flex gap={12}>
          <ButtonV1
            title="Cancel"
            customType="cancel"
            onClick={() => goToActivity()}
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

export default AddActivity;
