"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import OverrateFeeDetails from "../OverrateFeeDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddOverrateFee } from "@/hooks/overrateFee";
import { CustomError } from "@/interfaces/base";
import { OverrateFeeFormValues } from "@/interfaces/model/overrateFee.type";
import { popUpPropType } from "@/interfaces/popup";
import overrateFeeFormValuesSchema from "@/schema/overrateFee";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToOverrateFee = useGoToDashboardTab("overrate-fee");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addOverrateFee, isLoading: isAdding } = useAddOverrateFee();
  const methods = useForm<OverrateFeeFormValues>({
    mode: "onBlur",
    resolver: yupResolver(overrateFeeFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new overrate fee?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }
  function onSubmit(data: OverrateFeeFormValues) {
    addOverrateFee(data, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Overrate Fee is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToOverrateFee(),
        });
      },
      onError: (err: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${getErrorDetail(err) ?? "Overrate Fee Creation failed"}`,
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
        popup_text: `${capitalize("Are you sure to create a new overrate fee?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Overrate Fee Creation")}
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
            <OverrateFeeDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
