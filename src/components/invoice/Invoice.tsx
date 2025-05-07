"use client";
import React from "react";
import { Flex } from "antd";

import InvoiceBody from "./InvoiceBody";
import InvoiceFooter from "./InvoiceFooter";
import InvoiceHeader from "./InvoiceHeader";

import { InvoiceDetail } from "@/interfaces/model/invoice.type";

interface Props {
  invoiceDetailData?: InvoiceDetail | undefined;
}

const Invoice: React.FC<Props> = ({ invoiceDetailData }) => {
  return (
    <Flex
      vertical
      gap={24}
      style={{
        padding: "20px",
        backgroundColor: "#f9fafc",
        border: "0.5px solid #D7DAE0",
      }}
    >
      <InvoiceHeader />
      <InvoiceBody invoiceDetailData={invoiceDetailData} />
      <InvoiceFooter />
    </Flex>
  );
};

export default Invoice;
