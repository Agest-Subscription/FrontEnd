"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Flex, Form, Spin, Typography } from "antd";

import PricingPlanDetails from "../PricingPlanDetails";
import { useGenerateFields } from "../useGenerateFields";

import NotFound from "@/app/not-found";
import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import {
  useDeletePricingPlan,
  useGetPricingPlanById,
  useUpdatePricingPlan,
} from "@/hooks/pricingPlan";
import useGetId from "@/hooks/useGetId";
import { CustomError } from "@/interfaces/base";
import {
  PricingPlanFeaturesType,
  PricingPlanFormValues,
  PricingPlanResponseItem,
  UpdatePricingPlanPayload,
} from "@/interfaces/model/pricingplan.type";
import { popUpPropType } from "@/interfaces/popup";
import { getErrorDetail } from "@/utils/error";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";
import { Fee } from "@/interfaces/model/fee.type";
import { yupResolver } from "@hookform/resolvers/yup";
import pricingplanFormValuesSchema from "@/schema/pricingPlan";

type Props = {};

const Page: React.FC<Props> = () => {
  const { mutate: updatePricingPlan, isLoading: isUpdating } =
    useUpdatePricingPlan();
  const { mutate: deletePricingPlan, isLoading: isDeleting } =
    useDeletePricingPlan();
  const goToPricingPlan = useGoToDashboardTab("pricing-plan");
  const [recurrenceFee, setRecurrenceFee] = useState<Fee | null>(null);
  const id = useGetId();
  const methods = useForm<PricingPlanFormValues>({
    mode: "onBlur",
    resolver: yupResolver(pricingplanFormValuesSchema),
  });
  const [openModal, setOpenModal] = useState(false);
  const has_free_trial = methods.watch("has_free_trial");
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  

  const { data: PricingPlan, isError } = useGetPricingPlanById(id);
  const start_date = methods.watch("start_date");
  const fields = useGenerateFields(start_date, setRecurrenceFee);
  useEffect(() => {
    if (PricingPlan) {
      methods.setValue("description", PricingPlan.description);
      methods.setValue("name", PricingPlan.name);
      methods.setValue("is_active", PricingPlan.is_active);
      methods.setValue("start_date", PricingPlan.start_date);
      methods.setValue("end_date", PricingPlan.end_date);
      methods.setValue("free_trial_period", PricingPlan.free_trial_period);
      methods.setValue(
        "free_trial_period_count",
        PricingPlan.free_trial_period_count,
      );
      methods.setValue("has_free_trial", PricingPlan.has_free_trial);
      methods.setValue("recurrence_fee_id", PricingPlan.recurrence_fee.id);
    }
  }, [PricingPlan, methods]);

  if (isError) {
    return <NotFound previousPage="pricing-plan" />;
  }
  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (
    data: PricingPlanFormValues,
    featureList: PricingPlanFeaturesType[] = [],
  ) => {
    const categorizedData = categorizePayload(PricingPlan, data, featureList);
    updatePricingPlan(categorizedData, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("Pricing plan is updated successfully!"),
          popup_type: "Success",
          onConfirm: () => goToPricingPlan(),
          onClose: () => goToPricingPlan(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(err) ?? "Pricing plan update failed")}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        }),
    });
  };

  const handleDelete = () => {
    deletePricingPlan(id, {
      onSuccess: () =>
        showModal({
          popup_id: "successpopup",
          popup_text: capitalize("This Pricing plan is successfully deleted!"),
          popup_type: "Success",
          onConfirm: () => goToPricingPlan(),
          onClose: () => goToPricingPlan(),
        }),
      onError: (err: CustomError) =>
        showModal({
          popup_id: "fail",
          popup_text: `${capitalize(getErrorDetail(err) ?? "Pricing plan delete failed")}`,
          popup_type: "Fail",
          onConfirm: () => {},
          onClose: () => setOpenModal(false),
        }),
    });
  };

  const handleSave = async (featureList: PricingPlanFeaturesType[]) => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "confirm",
        popup_text: `${capitalize("Are you sure to create a new Pricing Plan?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit((data) =>
          handleSubmit(data, featureList),
        ),
        onClose: () => setOpenModal(false),
      });
    }
  };

  function categorizePayload(
    editRecord: PricingPlanResponseItem | undefined,
    data: PricingPlanFormValues,
    featureList: PricingPlanFeaturesType[],
  ): UpdatePricingPlanPayload {
    const getFeatureAssociation = (item: PricingPlanFeaturesType) => ({
      feature_id: item.id,
      fee_id: item.fee?.id ?? null,
      new_price: item.new_price,
      overrate_fee_associations:
        item.children?.map((child) => ({
          fee_overrate_id: child.id,
          new_overrate_price: child.new_price ?? null,
        })) ?? null,
    });

    const update = featureList
      .filter((item) => item.feature_plan_fee_id != null)
      .map(getFeatureAssociation);

    const add = featureList
      .filter((item) => item.feature_plan_fee_id == null)
      .map(getFeatureAssociation);

    const deleteIds =
      editRecord?.feature_plan_fees
        .filter(
          (item) =>
            !featureList.some((feature) => feature.id === item.feature.id),
        )
        .map((item) => item.id) ?? null;

    return {
      id: id, // Assuming 'id' is a part of 'data'
      ...data,
      features: {
        add,
        update,
        delete: deleteIds,
      },
    };
  }

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("PricingPlan Detail")}
      </Typography>
      <Spin spinning={isUpdating || isDeleting}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
          >
            <PricingPlanDetails
              has_free_trial={has_free_trial}
              selectedRows={PricingPlan?.feature_plan_fees}
              edit
              onDelete={() =>
                showModal({
                  popup_id: "delete",
                  popup_text: `${capitalize("Are you sure to delete this pricing plan?")}`,
                  popup_type: "Confirm",
                  onConfirm: handleDelete,
                  onClose: () => setOpenModal(false),
                })
              }
              recurrenceFee={recurrenceFee}
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
