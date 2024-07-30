import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Col, Flex, Row } from "antd";

import AddFeature from "./AddFeature";
import PricingPlanFeatures from "./PricingPlanFeature";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { Feature } from "@/interfaces/model/feature.type";
import { PricingPlanFormValues } from "@/interfaces/model/pricingplan.type";
import { PricingPlanFeaturesType } from "@/interfaces/model/pricingplan.type";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: (dataSource: PricingPlanFeaturesType[]) => void;
  selectedRows?: Feature[];
}

const PricingPlanDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  selectedRows,
  onSave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [dataSource, setDataSource] = useState<PricingPlanFeaturesType[]>([]);

  const router = useRouter();
  const { FormField } = useFormWrapperCtx<PricingPlanFormValues>();

  function handleSaveFeature(selectedRows: Feature[]) {
    setSelectedFeatures(selectedRows);
    setIsModalOpen(false);
  }

  function handleDeleteFeature(id: number | string) {
    setSelectedFeatures(
      selectedFeatures.filter((feature) => feature.id !== id),
    );
  }

  const handleSavePricingPlan = () => {
    onSave(dataSource); // Pass the dataSource to the onSave callback
  };

  const deleteAllFeatures = () => {
    setSelectedFeatures([]);
    setDataSource([]);
  };
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
            <FormField name="recurrence_fee_id" />
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
              <FormField name="has_free_trial" />
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
            onClick={() => setIsModalOpen(true)}
          />
        </Flex>
        {selectedFeatures.length > 0 && (
          <PricingPlanFeatures
            FeatureList={selectedFeatures}
            deleteFeature={handleDeleteFeature}
            dataSource={dataSource}
            setDataSource={setDataSource}
            deleteAllFeatures={deleteAllFeatures}
          />
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
            onClick={() => router.back()}
          />
          <ButtonV1
            title="Save"
            onClick={handleSavePricingPlan}
            customDisabled={disableSaveBtn}
          />
        </Flex>
      </Flex>
      <AddFeature
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={handleSaveFeature}
        selectedRows={selectedFeatures}
      />
    </>
  );
};

export default PricingPlanDetails;
