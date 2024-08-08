"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import SubscriptionDetails from "../SubscriptionDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddSubscription, useCheckFirstTime } from "@/hooks/subscription";
import { CustomError } from "@/interfaces/base";
import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";
import { popUpPropType } from "@/interfaces/popup";
import subscriptionFormValuesSchema from "@/schema/subscription";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";
import pricingPlan from "@/schema/pricingPlan";
import dayjs from "dayjs";
import { ManipulateType } from "dayjs";
type Props = {};
const Page: React.FC<Props> = () => {
  const goToSubscription = useGoToDashboardTab("subscriptions");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addSubscription, isLoading: isAdding } = useAddSubscription();
  const methods = useForm<SubscriptionFormValues>({
    mode: "onBlur",
    resolver: yupResolver(subscriptionFormValuesSchema),
  });
  const userId = methods.watch("user_id");
  const pricingPlanId = methods.watch("pricing_plan_id");
  const {
    data: isAlreadySubscribed,
    refetch,
    isLoading,
  } = useCheckFirstTime(userId, pricingPlanId);
  const start_date = methods.watch("start_date");
  useEffect(() => {
    const caculateDueDateFreeTrial = () => {
      if (isLoading) return;
      const pricingPlan = methods.getValues("pricing_plan");
      const isFirstTime = isAlreadySubscribed?.data?.is_first_time;
      console.log("123", pricingPlan);
      if (isFirstTime || pricingPlan?.has_free_trial === false) {
        methods.setValue("due_date_free_trial", null);
        return;
      }

      if (!start_date || !pricingPlan || isFirstTime) return;

      const dueDateFreeTrial = dayjs(start_date)
        .add(
          pricingPlan.free_trial_period_count ?? 0,
          pricingPlan.free_trial_period as ManipulateType | undefined,
        )
        .subtract(1, "minute")
        .toISOString();

      methods.setValue("due_date_free_trial", dueDateFreeTrial);
    };
    caculateDueDateFreeTrial();
  }, [isAlreadySubscribed, isLoading, methods, start_date]);

  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new subscription?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }

  function onSubmit(data: SubscriptionFormValues) {
    addSubscription(data, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Subscription is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToSubscription(),
        });
      },
      onError: (err: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${getErrorDetail(err) ?? "Subscription Creation failed"}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
    });
  }

  const fields = useGenerateFields(methods, false, null);

  const handleSave = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new subscription?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Subscription Creation")}
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
            <SubscriptionDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
