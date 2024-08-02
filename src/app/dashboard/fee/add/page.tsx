"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import FeesDetails from "../FeesDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddFee } from "@/hooks/fee";
import { CustomError } from "@/interfaces/base";
import { FeeFormValues } from "@/interfaces/model/fee.type";
import { popUpPropType } from "@/interfaces/popup";
import feeFormValuesSchema from "@/schema/fee";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize, trimString } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToFee = useGoToDashboardTab("fee");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addFee, isLoading: isAdding } = useAddFee();
  const methods = useForm<FeeFormValues>({
    mode: "onBlur",
    resolver: yupResolver(feeFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new Fee?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }

  function formatPayload(data: FeeFormValues) {
    if (data.fee === "transaction") {
      return {
        ...data,
        recurrence_cycle_count: null,
        recurrence_type: null,
      };
    }
    if (data.fee === "onetime") {
      return {
        ...data,
        transaction_unit: null,
        is_overrate: null,
        recurrence_cycle_count: null,
        recurrence_type: null,
      };
    }
    if (data.fee === "recurrence") {
      return {
        ...data,
        transaction_unit: null,
        is_overrate: null,
      };
    }
    return data; // or handle other fee cases if necessary
  }

  function onSubmit(data: FeeFormValues) {
    const newData = formatPayload(data);
    const trimmed = trimString(newData, ["name"]);
    addFee(trimmed, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Fee is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToFee(),
        });
      },
      onError: (error: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(error) ?? "Fee creation failed!")}`,
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
        popup_text: `${capitalize("Are you sure to create a new Fee?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Fee Creation")}
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
            <FeesDetails onSave={handleSave} methods={methods} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
