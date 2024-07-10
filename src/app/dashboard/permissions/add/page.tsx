"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Flex, Form, Typography, Spin } from "antd";

import PermissionDetails from "../PermissionDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import { capitalize } from "@/utils/string";
import { yupResolver } from "@hookform/resolvers/yup";
import permissionFormValuesSchema from "@/schema/permission";
import { PermissionFormValues } from "@/interfaces/model/permission/permission.type";
import { useAddPermission } from "@/hooks/permission";

type Props = {};
const Page = (props: Props) => {
  const { mutate: addPermission, isLoading: isAdding } = useAddPermission();
  function onSubmit(data: PermissionFormValues) {
    addPermission(data, {
      onSuccess: () => {
        // show modal here
      },
      onError: () => {
        //  show error here
      },
    });
  }
  const fields = useGenerateFields();
  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(permissionFormValuesSchema),
  });
  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Permission Creation")}
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
            <PermissionDetails />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
