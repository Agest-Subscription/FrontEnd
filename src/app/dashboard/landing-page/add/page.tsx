"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Flex, Form, Spin, Typography } from "antd";

import LandingPagesDetails from "../LandingPageDetails";

import PopUp from "@/components/popup/Popup";
import { useAddLandingPage } from "@/hooks/landingPage";
import { CustomError } from "@/interfaces/base";
import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";
import { popUpPropType } from "@/interfaces/popup";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToLandingPage = useGoToDashboardTab("landing-page");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addLandingPage, isLoading: isAdding } = useAddLandingPage();
  const methods = useForm<LandingPageFormValues>({
    mode: "onBlur",
    // resolver: yupResolver(landingpageFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new Landing Page?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }

  function onSubmit(data: LandingPageFormValues) {
    addLandingPage(data, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Landing Page is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToLandingPage(),
        });
      },
      onError: (error: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(error) ?? "Landing Page creation failed!")}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
    });
  }

  const handleSave = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new Landing Page?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Landing Page Configuration")}
      </Typography>
      <Spin spinning={isAdding}>
        <FormProvider {...methods}>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            layout="vertical"
            onFinish={methods.handleSubmit(onSubmit)}
          >
            <LandingPagesDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormProvider>
      </Spin>
    </Flex>
  );
};

export default Page;
