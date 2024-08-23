import React, { useMemo } from "react";
import { Col, Row, Table, TableProps, Typography } from "antd";
import styled from "styled-components";

import useGenerateColumns from "./useGenerateColumns";

import {
  InvoiceDetail,
  InvoiceDetailTableData,
} from "@/interfaces/model/invoice.type";
import { formatStringDate } from "@/utils/date";
import { formatAsMoney } from "@/utils/string";

const { Text } = Typography;

const StyledTable = styled(Table).attrs<TableProps<InvoiceDetailTableData>>({})<
  TableProps<InvoiceDetailTableData>
>`
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

interface Props {
  invoiceDetailData?: InvoiceDetail | undefined;
}

const InvoiceBody: React.FC<Props> = ({ invoiceDetailData }) => {
  const columns = useGenerateColumns();

  const dataSource = useMemo(() => {
    if (invoiceDetailData) {
      return invoiceDetailData.invoice_items.flatMap((item, index) => {
        const rows = [];

        // Add the pricing plan row
        rows.push({
          key: `${index}-plan`,
          item_detail: `${index + 1}. ${item.pricing_plan}`,
          description: item.pricing_plan_desc,
          subs_start_date: item.sub_start_date,
          subs_end_date: item.sub_end_date,
          quantity: 1,
          rate: item.rate,
          amount: item.rate,
        });

        // Add rows for each feature in invoice_details
        item.invoice_details.forEach((detail, detailIndex) => {
          rows.push({
            key: `${index}-detail-${detailIndex}`,
            item_detail: detail.feat_name,
            description: detail.feat_desc,
            isFeature: true,
            quantity: detail.quantity,
            rate: detail.rate,
            amount: detail.quantity * detail.rate,
          });

          // Add rows for overrate fees if they exist
          if (detail.overrate_fees && detail.overrate_fees.length > 0) {
            detail.overrate_fees.forEach((fee, feeIndex) => {
              rows.push({
                key: `${index}-detail-${detailIndex}-fee-${feeIndex}`,
                item_detail: `Overrate (${fee.start} - ${fee.end})`,
                isFeature: true,
                quantity: fee.quantity,
                rate: fee.price,
                amount: fee.quantity * fee.price,
              });
            });
          }
        });

        return rows;
      });
    }
    return [];
  }, [invoiceDetailData]);

  const subtotal = useMemo(() => {
    if (!invoiceDetailData?.invoice_items) return 0;
    return invoiceDetailData.invoice_items.reduce((acc, item) => {
      const itemTotal =
        item.rate +
        item.invoice_details.reduce((detailAcc, detail) => {
          const detailTotal = detail.quantity * detail.rate;
          const overrateTotal =
            detail.overrate_fees?.reduce(
              (feeAcc, fee) => feeAcc + fee.quantity * fee.price,
              0,
            ) || 0;
          return detailAcc + detailTotal + overrateTotal;
        }, 0);
      return acc + itemTotal;
    }, 0);
  }, [invoiceDetailData]);

  const taxRate = invoiceDetailData?.tax ?? 0;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

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
          <Text strong>{invoiceDetailData?.user_email}</Text>
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
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: "28px",
              color: "#E87117",
            }}
          >
            {formatAsMoney(total)}
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
          <Text strong>
            {formatStringDate(invoiceDetailData?.invoice_date)}
          </Text>
        </Col>
        <Col style={{ width: "140px", textAlign: "right" }}>
          <Text>Due date</Text>
          <br />
          <Text strong>{formatStringDate(invoiceDetailData?.due_date)}</Text>
        </Col>
      </Row>
      <StyledTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: "100%" }}
        style={{ marginTop: 24 }}
        rowClassName={(record, index) =>
          record.subs_start_date && record.subs_end_date
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
            <Text>{formatAsMoney(subtotal)}</Text>
          </Row>
          <Row justify="space-between" style={{ paddingBottom: "8px" }}>
            <Text>Tax ({taxRate * 100}%)</Text>
            <Text>{formatAsMoney(taxAmount)}</Text>
          </Row>
          <Row
            justify="space-between"
            style={{ borderTop: " 0.5px solid #1a1c21", paddingTop: "8px" }}
          >
            <Text strong>Total</Text>
            <Text strong>{formatAsMoney(total)}</Text>
          </Row>
        </Col>
      </Row>
      <Row justify="start" style={{ marginTop: 16 }}>
        <Text style={{ fontSize: "16px", fontWeight: 600, lineHeight: "14px" }}>
          Thanks for the business.
        </Text>
      </Row>
    </div>
  );
};

export default InvoiceBody;
