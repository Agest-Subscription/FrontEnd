import { useMemo } from "react";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

import LongText from "@/components/table/LongText";
import { DATE_FORMAT } from "@/constants/date";
import { InvoiceTableData } from "@/interfaces/model/invoice.type";
import { capitalize } from "@/utils/string";

const useGenerateColumns = () => {
  return useMemo<ColumnType<InvoiceTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center",
      },
      {
        title: "Feature",
        dataIndex: "feature_name",
        key: "feature_name",
        render: (value) => {
          return <LongText text={capitalize(value)} />;
        },
      },
      {
        title: "Sub ID",
        dataIndex: "subs_id",
        key: "subs_id",
      },
      {
        title: "Subs Start Date",
        dataIndex: "subs_start_date",
        key: "subs_start_date",
        render: (value) => {
          return dayjs(value).format(DATE_FORMAT);
        },
      },
      {
        title: "Subs End Date",
        dataIndex: "subs_end_date",
        key: "subs_end_date",
        render: (value) => {
          return dayjs(value).format(DATE_FORMAT);
        },
      },
      {
        title: "Pricing Plan",
        dataIndex: "pricing_plan_name",
        key: "pricing_plan_name",
        render: (value) => {
          return <LongText text={capitalize(value)} />;
        },
      },
      {
        title: "Fee Name",
        dataIndex: "fee_name",
        key: "fee_name",
        render: (value) => {
          return <LongText text={capitalize(value)} />;
        },
      },
      {
        title: "Fee Type",
        dataIndex: "fee_type",
        key: "fee_type",
      },
      {
        title: "Activity Date",
        dataIndex: "activity_date",
        key: "activity_date",
        render: (value) => {
          return dayjs(value).format(DATE_FORMAT);
        },
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
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
    ],
    [],
  );
};

export default useGenerateColumns;
