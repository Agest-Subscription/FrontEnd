"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import AddActivity from "../AddActivity";

import { useAddActivity } from "@/hooks/activity";
import { ActivityFormValues } from "@/interfaces/model/activity.type";
import activityFormValuesSchema from "@/schema/activity";
import { capitalize } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: addActivity, isLoading: isAdding } = useAddActivity();
  const methods = useForm<ActivityFormValues>({
    mode: "onBlur",
    resolver: yupResolver(activityFormValuesSchema),
  });
  // const [modalProp, setModalProp] = useState<popUpPropType>({
  //   popup_id: "successpopup",
  //   popup_text: `${capitalize("Are you sure to create a new Activty?")}`,
  //   popup_type: "Confirm",
  //   onConfirm: methods.handleSubmit(onSubmit),
  //   onClose: () => setOpenModal(false),
  // });

  const params = {
    page_size: 12,
  };

  // const { data: Activity, isError } = useGetListActivity(params);

  // function transformResponse(data: Activity[]): ActivityItem[] {
  //   const transformedData: Record<string, Record<string, string>> = {};

  //   data.forEach((item) => {
  //     const period = item.pricing_plan.recurrence_period;
  //     const priority = item.priority;
  //     const id = item.pricing_plan.id;

  //     if (!transformedData[period]) {
  //       transformedData[period] = { period };
  //     }

  //     transformedData[period][priority] = id;
  //   });

  //   return Object.values(transformedData) as ActivityItem[];
  // }

  // useEffect(() => {
  //   if (Activity) {
  //     const transformData = transformResponse(Activity?.data ?? []);
  //     methods.setValue("activity_items", transformData);
  //     const initializedData = transformData.map((item) => ({
  //       ...item,
  //       basic: item.basic || null,
  //       pro: item.pro || null,
  //       premium: item.premium || null,
  //     }));
  //     methods.setValue("activity_items", initializedData);
  //   }
  // }, [Activity, methods]);

  // function showModal(modalProp: popUpPropType) {
  //   setModalProp(modalProp);
  //   setOpenModal(true);
  // }

  function onSubmit(data: ActivityFormValues) {
    // addActivity(data, {
    //   onSuccess: () => {
    //     showModal({
    //       popup_id: "successpopup",
    //       popup_text: `${capitalize("This Activty is successfully created!")}`,
    //       popup_type: "Success",
    //       onConfirm: () => {},
    //       onClose: () => setOpenModal(false),
    //     });
    //   },
    //   onError: (error: CustomError) => {
    //     showModal({
    //       popup_id: "fail",
    //       popup_text: `${capitalize(getErrorDetail(error) ?? "Activty creation failed!")}`,
    //       popup_type: "Fail",
    //       onConfirm: () => {},
    //       onClose: () => setOpenModal(false),
    //     });
    //   },
    // });
  }

  const handleSave = async () => {
    // const isValid = await methods.trigger();
    // if (isValid) {
    //   showModal({
    //     popup_id: "confirm",
    //     popup_text: `${capitalize("Are you sure to create a new Activty?")}`,
    //     popup_type: "Confirm",
    //     onConfirm: methods.handleSubmit(onSubmit),
    //     onClose: () => setOpenModal(false),
    //   });
    // } else {
    //   const firstError = Object.keys(methods.formState.errors)[0];
    //   if (firstError) {
    //     const errorElement = document.getElementsByName(firstError)[0];
    //     if (errorElement) {
    //       errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    //     }
    //   }
    // }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Activity Configuration")}
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
            <AddActivity onSave={handleSave} />
            {/* <PopUp popupProps={modalProp} isOpen={openModal} /> */}
          </Form>
        </FormProvider>
      </Spin>
    </Flex>
  );
};

export default Page;
