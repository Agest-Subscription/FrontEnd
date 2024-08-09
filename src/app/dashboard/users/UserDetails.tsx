import React from "react";
import { Col, Flex, Row } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { UserFormValues } from "@/interfaces/model/user";
import { useGoToDashboardTab } from "@/utils/navigate";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
}

const UserDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
}) => {
  const goToUser = useGoToDashboardTab("users");
  const { FormField } = useFormWrapperCtx<UserFormValues>();
  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <FormField name="email" />
          </Col>
          {!edit && (
            <Col span={6}>
              <FormField name="password" />
            </Col>
          )}
        </Row>
        <FormField name="is_admin" />
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
            onClick={() => goToUser()}
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

export default UserDetails;
