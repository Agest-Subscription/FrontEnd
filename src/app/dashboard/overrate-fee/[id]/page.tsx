"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import OverrateFeeDetails from "../OverrateFeeDetails";
import { useGenerateFields } from "../useGenerateFields";

import NotFound from "@/app/not-found";
import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import {
  useDeleteOverrateFee,
  useGetOverrateFeeById,
  useUpdateOverrateFee,
} from "@/hooks/overrateFee";
import useGetId from "@/hooks/useGetId";
import { CustomError } from "@/interfaces/base";
import {
  IsOverrateFee,
  OverrateFeeFormValues,
} from "@/interfaces/model/overrateFee.type";
import { popUpPropType } from "@/interfaces/popup";
import overratefeeFormValuesSchema from "@/schema/overrateFee";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize, trimString } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const { mutate: updateOverrateFee, isLoading: isUpdating } =
    useUpdateOverrateFee();
  const { mutate: deleteOverrateFee, isLoading: isDeleting } =
    useDeleteOverrateFee();
  const goToOverrateFee = useGoToDashboardTab("overrate-fee");
  const id = useGetId();
  const { data: OverrateFee, isError } = useGetOverrateFeeById(id);
  const selectedFee: IsOverrateFee = {
    id: OverrateFee?.fee_id ?? "",
    name: OverrateFee?.name ?? "",
  };
  const fields = useGenerateFields(selectedFee);
  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  const methods = useForm<OverrateFeeFormValues>({
    mode: "onBlur",
    resolver: yupResolver(overratefeeFormValuesSchema),
  });

  useEffect(() => {
    if (OverrateFee) {
      //  methods.setValue("name", OverrateFee.name);
      methods.setValue("fee_id", OverrateFee.fee_id);
      methods.setValue("threshold", OverrateFee.threshold);
      methods.setValue("price", OverrateFee.price);
      // methods.setValue("description", OverrateFee.description);
    }
  }, [OverrateFee, methods]);

  if (isError) {
    return <NotFound previousPage="overrate-fee" />;
  }
  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (data: OverrateFeeFormValues) => {
    // const trimmed = trimString(data, ["name"]);
    updateOverrateFee(
      { id, ...data },
      {
        onSuccess: () =>
          showModal({
            popup_id: "successpopup",
            popup_text: capitalize("Overrate Fee is updated successfully!"),
            popup_type: "Success",
            onConfirm: () => {},
            onClose: () => goToOverrateFee(),
          }),
        onError: (err: CustomError) =>
          showModal({
            popup_id: "fail",
            popup_text: `${capitalize(getErrorDetail(err) ?? "Overrate Fee update failed")}`,
            popup_type: "Fail",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          }),
      },
    );
  };

  const handleDelete = () => {
    deleteOverrateFee(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This Overrate Fee is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToOverrateFee(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(err) ?? "Overrate Fee delete failed")}`,
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
        popup_text: `${capitalize("Are you sure to update this overrate fee?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(handleSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Overrate Fee Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
            onFinish={methods.handleSubmit(handleSubmit)}
          >
            <OverrateFeeDetails
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure to delete this overrate fee?")}`,
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
