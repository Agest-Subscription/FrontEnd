"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Flex, Form, Spin, Typography } from "antd";

import PermissionDetails from "../PermissionDetails";
import { useGenerateFields } from "../useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import { capitalize } from "@/utils/string";
import { yupResolver } from "@hookform/resolvers/yup";
import permissionFormValuesSchema from "@/schema/permission";
import {
  PermissionFormValues,
  UpdatePermissionPayload,
} from "@/interfaces/model/permission/permission.type";
import {
  useDeletePermission,
  useGetPermissionById,
  useUpdatePermission,
} from "@/hooks/permission";
import useGetId from "@/hooks/useGetId";

type Props = {};
const Page = (props: Props) => {
  const { mutate: updatePermission, isLoading: isUpdating } =
    useUpdatePermission();
  const { mutate: deletePermission, isLoading: isDeleting } =
    useDeletePermission();
  const permission_id = useGetId();
  const { data: Permission } = useGetPermissionById(permission_id);
  function onSubmit(data: PermissionFormValues) {
    updatePermission(
      { permission_id: permission_id, ...data },
      {
        onSuccess: () => {
          // show modal here
        },
        onError: () => {
          //  show error here
        },
      },
    );
  }
  function handleDelete() {
    deletePermission(permission_id, {
      onSuccess: () => {
        // show modal here
      },
      onError: () => {
        //  show error here
      },
    });
  }
  const fields = useGenerateFields();
  const methods = useForm<PermissionFormValues>({
    mode: "onBlur",
    resolver: yupResolver(permissionFormValuesSchema),
  });
  useEffect(() => {
    if (Permission) {
      methods.setValue("description", Permission.description);
      methods.setValue("display_name", Permission.display_name);
      methods.setValue("name", Permission.name);
      methods.setValue("is_valid", Permission.is_valid);
    }
  }, [Permission, methods]);
  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Permission Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
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
            <PermissionDetails edit onDelete={handleDelete} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
