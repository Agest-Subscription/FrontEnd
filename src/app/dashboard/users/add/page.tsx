"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import { useGenerateFields } from "../useGenerateFields";
import UserDetails from "../UserDetails";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddUser } from "@/hooks/user";
import { CustomError } from "@/interfaces/base";
import { UserFormValues } from "@/interfaces/model/user";
import { popUpPropType } from "@/interfaces/popup";
import userFormValuesSchema from "@/schema/user";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize, trimString } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToUser = useGoToDashboardTab("users");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addUser, isLoading: isAdding } = useAddUser();
  const methods = useForm<UserFormValues>({
    mode: "onBlur",
    resolver: yupResolver(userFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new user?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }
  function onSubmit(data: UserFormValues) {
    const trimmed = trimString(data, ["email"]);
    addUser(trimmed, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This User is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToUser(),
        });
      },
      onError: (err: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${getErrorDetail(err) ?? "User Creation failed"}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
    });
  }

  const fields = useGenerateFields(false);

  const handleSave = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new user?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  useEffect(() => {
    methods.setValue("is_active", true);
  }, [methods]);

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("User Creation")}
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
            <UserDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
