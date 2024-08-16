"use client";
import React from "react";
import { Flex } from "antd";

import InvoiceBody from "./InvoiceBody";
import InvoiceFooter from "./InvoiceFooter";
import InvoiceHeader from "./InvoiceHeader";

const Invoice: React.FC = () => {
  return (
    <Flex
      vertical
      gap={24}
      style={{
        minWidth: "563px",
        padding: "20px",
        backgroundColor: "#f9fafc",
        border: "0.5px solid #D7DAE0",
      }}
    >
      <InvoiceHeader />
      <InvoiceBody />
      <InvoiceFooter />
    </Flex>
  );
};

export default Invoice;
