import React, { useMemo } from "react";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

import { InvoiceDetailTableData } from "@/interfaces/model/invoice.type";
import { formatAsMoney } from "@/utils/string";

const useGenerateColumns = () => {
  return useMemo<ColumnType<InvoiceDetailTableData>[]>(
    () => [
      {
        title: "ITEM DETAIL",
        dataIndex: "item_detail",
        key: "item_detail",
        render: (text: string, record: any) => (
          <>
            <div
              className="item-name"
              style={{
                fontWeight: "bold",
                paddingLeft: record.isFeature
                  ? 14
                  : record.isOverrateFee
                    ? 40
                    : 0,
              }}
            >
              {text}
            </div>
            {record.description && (
              <div
                className="item-description"
                style={{
                  paddingLeft: record.isFeature
                    ? 14
                    : record.isOverrateFee
                      ? 40
                      : 0,
                }}
              >
                {record.description}
              </div>
            )}
          </>
        ),
      },
      {
        title: "START",
        dataIndex: "sub_start_date",
        key: "sub_start_date",
        className: "date-column",
        render: (value: string) => (
          <div style={{ fontWeight: "bold" }}>
            {value ? dayjs(value).format("YYYY-MM-DD") : ""}
          </div>
        ),
      },
      {
        title: "END",
        dataIndex: "subs_end_date",
        key: "subs_end_date",
        className: "date-column",
        render: (value: string) => (
          <div style={{ fontWeight: "bold" }}>
            {value ? dayjs(value).format("YYYY-MM-DD") : ""}
          </div>
        ),
      },
      {
        title: "QTY",
        dataIndex: "quantity",
        key: "quantity",
        className: "number-column",
        render: (value: string) => (
          <div style={{ fontWeight: "bold" }}>{value}</div>
        ),
      },
      {
        title: "RATE",
        dataIndex: "rate",
        key: "rate",
        render: (value, record) => (
          <span
            className={
              record.subs_start_date && record.subs_end_date
                ? "has-date-range"
                : ""
            }
          >
            {value ? `${formatAsMoney(value)}` : ""}
          </span>
        ),
      },
      {
        title: "AMOUNT",
        dataIndex: "amount",
        key: "amount",
        render: (value, record) => (
          <span
            className={
              record.subs_start_date && record.subs_end_date
                ? "has-date-range"
                : ""
            }
          >
            {value ? `${formatAsMoney(value)}` : ""}
          </span>
        ),
      },
    ],
    [],
  );
};

export default useGenerateColumns;
