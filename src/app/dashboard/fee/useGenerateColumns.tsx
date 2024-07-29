import { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";

import LongText from "@/components/table/LongText";
import { FEES } from "@/constants/routes";
import { FeeTableData } from "@/interfaces/model/fee.type";

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
        dataIndex: "fee",
        key: "fee",
      },
      {
        title: "Fee",
        dataIndex: "fee_price",
        key: "fee_price",
      },
      {
        title: "Transaction Unit",
        dataIndex: "transaction_unit",
        key: "transaction_unit",
        render: (value) => {
          return <LongText text={value} />;
        },
      },
      {
        title: "Recurrence Type",
        dataIndex: "recurrence_type",
        key: "recurrence_type",
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
        title: "Overrate Fee",
        dataIndex: "is_overrate",
        key: "is_overrate",
        align: "center",
        render: (is_overrate: boolean) => {
          return <Checkbox checked={is_overrate}></Checkbox>;
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
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
