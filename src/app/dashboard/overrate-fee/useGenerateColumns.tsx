import React, { useMemo } from "react";
import { ColumnType } from "antd/es/table";

import LongText from "@/components/table/LongText";
import { OverrateFeeTableData } from "@/interfaces/model/overrateFee.type";
import { capitalize } from "@/utils/string";

const useGenerateColumns = () => {
  return useMemo<ColumnType<OverrateFeeTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center",
        fixed: "left",
      },
      {
        title: "Fee Name",
        dataIndex: "fee_name",
        key: "fee_name",
        render: (value) => {
          return <LongText text={value} width={100} />;
        },
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
        title: "Transaction unit",
        dataIndex: "transaction_unit",
        key: "transaction_unit",
        render: (value) => {
          return capitalize(value);
        },
      },
    ],
    [],
  );
};

export default useGenerateColumns;
