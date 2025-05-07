"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import { useGenerateFields } from "../useGenerateFields";
import UserDetails from "../UserDetails";

import NotFound from "@/app/not-found";
import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import useGetId from "@/hooks/useGetId";
import { useDeleteUser, useGetUserById, useUpdateUser } from "@/hooks/user";
import { CustomError } from "@/interfaces/base";
import { UserFormValues } from "@/interfaces/model/user";
import { popUpPropType } from "@/interfaces/popup";
import userFormValuesSchema from "@/schema/user";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();
  const goToUser = useGoToDashboardTab("users");
  const id = useGetId();
  const fields = useGenerateFields(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  const methods = useForm<UserFormValues>({
    mode: "onBlur",
    resolver: yupResolver(userFormValuesSchema),
  });

  const { data: User, isError } = useGetUserById(id);

  useEffect(() => {
    if (User) {
      methods.setValue("email", User.email);
      methods.setValue("is_admin", User.is_admin);
      methods.setValue("is_active", User.is_active);
    }
  }, [User, methods]);

  if (isError) {
    return <NotFound previousPage="users" />;
  }
  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (data: UserFormValues) => {
    updateUser(
      { id, ...data },
      {
        onSuccess: () =>
          showModal({
            popup_id: "successpopup",
            popup_text: capitalize("User is updated successfully!"),
            popup_type: "Success",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
        onError: (err: CustomError) =>
          showModal({
            popup_id: "fail",
            popup_text: `${capitalize(getErrorDetail(err) ?? "User update failed")}`,
            popup_type: "Fail",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
      },
    );
  };

  const handleDelete = () => {
    deleteUser(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This User is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToUser(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(err) ?? "User delete failed")}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        }),
    });
  };

  const handleSave = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "update",
        popup_text: `${capitalize("Are you sure to update this user?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(handleSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("User Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
            onFinish={methods.handleSubmit(handleSubmit)}
          >
            <UserDetails
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure to delete this user?")}`,
                  popup_type: "Confirm",
                  onConfirm: handleDelete,
                  onClose: () => setOpenModal(false),
                })
              }
              onSave={handleSave}
            />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
