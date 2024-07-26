"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import FeatureDetails from "../FeatureDetails";
import { useGenerateFields } from "../useGenerateFields";

import NotFound from "@/app/not-found";
import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import {
  useDeleteFeature,
  useGetFeatureById,
  useUpdateFeature,
} from "@/hooks/feature";
import useGetId from "@/hooks/useGetId";
import { CustomError } from "@/interfaces/base";
import { FeatureFormValues } from "@/interfaces/model/feature.type";
import { popUpPropType } from "@/interfaces/popup";
import featureFormValuesSchema from "@/schema/feature";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize, trimString } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const { mutate: updateFeature, isLoading: isUpdating } = useUpdateFeature();
  const { mutate: deleteFeature, isLoading: isDeleting } = useDeleteFeature();
  const goToFeature = useGoToDashboardTab("features");
  const id = useGetId();
  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  const methods = useForm<FeatureFormValues>({
    mode: "onBlur",
    resolver: yupResolver(featureFormValuesSchema),
  });

  const { data: Feature, isError } = useGetFeatureById(id);
  const initialPermissons = Feature?.permissions;
  const fields = useGenerateFields(initialPermissons);
  useEffect(() => {
    if (Feature) {
      const permissionId = Feature.permissions.map(
        (permission) => permission.id,
      );
      methods.setValue("description", Feature.description);
      methods.setValue("name", Feature.name);
      methods.setValue("is_active", Feature.is_active);
      methods.setValue("permissions", permissionId);
    }
  }, [Feature, methods]);

  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (data: FeatureFormValues) => {
    const trimmed = trimString(data, ["name"]);
    updateFeature(
      {
        id,
        ...trimmed,
      },
      {
        onSuccess: () =>
          showModal({
            popup_id: "successpopup",
            popup_text: capitalize("Feature is updated successfully!"),
            popup_type: "Success",
            onConfirm: () => {},
            onClose: () => goToFeature(),
          }),
        onError: (err: CustomError) =>
          showModal({
            popup_id: "fail",
            popup_text: `${capitalize(getErrorDetail(err) ?? "Feature update failed")}`,
            popup_type: "Fail",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
      },
    );
  };

  const handleDelete = () => {
    deleteFeature(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This Feature is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToFeature(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(err) ?? "Feature delete failed")}`,
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
        popup_text: `${capitalize("Are you sure to update this feature?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(handleSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  if (isError) {
    return <NotFound previousPage="features" />;
  }

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Feature Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
            onFinish={methods.handleSubmit(handleSubmit)}
          >
            <FeatureDetails
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure to delete this feature?")}`,
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
