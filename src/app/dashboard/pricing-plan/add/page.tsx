"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Flex, Form, Spin, Typography } from "antd";

import AddFeature from "../AddFeature";
import PricingPlanDetails from "../PricingPlanDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddPricingPlan } from "@/hooks/pricingPlan";
import { CustomError } from "@/interfaces/base";
import { PricingPlanFormValues } from "@/interfaces/model/pricingplan.type";
import { popUpPropType } from "@/interfaces/popup";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";
import { Feature } from "@/interfaces/model/feature.type";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToPricingPlan = useGoToDashboardTab("pricing-plan");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Feature[]>([]);
  const { mutate: addPricingPlan, isLoading: isAdding } = useAddPricingPlan();
  const methods = useForm<PricingPlanFormValues>({
    mode: "onBlur",
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new PricingPlan?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function handleSaveFeature(selectedRows: Feature[]) {
    setSelectedRows(selectedRows);
  }

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }
  function onSubmit(data: PricingPlanFormValues) {
    addPricingPlan(data, {
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

  const fields = useGenerateFields(start_date);

  const handleSave = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new Pricing Plan?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
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
            onFinish={methods.handleSubmit(onSubmit)}
          >
            <PricingPlanDetails
              onSave={handleSave}
              selectedRows={selectedRows}
              onSaveAddFeature={handleSaveFeature}
            />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
