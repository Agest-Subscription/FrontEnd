"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import SubscriptionDetails from "../SubscriptionDetails";
import { useGenerateFields } from "../useGenerateFields";

import NotFound from "@/app/not-found";
import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import {
  useDeleteSubscription,
  useGetSubscriptionById,
  useUpdateSubscription,
} from "@/hooks/subscription";
import useGetId from "@/hooks/useGetId";
import { CustomError } from "@/interfaces/base";
import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";
import { popUpPropType } from "@/interfaces/popup";
import subscriptionFormValuesSchema from "@/schema/subscription";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const { mutate: updateSubscription, isLoading: isUpdating } =
    useUpdateSubscription();
  const { mutate: deleteSubscription, isLoading: isDeleting } =
    useDeleteSubscription();
  const goToSubscription = useGoToDashboardTab("subscriptions");
  const id = useGetId();
  const [openModal, setOpenModal] = useState(false);

  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  const methods = useForm<SubscriptionFormValues>({
    mode: "onBlur",
    resolver: yupResolver(subscriptionFormValuesSchema),
  });

  const { data: Subscription, isError } = useGetSubscriptionById(id);

  const fields = useGenerateFields(
    methods,
    true,
    Subscription?.pricing_plan ?? null,
    Subscription?.start_date,
  );

  useEffect(() => {
    if (Subscription) {
      methods.setValue("user_id", Subscription.users?.id ?? "");
      methods.setValue("email", Subscription.users?.email ?? "");
      methods.setValue("start_date", Subscription.start_date ?? "");
      methods.setValue("end_date", Subscription.end_date ?? "");
      methods.setValue(
        "due_date_free_trial",
        Subscription.due_date_free_trial ?? "",
      );
      methods.setValue("suspended_date", Subscription.suspended_date ?? "");
      methods.setValue(
        "next_billing_date",
        Subscription.next_billing_date ?? "",
      );
      methods.setValue("auto_renew", Subscription.auto_renew ?? false);
      methods.setValue("is_cancelled", Subscription.is_cancelled ?? false);
      methods.setValue("pricing_plan_id", Subscription.pricing_plan?.id ?? "");
    }
  }, [Subscription, methods]);

  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (data: SubscriptionFormValues) => {
    updateSubscription(
      {
        id,
        ...data,
      },
      {
        onSuccess: () =>
          showModal({
            popup_id: "successpopup",
            popup_text: capitalize("Subscription is updated successfully!"),
            popup_type: "Success",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
        onError: (err: CustomError) =>
          showModal({
            popup_id: "fail",
            popup_text: `${capitalize(getErrorDetail(err) ?? "Subscription update failed")}`,
            popup_type: "Fail",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
      },
    );
  };

  const handleDelete = () => {
    deleteSubscription(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This Subscription is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToSubscription(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(err) ?? "Subscription delete failed")}`,
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
        popup_text: `${capitalize("Are you sure to update this subscription?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(handleSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  if (isError) {
    return <NotFound previousPage="subscriptions" />;
  }

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Subscription Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
            onFinish={methods.handleSubmit(handleSubmit)}
          >
            <SubscriptionDetails
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure to delete this subscription?")}`,
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
