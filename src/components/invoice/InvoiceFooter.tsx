import React from "react";
import { Flex, Typography } from "antd";

const { Text } = Typography;

const InvoiceFooter: React.FC = () => {
  return (
    <Flex vertical gap={8}>
      <Text style={{ fontSize: "14px", lineHeight: "14px", fontWeight: 400 }}>
        Terms & Conditions
      </Text>
      <Text style={{ fontSize: "14px", lineHeight: "14px", fontWeight: 400 }}>
        Please pay within 15 days of receiving this invoice.
      </Text>
    </Flex>
  );
};

export default InvoiceFooter;
