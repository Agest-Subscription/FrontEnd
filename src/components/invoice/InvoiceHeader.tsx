import React from "react";
import { Col, Flex, Typography } from "antd";

const { Text } = Typography;

const InvoiceHeader: React.FC = () => {
  return (
    <Flex justify="space-between">
      <Col>
        <Flex align="center" gap={16}>
          <Col>
            <Text
              style={{
                fontSize: "64px",
                fontWeight: 600,
                fontFamily: "YoungSerif",
                lineHeight: "14px",
                color: "#E87117",
              }}
            >
              A
            </Text>
          </Col>
          <Col>
            <Text
              style={{
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "21.78px",
                color: "#E87117",
              }}
            >
              Alvish Baldha
            </Text>
            <br />
            <Text
              style={{ fontSize: "14px", fontWeight: 400, lineHeight: "14px" }}
            >
              www.website.com
            </Text>
            <br />
            <Text
              style={{ fontSize: "14px", fontWeight: 400, lineHeight: "14px" }}
            >
              hello@mail.com
            </Text>
            <br />
            <Text
              style={{ fontSize: "14px", fontWeight: 400, lineHeight: "14px" }}
            >
              +91 00000 00000
            </Text>
          </Col>
        </Flex>
      </Col>
      <Col style={{ textAlign: "right", paddingTop: "20px" }}>
        <Text style={{ fontSize: "14px", fontWeight: 400, lineHeight: "14px" }}>
          Business address
        </Text>
        <br />
        <Text style={{ fontSize: "14px", fontWeight: 400, lineHeight: "14px" }}>
          City, State, IN - 000 000
        </Text>
        <br />
        <Text style={{ fontSize: "14px", fontWeight: 400, lineHeight: "14px" }}>
          TAX ID 00AAAAA1234A1XX
        </Text>
      </Col>
    </Flex>
  );
};

export default InvoiceHeader;
