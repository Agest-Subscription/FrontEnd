"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import LandingPageDetails from "../LandingPageDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddLandingPage } from "@/hooks/landingPage";
import { CustomError } from "@/interfaces/base";
import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";
import { popUpPropType } from "@/interfaces/popup";
import landingPageFormValuesSchema from "@/schema/landingPage";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize, trimString } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToLandingPage = useGoToDashboardTab("landing-page");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addLandingPage, isLoading: isAdding } = useAddLandingPage();
  const methods = useForm<LandingPageFormValues>({
    mode: "onBlur",
    resolver: yupResolver(landingPageFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new landing page?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }
  function onSubmit(data: LandingPageFormValues) {
    const trimmed = trimString(data, ["name", "display_name"]);
    addLandingPage(trimmed, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Landing Page is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToLandingPage(),
        });
      },
      onError: (err: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${getErrorDetail(err) ?? "Landing Page Creation failed"}`,
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
        popup_text: `${capitalize("Are you sure to create a new landing page?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Landing Page Creation")}
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
            <LandingPageDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
