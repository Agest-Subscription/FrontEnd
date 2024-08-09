"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import PricingPlanDetails from "../PricingPlanDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddPricingPlan } from "@/hooks/pricingPlan";
import { CustomError } from "@/interfaces/base";
import {
  AddPricingPlanPayload,
  PricingPlanFeaturesType,
  PricingPlanFormValues,
} from "@/interfaces/model/pricingplan.type";
import { popUpPropType } from "@/interfaces/popup";
import pricingplanFormValuesSchema from "@/schema/pricingPlan";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToPricingPlan = useGoToDashboardTab("pricing-plan");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addPricingPlan, isLoading: isAdding } = useAddPricingPlan();
  const methods = useForm<PricingPlanFormValues>({
    mode: "onBlur",
    resolver: yupResolver(pricingplanFormValuesSchema),
  });
  const has_free_trial = methods.watch("has_free_trial");
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new PricingPlan?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit((data) => onSubmit(data)),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }

  function onSubmit(
    data: PricingPlanFormValues,
    featureList: PricingPlanFeaturesType[] = [],
  ) {
    const formattedPayload = formatPayload(data, featureList);
    addPricingPlan(formattedPayload, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This PricingPlan is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToPricingPlan(),
        });
      },
      onError: (err: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${getErrorDetail(err) ?? "PricingPlan Creation failed"}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
    });
  }
  const start_date = methods.watch("start_date");

  const fields = useGenerateFields(start_date, methods);

  const formatPayload = (
    data: PricingPlanFormValues,
    featureList: PricingPlanFeaturesType[],
  ): AddPricingPlanPayload => {
    return {
      ...data,
      features: featureList.map((item) => ({
        feature_id: item.id,
        new_price: item.new_price,
        fee_id: item.fee?.id ?? null,
        feature_plan_fee_new_overrate:
          item.children?.map((fee) => ({
            ...fee,
            fee_overrate_id: fee.id,
            new_overrate_price: fee.new_price ?? null,
          })) ?? null,
      })),
    };
  };

  const handleSave = async (featureList: PricingPlanFeaturesType[]) => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new Pricing Plan?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit((data) => onSubmit(data, featureList)),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Pricing Plan Creation")}
      </Typography>
      <Spin spinning={isAdding}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            layout="vertical"
          >
            <PricingPlanDetails
              onSave={handleSave}
              has_free_trial={has_free_trial}
            />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
