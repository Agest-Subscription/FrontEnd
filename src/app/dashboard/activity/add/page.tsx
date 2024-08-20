"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import ActivityDetails from "../ActivityDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useAddActivity } from "@/hooks/activity";
import { useGetPricingPlanById } from "@/hooks/pricingPlan";
import { useGetSubscriptionsByUserId } from "@/hooks/subscription";
import { CustomError } from "@/interfaces/base";
import { ActivityFormValues } from "@/interfaces/model/activity.type";
import { FeaturePlanFee } from "@/interfaces/model/pricingplan.type";
import { SubscriptionResponseItem } from "@/interfaces/model/subscription.type";
import { popUpPropType } from "@/interfaces/popup";
import activityFormValuesSchema from "@/schema/activity";
import { getErrorDetail } from "@/utils/error";
import { capitalize } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const [openModal, setOpenModal] = useState(false);
  const [subscriptionsList, setSubscriptionsList] = useState<
    SubscriptionResponseItem[]
  >([]);
  const [FeaturesList, setFeaturesList] = useState<FeaturePlanFee[]>([]);
  const { mutate: addActivity, isLoading: isAdding } = useAddActivity();
  const methods = useForm<ActivityFormValues>({
    mode: "onBlur",
    resolver: yupResolver(activityFormValuesSchema),
  });

  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new activity?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }

  function onSubmit(data: ActivityFormValues) {
    addActivity(data, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Activity is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
      onError: (err: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${getErrorDetail(err) ?? "Activity Creation failed"}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
    });
  }

  const userId = methods.watch("user_id");
  const pricingPlanId = methods.watch("pricing_plan");

  const { data: subscriptionsData } = useGetSubscriptionsByUserId(userId);

  const { data: pricingPlanData } = useGetPricingPlanById(pricingPlanId);

  useEffect(() => {
    if (subscriptionsData) {
      if (subscriptionsData.length > 0) {
        setSubscriptionsList(subscriptionsData);
      } else {
        setSubscriptionsList([]);
        setFeaturesList([]);
        methods.setValue("subscription_id", "");
        methods.setValue("pricing_plan", "");
        methods.setValue("feature_plan_fee_activities", []);
      }
    }

    if (pricingPlanData) {
      setFeaturesList(pricingPlanData.feature_plan_fees);
    }
  }, [userId, subscriptionsData, pricingPlanId, pricingPlanData, methods]);

  const fields = useGenerateFields(methods, subscriptionsList, FeaturesList);

  const handleSave = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new Activity?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Activity Creation")}
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
            <ActivityDetails onSave={handleSave} featuresData={FeaturesList} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
