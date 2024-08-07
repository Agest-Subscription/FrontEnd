import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Col, Flex, Row } from "antd";

import AddFeature from "./AddFeature";
import PricingPlanFeatures from "./PricingPlanFeature";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { Feature } from "@/interfaces/model/feature.type";
import { PricingPlan } from "@/interfaces/model/landingPage.type";
import {
  FeaturePlanFee,
  OverrateFeeAssociation,
  PricingPlanFormValues,
  PricingPlanResponseItem,
} from "@/interfaces/model/pricingplan.type";
import { PricingPlanFeaturesType } from "@/interfaces/model/pricingplan.type";
import { useGoToDashboardTab } from "@/utils/navigate";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: (dataSource: PricingPlanFeaturesType[]) => void;
  selectedRows?: FeaturePlanFee[];
  has_free_trial?: boolean;
  editingRecord?: PricingPlan | null;
}

const PricingPlanDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  selectedRows = [],
  onSave,
  has_free_trial = false,
}) => {
  const methods = useFormContext<PricingPlanResponseItem>();
  const recurrenceFee = methods.watch("recurrence_fee");
  const goToPricingPlan = useGoToDashboardTab("pricing-plan");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [dataSource, setDataSource] = useState<PricingPlanFeaturesType[]>([]);

  const { FormField } = useFormWrapperCtx<PricingPlanFormValues>();
  useEffect(() => {
    if (edit) {
      setSelectedFeatures(selectedRows.map((item) => item.feature));
      setDataSource(
        selectedRows.map((item, index) => ({
          feature_plan_fee_id: item.id,
          key: item.id,
          id: item.feature.id,
          no: index + 1,
          name: item.feature.name,
          price: item.fee?.price ?? null,
          description: item.feature.description,
          fee: item.fee,
          new_price: item.new_price,
          children: mapOverrateFee(item.overrate_fees, item.feature.id ?? ""),
        })),
      );
    }
  }, [edit, selectedRows]);

  function mapOverrateFee(
    overrateFeeList: OverrateFeeAssociation[],
    feature_id: string,
  ) {
    if (feature_id === "") return null;
    if (!overrateFeeList || overrateFeeList.length == 0) return null;
    return overrateFeeList.map((data) => ({
      ...data,
      new_price: data.new_overrate_price,
      feature_id: feature_id,
    }));
  }

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

  const formatPrice = (price: number, cycle_count: number, period: string) => {
    const cycle = cycle_count === 1 ? "" : cycle_count;
    const formattedPeriod = cycle_count > 1 ? `${period}s` : period;
    return `${price}/${cycle} ${formattedPeriod}`;
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
            {recurrenceFee && (
              <Flex justify="end">
                <p style={{ color: "#9095A1" }}>
                  Price: {"$"}
                  {formatPrice(
                    recurrenceFee.price,
                    recurrenceFee.recurrence_cycle_count ?? 0,
                    recurrenceFee.recurrence_type ?? "",
                  )}
                </p>
              </Flex>
            )}
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
          {has_free_trial && (
            <>
              <Col span={6}>
                <FormField name="free_trial_period" />
              </Col>
              <Col span={6}>
                <FormField name="free_trial_period_count" />
              </Col>
            </>
          )}
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
        {recurrenceFee && dataSource.length > 0 && (
          <Flex justify="end">
            <span style={{ color: "#9095A1", fontWeight: 700, fontSize: 16 }}>
              Total Fee:{" "}
              <span style={{ color: "#62CD14" }}>
                $
                {formatPrice(
                  recurrenceFee.price,
                  recurrenceFee.recurrence_cycle_count ?? 0,
                  recurrenceFee.recurrence_type ?? "",
                )}
              </span>
            </span>
          </Flex>
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
            onClick={goToPricingPlan}
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
