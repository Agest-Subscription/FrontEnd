"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import FeatureDetails from "../FeatureDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddFeature } from "@/hooks/feature";
import { FeatureFormValues } from "@/interfaces/model/feature.type";
import { popUpPropType } from "@/interfaces/popup";
import featureFormValuesSchema from "@/schema/feature";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToFeature = useGoToDashboardTab("features");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addFeature, isLoading: isAdding } =  useAddFeature();
  const methods = useForm<FeatureFormValues>({
    mode: "onBlur",
    resolver: yupResolver(featureFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new feature?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }
  function onSubmit(data: FeatureFormValues) {
    addFeature(data, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Feature is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToFeature(),
        });
      },
      onError: () => {
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize("Feature creation failed!")}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
    });
  }

  const fields = useGenerateFields();

  const handleSave = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new feature?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Feature Creation")}
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
            <FeatureDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
