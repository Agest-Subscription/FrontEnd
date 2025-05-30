"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import LandingPagesDetails from "../LandingPageDetails";

import NotFound from "@/app/not-found";
import PopUp from "@/components/popup/Popup";
import { useAddLandingPage, useGetListLandingPage } from "@/hooks/landingPage";
import { CustomError } from "@/interfaces/base";
import {
  LandingPage,
  LandingPageFormValues,
  LandingPageItem,
  LandingPagePayload,
} from "@/interfaces/model/landingPage.type";
import { popUpPropType } from "@/interfaces/popup";
import landingPageFormValuesSchema from "@/schema/landingPage";
import { getErrorDetail } from "@/utils/error";
import { capitalize } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addLandingPage, isLoading: isAdding } = useAddLandingPage();
  const methods = useForm<LandingPageFormValues>({
    mode: "onBlur",
    resolver: yupResolver(landingPageFormValuesSchema),
  });
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new Landing Page?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  const params = {
    page_size: 12,
  };

  const { data: LandingPage, isError } = useGetListLandingPage(params);

  function transformResponse(data: LandingPage[]): LandingPageItem[] {
    const transformedData: Record<string, Record<string, string>> = {};

    data.forEach((item) => {
      const period = item.pricing_plan.recurrence_period;
      const priority = item.priority;
      const id = item.pricing_plan.id;

      if (!transformedData[period]) {
        transformedData[period] = { period };
      }

      transformedData[period][priority] = id;
    });

    return Object.values(transformedData) as LandingPageItem[];
  }

  useEffect(() => {
    if (LandingPage) {
      const transformData = transformResponse(LandingPage?.data ?? []);
      methods.setValue("landing_page_items", transformData);
      const initializedData = transformData.map((item) => ({
        ...item,
        basic: item.basic || null,
        pro: item.pro || null,
        premium: item.premium || null,
      }));
      methods.setValue("landing_page_items", initializedData);
    }
  }, [LandingPage, methods]);

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }

  const formatPayload = (
    data: LandingPageFormValues,
  ): { data: LandingPagePayload[] } => {
    const transformed: LandingPagePayload[] = [];

    if (data.landing_page_items) {
      data.landing_page_items.forEach((item) => {
        const { premium, pro, basic } = item;

        if (premium) {
          transformed.push({
            pricing_plan_id: premium ?? "",
            priority: "premium",
          });
        }
        if (pro) {
          transformed.push({ pricing_plan_id: pro ?? "", priority: "pro" });
        }
        if (basic) {
          transformed.push({ pricing_plan_id: basic ?? "", priority: "basic" });
        }
      });
    }
    const result = { data: transformed };
    return result;
  };

  function onSubmit(data: LandingPageFormValues) {
    addLandingPage(formatPayload(data), {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Landing Page is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
      onError: (error: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(error) ?? "Landing Page creation failed!")}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        });
      },
    });
  }

  const handleSave = async () => {
    const isValid = await methods.trigger();
    const formValues = methods.getValues();
    const hasAtLeastOnePlan = formValues.landing_page_items?.every(
      (item) => item.basic != null || item.pro != null || item.premium != null,
    );

    if (isValid && hasAtLeastOnePlan) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new Landing Page?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    } else {
      const firstError = Object.keys(methods.formState.errors)[0];
      if (firstError) {
        const errorElement = document.getElementsByName(firstError)[0];
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  if (isError) {
    return <NotFound previousPage="landing-page" />;
  }

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Landing Page Configuration")}
      </Typography>
      <Spin spinning={isAdding}>
        <FormProvider {...methods}>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            layout="vertical"
            onFinish={methods.handleSubmit(onSubmit)}
          >
            <LandingPagesDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormProvider>
      </Spin>
    </Flex>
  );
};

export default Page;
