"use client";
import React, { useState } from "react";
import { Flex, Form, Spin, Typography } from "antd";

import LandingPagesDetails from "../LandingPageDetails";

import PopUp from "@/components/popup/Popup";
import { useAddLandingPage } from "@/hooks/landingPage";
import { CustomError } from "@/interfaces/base";
import {
  LandingPage,
  LandingPageFormValues,
  LandingPageItem,
} from "@/interfaces/model/landingPage.type";
import { popUpPropType } from "@/interfaces/popup";
import landingpageFormValuesSchema from "@/schema/landingPage";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToLandingPage = useGoToDashboardTab("landing-page");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addLandingPage, isLoading: isAdding } = useAddLandingPage();

  const handleSubmit = (onSubmit: any) => {
    return () => {
      setOpenModal(true);
    };
  };

  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to create a new Landing Page?")}`,
    popup_type: "Confirm",
    onConfirm: handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  const transformResponse = (data: LandingPage[]): LandingPageItem[] => {
    const grouped: { [key: string]: LandingPageItem } = {};

    data.forEach((item) => {
      const recurrence_period = item?.pricing_plan.recurrence_period;
      if (!grouped[recurrence_period]) {
        grouped[recurrence_period] = {
          recurrence_period,
          basic_plan_id: "",
          pro_plan_id: "",
          premium_plan_id: "",
        };
      }

      if (item.priority === "basic") {
        grouped[recurrence_period].basic_plan_id =
          item.pricing_plan.id.toString();
      } else if (item.priority === "pro") {
        grouped[recurrence_period].pro_plan_id =
          item.pricing_plan.id.toString();
      } else if (item.priority === "premium") {
        grouped[recurrence_period].premium_plan_id =
          item.pricing_plan.id.toString();
      }
    });

    return Object.values(grouped);
  };

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }

  function onSubmit(data: LandingPageFormValues) {
    addLandingPage(data, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This Landing Page is successfully created!")}`,
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToLandingPage(),
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
    onSubmit;
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Landing Page Creation")}
      </Typography>
      <Spin spinning={isAdding}>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <LandingPagesDetails onSave={handleSave} />
          <PopUp popupProps={modalProp} isOpen={openModal} />
        </Form>
      </Spin>
    </Flex>
  );
};

export default Page;
