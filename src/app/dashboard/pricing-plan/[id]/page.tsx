"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Flex, Form, Spin, Typography } from "antd";

import PricingPlanDetails from "../PricingPlanDetails";
import { useGenerateFields } from "../useGenerateFields";

import NotFound from "@/app/not-found";
import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import {
  useDeletePricingPlan,
  useGetPricingPlanById,
  useUpdatePricingPlan,
} from "@/hooks/pricingPlan";
import useGetId from "@/hooks/useGetId";
import { CustomError } from "@/interfaces/base";
import { PricingPlanFormValues } from "@/interfaces/model/pricingplan.type";
import { popUpPropType } from "@/interfaces/popup";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const { mutate: updatePricingPlan, isLoading: isUpdating } =
    useUpdatePricingPlan();
  const { mutate: deletePricingPlan, isLoading: isDeleting } =
    useDeletePricingPlan();
  const goToPricingPlan = useGoToDashboardTab("pricing-plan");
  const id = useGetId();

  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  const methods = useForm<PricingPlanFormValues>({
    mode: "onBlur",
  });

  const { data: PricingPlan, isError } = useGetPricingPlanById(id);
  const start_date = methods.watch("start_date");
  const fields = useGenerateFields(start_date);
  useEffect(() => {
    if (PricingPlan) {
      methods.setValue("description", PricingPlan.description);
      methods.setValue("name", PricingPlan.name);
      methods.setValue("is_active", PricingPlan.is_active);
    }
  }, [PricingPlan, methods]);

  if (isError) {
    return <NotFound previousPage="pricing-plan" />;
  }
  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (data: PricingPlanFormValues) => {
    updatePricingPlan(
      {
        id,
        ...data,
        price: 0,
        features: [],
      },
      {
        onSuccess: () =>
          showModal({
            popup_id: "successpopup",
            popup_text: capitalize("Pricing plan is updated successfully!"),
            popup_type: "Success",
            onConfirm: () => {},
            onClose: () => goToPricingPlan(),
          }),
        onError: (err: CustomError) =>
          showModal({
            popup_id: "fail",
            popup_text: `${capitalize(getErrorDetail(err) ?? "Pricing plan update failed")}`,
            popup_type: "Fail",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
      },
    );
  };

  const handleDelete = () => {
    deletePricingPlan(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This Pricing plan is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToPricingPlan(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(err) ?? "Pricing plan delete failed")}`,
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
        popup_text: `${capitalize("Are you sure to update this pricing plan?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(handleSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("PricingPlan Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
            onFinish={methods.handleSubmit(handleSubmit)}
          >
            <PricingPlanDetails
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure to delete this pricing plan?")}`,
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
