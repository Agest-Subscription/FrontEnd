import React from "react";
import { Col, Row, Table, Typography } from "antd";
import styled from "styled-components";

import useGenerateColumns from "./useGenerateColumns";

const { Text } = Typography;

const StyledTable = styled(Table)`
  .ant-table {
    font-family: Arial, sans-serif;
    border-top: 0.5px solid #1a1c21;
    border-radius: 0;
  }

  .ant-table-thead > tr > th {
    border-bottom: 0.5px solid #1a1c21;
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: 0.5px solid #1a1c21;
  }

  .ant-table-tbody > tr.has-date-range > td:nth-last-child(-n + 2) {
    border-bottom: 0.5px solid #1a1c21;
  }

  .ant-table-tbody > tr.has-date-range > td {
    padding-top: 64px;
  }

  .ant-table-tbody > tr.first-has-date-range > td {
    padding-top: 16px;
  }
`;

const data = [
  {
    key: "1",
    itemDetail: "1. Pricing plan name 1",
    start: "01/09/2023",
    end: "30/09/2023",
    qty: "1",
    rate: "4,500",
    amount: "4,500",
  },
  {
    key: "2",
    itemDetail: "Default features",
    qty: "1",
    rate: "3,000",
    amount: "3,000",
  },
  {
    key: "3",
    itemDetail: "Transaction Feature name",
    qty: "10",
    rate: "50",
    amount: "500",
  },
  {
    key: "4",
    itemDetail: "One-time Feature name",
    qty: "2",
    rate: "500",
    amount: "1,000",
  },
  {
    key: "5",
    itemDetail: "2. Pricing plan name 2",
    start: "15/09/2023",
    end: "30/09/2023",
    qty: "1",
    rate: "1,500",
    amount: "1,500",
  },
];

const InvoiceBody: React.FC = () => {
  const columns = useGenerateColumns();

  return (
    <div
      style={{
        border: "0.5px solid #D7DAE0",
        borderRadius: "12px",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <Row justify="space-between">
        <Col style={{ width: "140px" }}>
          <Text>Billed to</Text>
          <br />
          <Text strong>Customer Email</Text>
          <br />
          <Text>Customer address</Text>
          <br />
          <Text>City, Country - 000000</Text>
          <br />
          <Text>+0 0000 123 4567</Text>
        </Col>
        <Col style={{ width: "140px" }}>
          <Text>Invoice number</Text>
          <br />
          <Text strong>A882324-01</Text>
        </Col>
        <Col style={{ width: "140px", textAlign: "right" }}>
          <Text>Invoice of (USD)</Text>
          <br />
          <Text
            style={{
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "28px",
              color: "#E87117",
            }}
          >
            $6,000
          </Text>
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: 24 }}>
        <Col style={{ width: "140px" }}>
          <Text>Subject</Text>
          <br />
          <Text strong>ABC System</Text>
        </Col>
        <Col style={{ width: "140px" }}>
          <Text>Invoice date</Text>
          <br />
          <Text strong>01/10/2023</Text>
        </Col>
        <Col style={{ width: "140px", textAlign: "right" }}>
          <Text>Due date</Text>
          <br />
          <Text strong>15/10/2023</Text>
        </Col>
      </Row>
      <StyledTable
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: "100%" }}
        style={{ marginTop: 24 }}
        rowClassName={(record, index) =>
          record.start && record.end
            ? index === 0
              ? "has-date-range first-has-date-range"
              : "has-date-range"
            : ""
        }
      />
      <Row justify="end" style={{ marginTop: 24 }}>
        <Col style={{ width: "40%" }}>
          <Row justify="space-between">
            <Text>Subtotal</Text>
            <Text>$6,500</Text>
          </Row>
          <Row justify="space-between" style={{ paddingBottom: "8px" }}>
            <Text>Tax (10%)</Text>
            <Text>$100</Text>
          </Row>
          <Row
            justify="space-between"
            style={{ borderTop: " 0.5px solid #1a1c21", paddingTop: "8px" }}
          >
            <Text strong>Total</Text>
            <Text strong>$6,600</Text>
          </Row>
        </Col>
      </Row>
      <Row justify="start" style={{ marginTop: 16 }}>
        <Text style={{ fontSize: "16px", fontWeight: 600, lineHeight: "14px" }}>
          Thanks for the business.
        </Text>
      </Row>
      <Row justify="center" style={{ marginTop: 8 }}>
        <Text
          style={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "14px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Page 1/1
        </Text>
      </Row>
    </div>
  );
};

export default InvoiceBody;
