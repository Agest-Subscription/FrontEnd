import React, { FC, useEffect } from "react";
import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Flex, Row, Typography } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { FeeFormValues } from "@/interfaces/model/fee.type";
import { useGoToDashboardTab } from "@/utils/navigate";

type DetailsProp = {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
  methods: UseFormReturn<FeeFormValues, any>;
};

type OverateFeeItemProps = {
  onDelete: () => void;
  index: number;
  showDelete: boolean;
};

const OverrateFeeItemField: FC<OverateFeeItemProps> = ({
  index,
  onDelete,
  showDelete,
}) => {
  const { FormField } = useFormWrapperCtx<FeeFormValues>();

  return (
    <>
      <Flex gap={24} align="center" key={index}>
        <Col>
          <FormField
            name={"overrate_fees.[].price"}
            index={[index]}
            key={index + "price"}
          />
        </Col>

        <Col>
          <FormField
            name={"overrate_fees.[].threshold"}
            index={[index]}
            key={index + "threshold"}
          />
        </Col>

        {showDelete && (
          <Col
            style={{
              width: 24,
              height: 18,
              paddingTop: 10,
            }}
          >
            <DeleteOutlined
              style={{
                fontSize: 24,
                color: "#263e56",
              }}
              onClick={onDelete}
            />
          </Col>
        )}
      </Flex>
    </>
  );
};

export default function FeeDetails({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
  methods,
}: DetailsProp) {
  const { FormField } = useFormWrapperCtx<FeeFormValues>();
  const methodsArr = useFormContext<FeeFormValues>();

  const { fields, append, remove } = useFieldArray({
    control: methodsArr.control,
    name: "overrate_fees",
  });
  const newOverrateFeeItemsArray = React.useMemo(
    () => ({
      price: null,
      threshold: null,
      isTransaction: false,
    }),
    [],
  );
  const fee_type = methods.watch("fee_type");

  const handleAddMoreClick = () => {
    append({ ...newOverrateFeeItemsArray, isTransaction: true });
  };
  const goToFee = useGoToDashboardTab("fee");

  useEffect(() => {
    const isTransaction = fee_type === "transaction";
    if (fields.length === 0 && isTransaction) {
      append({
        ...newOverrateFeeItemsArray,
        isTransaction: true,
      });
    }

    if (!isTransaction) {
      fields.forEach((_, index) => remove(index));
    }
  }, [fields, append, newOverrateFeeItemsArray, remove, fee_type]);

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
          {fee_type !== "transaction" && (
            <Col span={4}>
              <FormField name="fee_price" />
            </Col>
          )}
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
        {fee_type === "transaction" && (
          <>
            <Typography
              style={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Overate Fee
            </Typography>

            {fields.map((item, index) => (
              <>
                <OverrateFeeItemField
                  key={item.id}
                  index={index}
                  onDelete={() => remove(index)}
                  showDelete={fields.length > 1}
                />
              </>
            ))}
            <Typography
              style={{ cursor: "pointer", color: "#15ABFF" }}
              onClick={handleAddMoreClick}
            >
              + Add more
            </Typography>
          </>
        )}
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
            onClick={() => goToFee()}
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
}
