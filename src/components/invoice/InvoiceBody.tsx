import React from "react";
import { Col, Flex, Row, Table, Typography } from "antd";

const { Text } = Typography;

const columns = [
  {
    title: "ITEM DETAIL",
    dataIndex: "itemDetail",
    key: "itemDetail",
  },
  {
    title: "START",
    dataIndex: "start",
    key: "start",
  },
  {
    title: "END",
    dataIndex: "end",
    key: "end",
  },
  {
    title: "QTY",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "RATE",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
  },
];

const data = [
  {
    key: "1",
    itemDetail: "1. Subscription name",
    start: "01/09/2023",
    end: "30/09/2023",
    qty: "1",
    rate: "$4,500",
    amount: "$4,500",
  },
  {
    key: "2",
    itemDetail: "Default features",
    qty: "1",
    rate: "$3,000",
    amount: "$3,000",
  },
];

const InvoiceBody: React.FC = () => {
  return (
    <Flex
      vertical
      gap={24}
      style={{
        border: "0.5px solid #D7DAE0",
        borderRadius: "12px",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <Flex justify="space-between">
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
              fontSize: "28px",
              fontWeight: 700,
              lineHeight: "28px",
              color: "#E87117",
            }}
          >
            $6,000
          </Text>
        </Col>
      </Flex>
      <Flex justify="space-between" gap={128}>
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
      </Flex>
      <Flex vertical gap={24}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          scroll={{ x: "100%" }}
          style={{ width: "100%" }}
        />
      </Flex>
      <Flex vertical gap={8}>
        <Row style={{ justifyContent: "end" }}>
          <Flex justify="space-between" style={{ width: "40%" }}>
            <Text>Subtotal</Text>
            <Text>$6,500</Text>
          </Flex>
        </Row>
        <Row style={{ justifyContent: "end" }}>
          <Flex justify="space-between" style={{ width: "40%" }}>
            <Text>Tax (10%)</Text>
            <Text>$100</Text>
          </Flex>
        </Row>
        <Row style={{ justifyContent: "end" }}>
          <Flex
            justify="space-between"
            style={{
              width: "40%",
              borderTop: "1px solid #D7DAE0",
              paddingTop: "8px",
            }}
          >
            <Text strong>Total</Text>
            <Text strong>$6,600</Text>
          </Flex>
        </Row>
      </Flex>
      <Flex>
        <Text style={{ fontSize: "16px", fontWeight: 600, lineHeight: "14px" }}>
          Thanks for the business.
        </Text>
      </Flex>
      <Flex>
        <Text
          style={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "14px",
            textAlign: "center",
            width: "100%",
          }}
        >
          Page 1/1
        </Text>
      </Flex>
    </Flex>
  );
};

export default InvoiceBody;
