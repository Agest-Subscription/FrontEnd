import React, { FC, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Flex, Row, Typography } from "antd";
import dayjs from "dayjs";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { ActivityFormValues } from "@/interfaces/model/activity.type";
import { FeaturePlanFee } from "@/interfaces/model/pricingplan.type";
import { useGoToDashboardTab } from "@/utils/navigate";

interface DetailsProp {
  disableSaveBtn?: boolean;
  onSave: any;
  featuresData?: FeaturePlanFee[];
}

type FeaturePlanItemProps = {
  onDelete: () => void;
  index: number;
  showDelete: boolean;
  featuresData?: FeaturePlanFee[];
};

const FeaturePlanItemField: FC<FeaturePlanItemProps> = ({
  onDelete,
  index,
  showDelete,
  featuresData,
}) => {
  const { FormField } = useFormWrapperCtx<ActivityFormValues>();
  const methods = useFormContext();
  const featureId = methods.watch(
    `feature_plan_fee_activities.${index}.feature_plan_fee_id`,
  );

  const currentPlan = featuresData?.find(
    (featurePlan) => featurePlan.id === featureId,
  );

  useEffect(() => {
    if (featureId) {
      methods.setValue(
        `feature_plan_fee_activities.${index}.activity_date`,
        dayjs().toISOString(),
      );
      methods.setValue(
        `feature_plan_fee_activities.${index}.fee`,
        currentPlan?.fee?.name,
      );
      methods.setValue(
        `feature_plan_fee_activities.${index}.fee_type`,
        currentPlan?.fee?.fee_type,
      );
    }
  }, [featureId, currentPlan, methods, index]);

  return (
    <>
      <Row gutter={25} key={index}>
        <Col span={4}>
          <FormField
            name={"feature_plan_fee_activities.[].feature_plan_fee_id"}
            index={[index]}
            key={index + "feature_plan_fee_id"}
          />
        </Col>
        <Col span={4}>
          <FormField
            name={"feature_plan_fee_activities.[].quantity"}
            index={[index]}
            key={index + "quantity"}
          />
        </Col>
        <Col span={4}>
          <FormField
            name={"feature_plan_fee_activities.[].activity_date"}
            index={[index]}
            key={index + "activity_date"}
          />
        </Col>
        <Col span={4}>
          <FormField
            name={"feature_plan_fee_activities.[].fee"}
            index={[index]}
            key={index + "fee"}
          />
        </Col>
        <Col span={4}>
          <FormField
            name={"feature_plan_fee_activities.[].fee_type"}
            index={[index]}
            key={index + "fee_type"}
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
      </Row>
    </>
  );
};

const ActivityDetails: React.FC<DetailsProp> = ({
  disableSaveBtn = false,
  onSave,
  featuresData,
}) => {
  const goToActivity = useGoToDashboardTab("activity");
  const { FormField } = useFormWrapperCtx<ActivityFormValues>();
  const methodsArr = useFormContext<ActivityFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: methodsArr.control,
    name: "feature_plan_fee_activities",
  });

  const newFeaturePlanItemsArray = React.useMemo(
    () => ({
      feature_plan_fee_id: null,
      quantity: null,
      activity_date: null,
      fee: null,
      fee_type: null,
    }),
    [],
  );

  const handleAddMoreClick = () => {
    append({ ...newFeaturePlanItemsArray });
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({
        ...newFeaturePlanItemsArray,
      });
    }
  }, [fields, append, newFeaturePlanItemsArray]);

  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <Row gutter={25}>
          <Col span={5}>
            <FormField name="user_id" />
          </Col>
          <Col span={5}>
            <FormField name="subscription" />
          </Col>
          <Col span={5}>
            <FormField name="start_date" />
          </Col>
          <Col span={5}>
            <FormField name="end_date" />
          </Col>
        </Row>

        {fields && (
          <>
            {fields.map((item, index) => (
              <div key={item.id}>
                <FeaturePlanItemField
                  index={index}
                  onDelete={() => handleDelete(index)}
                  showDelete={fields.length > 1}
                  featuresData={featuresData}
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

        <FormField name="description" />
      </Flex>
      <Flex style={{ width: "100%" }} justify="flex-end">
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

export default ActivityDetails;
