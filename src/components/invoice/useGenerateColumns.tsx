import React, { useMemo } from "react";
import { ColumnType } from "antd/es/table";

import { InvoiceTableData } from "@/interfaces/model/invoice.type";

const useGenerateColumns = () => {
  return useMemo<ColumnType<InvoiceTableData>[]>(
    () => [
      {
        title: "ITEM DETAIL",
        dataIndex: "itemDetail",
        key: "itemDetail",
        render: (text: string, record: any) => (
          <>
            <div className="item-name" style={{ fontWeight: "bold" }}>
              {text}
            </div>
            {record.description && (
              <div className="item-description">{record.description}</div>
            )}
          </>
        ),
      },
      {
        title: "START",
        dataIndex: "start",
        key: "start",
        className: "date-column",
        render: (value: string) => (
          <div style={{ fontWeight: "bold" }}>{value}</div>
        ),
      },
      {
        title: "END",
        dataIndex: "end",
        key: "end",
        className: "date-column",
        render: (value: string) => (
          <div style={{ fontWeight: "bold" }}>{value}</div>
        ),
      },
      {
        title: "QTY",
        dataIndex: "qty",
        key: "qty",
        className: "number-column",
        render: (value: string) => (
          <div style={{ fontWeight: "bold" }}>{value}</div>
        ),
      },
      {
        title: "RATE",
        dataIndex: "rate",
        key: "rate",
        render: (text, record) => (
          <span
            className={
              record.subs_start_date && record.subs_end_date
                ? "has-date-range"
                : ""
            }
          >
            {text}
          </span>
        ),
      },
      {
        title: "AMOUNT",
        dataIndex: "amount",
        key: "amount",
        render: (text, record) => (
          <span
            className={
              record.subs_start_date && record.subs_end_date
                ? "has-date-range"
                : ""
            }
          >
            {text}
          </span>
        ),
      },
    ],
    [],
  );
};

export default useGenerateColumns;
