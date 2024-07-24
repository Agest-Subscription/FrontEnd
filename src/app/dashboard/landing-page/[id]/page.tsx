"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import LandingPageDetails from "../LandingPageDetails";
import { useGenerateFields } from "../useGenerateFields";

import NotFound from "@/app/not-found";
import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import {
  useDeleteLandingPage,
  useGetLandingPageById,
  useUpdateLandingPage,
} from "@/hooks/landingPage";
import useGetId from "@/hooks/useGetId";
import { CustomError } from "@/interfaces/base";
import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";
import { popUpPropType } from "@/interfaces/popup";
import landingPageFormValuesSchema from "@/schema/landingPage";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize, trimString } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const { mutate: updateLandingPage, isLoading: isUpdating } =
    useUpdateLandingPage();
  const { mutate: deleteLandingPage, isLoading: isDeleting } =
    useDeleteLandingPage();
  const goToLandingPage = useGoToDashboardTab("landing-page");
  const id = useGetId();
  const fields = useGenerateFields();
  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  const methods = useForm<LandingPageFormValues>({
    mode: "onBlur",
    resolver: yupResolver(landingPageFormValuesSchema),
  });

  const { data: LandingPage, isError } = useGetLandingPageById(id);

  useEffect(() => {
    if (LandingPage) {
      methods.setValue("description", LandingPage.description);
      methods.setValue("display_name", LandingPage.display_name);
      methods.setValue("name", LandingPage.name);
      methods.setValue("is_active", LandingPage.is_active);
    }
  }, [LandingPage, methods]);

  if (isError) {
    return <NotFound previousPage="landing-page" />;
  }
  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (data: LandingPageFormValues) => {
    const trimmed = trimString(data, ["name", "display_name"]);
    updateLandingPage(
      { id, ...trimmed },
      {
        onSuccess: () =>
          showModal({
            popup_id: "successpopup",
            popup_text: capitalize("Landing Page updated successfully!"),
            popup_type: "Success",
            onConfirm: () => {},
            onClose: () => goToLandingPage(),
          }),
        onError: (err: CustomError) =>
          showModal({
            popup_id: "fail",
            popup_text: `${capitalize(getErrorDetail(err) ?? "Landing Page update failed")}`,
            popup_type: "Fail",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
      },
    );
  };

  const handleDelete = () => {
    deleteLandingPage(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This Landing Page is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToLandingPage(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(err) ?? "LandingPage delete failed")}`,
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
        popup_text: `${capitalize("Are you sure you want to update this landing page?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(handleSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("LandingPage Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
            onFinish={methods.handleSubmit(handleSubmit)}
          >
            <LandingPageDetails
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure you want to delete this landing page?")}`,
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
