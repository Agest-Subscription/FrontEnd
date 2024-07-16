"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import PermissionDetails from "../PermissionDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import {
  useDeletePermission,
  useGetPermissionById,
  useUpdatePermission,
} from "@/hooks/permission";
import useGetId from "@/hooks/useGetId";
import { PermissionFormValues } from "@/interfaces/model/permission.type";
import { popUpPropType } from "@/interfaces/popup";
import permissionFormValuesSchema from "@/schema/permission";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const { mutate: updatePermission, isLoading: isUpdating } =
    useUpdatePermission();
  const { mutate: deletePermission, isLoading: isDeleting } =
    useDeletePermission();
  const goToPermission = useGoToDashboardTab("permissions");
  const id = useGetId();
  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  const methods = useForm<PermissionFormValues>({
    mode: "onBlur",
    resolver: yupResolver(permissionFormValuesSchema),
  });

  const { data: Permission } = useGetPermissionById(id);

  const fields = useGenerateFields();

  useEffect(() => {
    if (Permission) {
      methods.setValue("description", Permission.description);
      methods.setValue("display_name", Permission.display_name);
      methods.setValue("name", Permission.name);
      methods.setValue("is_valid", Permission.is_valid);
    }
  }, [Permission, methods]);

  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (data: PermissionFormValues) => {
    updatePermission(
      { id, ...data },
      {
        onSuccess: () =>
          showModal({
            popup_id: "successpopup",
            popup_text: capitalize("Permission updated successfully!"),
            popup_type: "Success",
            onConfirm: () => {},
            onClose: () => goToPermission(),
          }),
        onError: () =>
          showModal({
            popup_id: "fail",
            popup_text: capitalize("Permission update failed!"),
            popup_type: "Fail",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
      },
    );
  };

  const handleDelete = () => {
    deletePermission(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This Permission is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToPermission(),
        }),
      onError: () =>
        showModal({
          popup_id: "fail",
          popup_text: capitalize("this Permission delete failed!"),
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
        popup_text: `${capitalize("Are you sure you want to update this permission?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(handleSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Permission Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
            onFinish={methods.handleSubmit(handleSubmit)}
          >
            <PermissionDetails
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure you want to delete this permission?")}`,
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
