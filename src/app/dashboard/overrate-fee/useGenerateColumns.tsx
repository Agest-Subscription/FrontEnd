import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

import LongText from "@/components/table/LongText";
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
        fixed: "left",
      },

      // {
      //   title: "Name",
      //   dataIndex: "name",
      //   key: "name",
      //   render: (value) => {
      //     return <LongText text={value} width={250} />;
      //   },
      // },
      // {
      //   title: "Fee Name",
      //   dataIndex: "fee_name",
      //   key: "fee_name",
      //   render: (value) => {
      //     return <LongText text={value} width={250} />;
      //   },
      // },
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
        render: (value) => {
          return <LongText text={value} width={250} />;
        },
      },
      {
        title: "Transaction Unit",
        dataIndex: "transaction_unit",
        key: "transaction_unit",
        render: (value) => {
          return <LongText text={value} width={250} />;
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        fixed: "right",
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
