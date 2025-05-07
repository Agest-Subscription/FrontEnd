"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LeftOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flex, Form, Spin, Typography } from "antd";

import InvoiceDetails from "./InvoiceDetails";
import { useGenerateFields } from "./useGenerateFields";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import { useGetInvoiceDetail, useGetListInvoices } from "@/hooks/invoice";
import { useGetNextBillingDateByUserId } from "@/hooks/invoice";
import { GetListResponse } from "@/interfaces/base";
import {
  Invoice,
  InvoiceFormValues,
  NextBillingDate,
} from "@/interfaces/model/invoice.type";
import { popUpPropType } from "@/interfaces/popup";
import invoiceFormValuesSchema from "@/schema/invoice";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize } from "@/utils/string";

type Props = {};

const Page: React.FC<Props> = () => {
  const [nextBillingDateList, setNextBillingDateList] = useState<
    NextBillingDate[]
  >([]);
  const [invoicesList, setInvoicesList] = useState<
    GetListResponse<Invoice> | undefined
  >();

  const goToActivity = useGoToDashboardTab("activity");
  const [openModal, setOpenModal] = useState(false);
  const [modalProp] = useState<popUpPropType>({
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

  const userId = methods.watch("user_id");
  const NextBillingDateId = methods.watch("subs_next_billing_date");

  const { data: nextBillingDateData, isFetching: isFetchingBill } =
    useGetNextBillingDateByUserId({
      user_id: userId,
    });

  const { data: invoiceData, isFetching: isFetchingInvoice } =
    useGetListInvoices({
      user_id: userId,
      next_billing_date: NextBillingDateId,
    });

  const { data: invoiceDetailData, isFetching: isFetchingInvoiceDetail } =
    useGetInvoiceDetail({
      user_id: userId,
      next_billing_date: NextBillingDateId,
    });

  useEffect(() => {
    if (nextBillingDateData) {
      setNextBillingDateList(nextBillingDateData);
    } else {
      setNextBillingDateList([]);
      setInvoicesList(undefined);
      methods.setValue("subs_next_billing_date", "");
    }

    if (invoiceData) {
      setInvoicesList(invoiceData);
    }
  }, [userId, nextBillingDateData, invoiceData, methods]);

  const fields = useGenerateFields(methods, nextBillingDateList);

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
      <Spin spinning={isFetchingBill}>
        <FormWrapperV2 methods={methods} fields={fields}>
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            layout="vertical"
          >
            <InvoiceDetails
              methods={methods}
              invoicesList={invoicesList}
              isFetching={isFetchingInvoice}
              invoiceDetailData={invoiceDetailData}
              isFetchingInvoiceDetail={isFetchingInvoiceDetail}
            />
            <PopUp popupProps={modalProp} isOpen={openModal} />
          </Form>
        </FormWrapperV2>
      </Spin>
    </Flex>
  );
};

export default Page;
