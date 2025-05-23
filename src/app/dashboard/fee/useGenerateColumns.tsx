import { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";

import LongText from "@/components/table/LongText";
import { FEES } from "@/constants/routes";
import { FeeTableData } from "@/interfaces/model/fee.type";
import { capitalize } from "@/utils/string";

const useGenerateColumns = () => {
  return useMemo<ColumnType<FeeTableData>[]>(
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
        render: (value) => {
          return <LongText text={value} />;
        },
      },
      {
        title: "Type",
        dataIndex: "fee_type",
        key: "fee_type",
        render: (value) => {
          return capitalize(value);
        },
      },
      {
        title: "Fee",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Transaction Unit",
        dataIndex: "transaction_unit",
        key: "transaction_unit",
        render: (value) => {
          return <LongText text={capitalize(value)} />;
        },
      },
      {
        title: "Recurrence Type",
        dataIndex: "recurrence_type",
        key: "recurrence_type",
        render: (value) => {
          return capitalize(value);
        },
      },
      {
        title: "Recurrence Cycle Count",
        dataIndex: "recurrence_cycle_count",
        key: "recurrence_cycle_count",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",

        render: (value) => {
          return <LongText text={value} />;
        },
      },
      {
        title: "Active",
        dataIndex: "is_active",
        key: "is_active",
        align: "center",
        render: (is_active: boolean) => {
          return <Checkbox checked={is_active}></Checkbox>;
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        fixed: "right",
        render: (_, record) => {
          return (
            <Link href={`${FEES}/${record.id}`}>
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
