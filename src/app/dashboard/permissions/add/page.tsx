"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Flex, Form, Typography } from "antd";

import PermissionDetails from "../PermissionDetails";
import { useGenerateFields } from "../useGenerateFields";

import  FormWrapperV2  from "@/components/formV2/FormWrapperV2";
import { capitalize } from "@/utils/string";
type Props = {};

const Page = (props: Props) => {
  function onSubmit() {
    console.log("submit");
  }
  const fields = useGenerateFields();
  const methods = useForm();
  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Permission Creation")}
      </Typography>

      <FormWrapperV2 methods={methods} fields={fields}>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1408px",
          }}
          layout="vertical"
        >
          <PermissionDetails
            onSubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Form>
      </FormWrapperV2>
    </Flex>
  );
};

export default Page;
