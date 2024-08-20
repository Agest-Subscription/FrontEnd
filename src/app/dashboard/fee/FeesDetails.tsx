import React, { FC, useEffect } from "react";
import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Col, Flex, Row, Tooltip, Typography } from "antd";

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
  nextThreshold?: number | null;
  currentThreshold?: number | null;
  showDelete: boolean;
};

const OverrateFeeItemField: FC<OverateFeeItemProps> = ({
  index,
  onDelete,
  nextThreshold,
  currentThreshold,
  showDelete,
}) => {
  const { FormField } = useFormWrapperCtx<FeeFormValues>();

  return (
    <>
      <Row gutter={24} key={index}>
        <Col span={4}>
          <FormField
            name={"overrate_fees.[].price"}
            index={[index]}
            key={index + "price"}
          />
        </Col>
        <Col
          span={4}
          style={{ gap: "8px", display: "flex", flexDirection: "column" }}
        >
          <div
            className="form-item-label"
            style={{
              lineHeight: "18px",
              fontWeight: 500,
              color: "#263e56",
              visibility: "visible",
            }}
          >
            Threshold
            <span style={{ color: "red", margin: "0 3px" }}>*</span>
            <Tooltip
              title={`The price will be applied when user's activity exceeds
              threshold ${
                nextThreshold
                  ? `from ${currentThreshold}`
                  : `more than ${currentThreshold}`
              } 
              ${nextThreshold ? `to ${nextThreshold - 1}` : ""}`}
              color="#15ABFF"
              overlayInnerStyle={{
                minWidth: "400px",
                minHeight: "45px",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "20px",
                color: "white",
                textAlign: "center",
              }}
            >
              <InfoCircleOutlined style={{ color: "#15ABFF" }} />
            </Tooltip>
          </div>
          <FormField
            name={"overrate_fees.[].threshold"}
            index={[index]}
            key={index + "threshold"}
          />
        </Col>
        {showDelete && (
          <Col
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: "34px",
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
        <p></p>
      </Row>
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

  const handleDelete = (index: number) => {
    remove(index);
  };

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
        <Row gutter={20}>
          <Col span={4}>
            <FormField name="name" />
          </Col>
          <Col span={4}>
            <FormField name="fee_type" />
          </Col>
          <Col span={4}>
            <FormField name="price" />
          </Col>
          {fee_type === "transaction" && (
            <Col span={4}>
              <FormField name="transaction_unit" />
            </Col>
          )}
          {fee_type === "recurrence" && (
            <>
              <Col span={4}>
                <FormField name="recurrence_type" />
              </Col>
              <Col span={4}>
                <FormField name="recurrence_cycle_count" />
              </Col>
            </>
          )}
        </Row>
        <FormField name="description" />

        <FormField name="is_active" />
        {fee_type === "transaction" && (
          <>
            <Typography
              style={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Overate Fee{" "}
              <Tooltip
                title="The transaction will be charged at the set price if the number of 
  transactions is equal to or greater than the threshold."
                color="#15ABFF"
                overlayInnerStyle={{
                  minWidth: "400px",
                  minHeight: "45px",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <InfoCircleOutlined style={{ color: "#62CD14" }} />
              </Tooltip>
            </Typography>

            {fields.map((item, index) => (
              <div key={item.id}>
                <OverrateFeeItemField
                  // price={item.price}
                  currentThreshold={item.threshold ?? null}
                  nextThreshold={fields[index + 1]?.threshold ?? null}
                  index={index}
                  onDelete={() => handleDelete(index)}
                  showDelete={fields.length > 1}
                />
              </div>
            ))}
            <Typography
              style={{
                cursor: "pointer",
                color: "#15ABFF",
                width: "fit-content",
              }}
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
