"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LeftOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import InvoiceDetails from "./InvoiceDetails";
import { useGenerateFields } from "./useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { InvoiceFormValues } from "@/interfaces/model/invoice.type";
import { popUpPropType } from "@/interfaces/popup";
import invoiceFormValuesSchema from "@/schema/invoice";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const goToActivity = useGoToDashboardTab("activity");
  const fields = useGenerateFields();
  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "",
    popup_text: "",
    popup_type: "Confirm",
    onConfirm: () => {},
    onClose: () => setOpenModal(false),
  });

  const methods = useForm<InvoiceFormValues>({
    mode: "onBlur",
    resolver: yupResolver(invoiceFormValuesSchema),
  });

  // const params = {
  //   page_size: 5,
  // };

  // const { data: Invoice, isError, isFetching } = useGetListInvoices(params);

  // if (isError) {
  //   return <NotFound previousPage="activity/invoice" />;
  // }

  const showModal = (prop: popUpPropType) => {
    setModalProp(prop);
    setOpenModal(true);
  };

  const handleSubmit = (data: InvoiceFormValues) => {};

  const handleSave = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      showModal({
        popup_id: "update",
        popup_text: `${capitalize("Are you sure to update this invoice?")}`,
        popup_type: "Confirm",
        onConfirm: methods.handleSubmit(handleSubmit),
        onClose: () => setOpenModal(false),
      });
    }
  };

  return (
    <Flex vertical gap={24}>
      <div
        style={{
          cursor: "pointer",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          width: "fit-content",
        }}
        onClick={() => goToActivity()}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#40a9ff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#000000e0")}
      >
        <LeftOutlined style={{ marginRight: 8 }} />
        Back
      </div>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Invoice Detail")}
      </Typography>
      <Spin spinning={false}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
            onFinish={methods.handleSubmit(handleSubmit)}
          >
            <InvoiceDetails onSave={handleSave} />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
