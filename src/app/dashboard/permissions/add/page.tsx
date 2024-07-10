"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Flex, Form, Typography, Spin } from "antd";

import PermissionDetails from "../PermissionDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import { capitalize } from "@/utils/string";
import { yupResolver } from "@hookform/resolvers/yup";
import permissionFormValuesSchema from "@/schema/permission";
import { PermissionFormValues } from "@/interfaces/model/permission.type";
import { useAddPermission } from "@/hooks/permission";
import PopUp from "@/components/popup/Popup";
import { popUpPropType } from "@/interfaces/popup";

type Props = {};
const Page = (props: Props) => {
  const { mutate: addPermission, isLoading: isAdding } = useAddPermission();
  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(permissionFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: "Are you sure to create a  permission?",
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
  });
  const [openModal, setOpenModal] = useState(false);
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
        });
      },
      onError: () => {
        showModal({
          popup_id: "fail",
          popup_text: "Permission creation failed!",
          popup_type: "Fail",
          onConfirm: () => {},
        });
      },
    });
  }
  const fields = useGenerateFields();

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
            <PermissionDetails
              onSave={
                !methods.formState.isValid
                  ? methods.handleSubmit(onSubmit)
                  : ()=>showModal(modalProp)
              }
            />
            <PopUp
              popupProps={modalProp}
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
            />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
