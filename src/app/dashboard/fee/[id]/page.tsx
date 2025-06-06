"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";
import { omit } from "lodash";

import FeesDetails from "../FeesDetails";
import { useGenerateFields } from "../useGenerateFields";

import NotFound from "@/app/not-found";
import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useDeleteFee, useGetFeeById, useUpdateFee } from "@/hooks/fee";
import useGetId from "@/hooks/useGetId";
import { CustomError } from "@/interfaces/base";
import { Delete, FeeFormValues, Update } from "@/interfaces/model/fee.type";
import { popUpPropType } from "@/interfaces/popup";
import feeFormValuesSchema from "@/schema/fee";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize, trimString } from "@/utils/string";

type Props = {};
const Page: React.FC<Props> = () => {
  const goToFee = useGoToDashboardTab("fee");
  const [openModal, setOpenModal] = useState(false);
  const { mutate: updateFee, isLoading: isUpdating } = useUpdateFee();
  const { mutate: deleteFee, isLoading: isDeleting } = useDeleteFee();
  const id = useGetId();
  const { data: Fee, isError } = useGetFeeById(id);
  const methods = useForm<FeeFormValues>({
    mode: "onBlur",
    resolver: yupResolver(feeFormValuesSchema),
  });
  const fields = useGenerateFields(methods);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to edit a Fee?")}`,
    popup_type: "Confirm",
    onConfirm: methods.handleSubmit(onSubmit),
    onClose: () => setOpenModal(false),
  });

  function formatPayload(data: FeeFormValues) {
    const update: Update[] = [];
    const deleteItems: Delete[] = [];

    const feeReduceDelete = Fee?.overrate_fees?.reduce(
      (acc, item) => {
        if (!data.overrate_fees?.some((fee) => fee.id === item.id)) {
          acc.deleteItems.push(item);
        }
        return acc;
      },
      { deleteItems },
    );

    const feeReduceUpdate = data.overrate_fees?.reduce(
      (acc, item) => {
        if (Fee?.overrate_fees?.some((fee) => fee.id === item.id)) {
          acc.update.push(item);
        }

        return acc;
      },
      { update },
    );

    const createItems = data.overrate_fees?.filter((item) => !item.id) || [];

    if (data.fee_type === "transaction") {
      return {
        ...data,
        recurrence_cycle_count: null,
        recurrence_type: null,
        create: createItems.map((item) => omit(item, "isTransaction")) || [],
        update:
          feeReduceUpdate?.update.map((item) => omit(item, "isTransaction")) ||
          [],
        delete:
          feeReduceDelete?.deleteItems.map((item) =>
            omit(item, "isTransaction"),
          ) || [],
      };
    }
    if (data.fee_type === "onetime") {
      return {
        ...data,
        transaction_unit: null,
        recurrence_cycle_count: null,
        recurrence_type: null,
      };
    }
    if (data.fee_type === "recurrence") {
      return {
        ...data,
        transaction_unit: null,
      };
    }
    return data; // or handle other fee_type cases if necessary
  }
  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }
  function onSubmit(data: FeeFormValues) {
    const newData = formatPayload(data);

    const trimmed = trimString(newData, ["name"]);
    updateFee(
      { id, ...trimmed },
      {
        onSuccess: () => {
          showModal({
            popup_id: "successpopup",
            popup_text: `${capitalize("This Fee is successfully updated!")}`,
            popup_type: "Success",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          });
        },
        onError: (err: CustomError) => {
          showModal({
            popup_id: "fail",
            popup_text: `${getErrorDetail(err) ?? "Fee update failed"}`,
            popup_type: "Fail",
            onConfirm: () => {},
            onClose: () => setOpenModal(false),
          });
        },
      },
    );
  }

  const handleSave = async () => {
    const isValid = await methods.trigger();

    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to update a Fee?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(onSubmit),
        onClose: () => setOpenModal(false),
      });
    } else {
      console.error("Validation Errors: ", methods.formState.errors);
    }
  };

  const handleDelete = () => {
    deleteFee(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This Fee is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => {},
          onClose: () => goToFee(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${getErrorDetail(err) ?? "Fee delete failed"}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        }),
    });
  };

  useEffect(() => {
    if (Fee) {
      methods.setValue("name", Fee.name);
      methods.setValue("fee_type", Fee.fee_type);
      methods.setValue("price", Fee.price);
      methods.setValue("description", Fee.description);
      methods.setValue("transaction_unit", Fee.transaction_unit);
      methods.setValue("recurrence_cycle_count", Fee.recurrence_cycle_count);
      methods.setValue("recurrence_type", Fee.recurrence_type);
      methods.setValue("is_active", Fee.is_active);
      methods.setValue("overrate_fees", Fee.overrate_fees || []);
    }
  }, [Fee, methods]);

  if (isError) {
    return <NotFound previousPage="fee" />;
  }
  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Fee Creation")}
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
            <FeesDetails
              onSave={handleSave}
              methods={methods}
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure to delete this fee?")}`,
                  popup_type: "Confirm",
                  onConfirm: handleDelete,
                  onClose: () => setOpenModal(false),
                })
              }
            />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
