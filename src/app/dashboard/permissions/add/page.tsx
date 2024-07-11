"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import PermissionDetails from "../PermissionDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddPermission } from "@/hooks/permission";
import { PermissionFormValues } from "@/interfaces/model/permission.type";
import { popUpPropType } from "@/interfaces/popup";
import permissionFormValuesSchema from "@/schema/permission";
import { capitalize } from "@/utils/string";
import { useGoToDashboardTab } from "@/utils/navigate";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToPermission = useGoToDashboardTab("permissions");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addPermission, isLoading: isAdding } = useAddPermission();
  const methods = useForm<PermissionFormValues>({
    mode: "onBlur",
    resolver: yupResolver(permissionFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: "Are you sure to create a permission?",
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }
  function onSubmit(data: PermissionFormValues) {
    addPermission(data, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: "Permission created successfully!",
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToPermission(),
        });
      },
      onError: () => {
        showModal({
          popup_id: "fail",
          popup_text: "Permission creation failed!",
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
        popup_text: "Are you sure to create a permission?",
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Permission Creation")}
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
            <PermissionDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
