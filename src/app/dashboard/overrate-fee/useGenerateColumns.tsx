import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

import { OVERRATE_FEE } from "@/constants/routes";
import { OverrateFeeTableData } from "@/interfaces/model/overrateFee.type";

const useGenerateColumns = () => {
  return useMemo<ColumnType<OverrateFeeTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Fee name",
        dataIndex: "fee_id",
        key: "fee_id",
      },
      {
        title: "Threshold",
        dataIndex: "threshold",
        key: "threshold",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Transaction unit",
        dataIndex: "transaction_unit",
        key: "transaction_unit",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 150,
        render: (_, record) => {
          return (
            <Link href={`${OVERRATE_FEE}/${record.id}`}>
              <EditOutlined size={100} />
            </Link>
          );
        },
      },
    ],
    [],
  );
};

export default useGenerateColumns;
