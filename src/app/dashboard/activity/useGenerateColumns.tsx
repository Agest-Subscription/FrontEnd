import { useMemo } from "react";
import { ColumnType } from "antd/es/table";

import LongText from "@/components/table/LongText";
import { ActivityTableData } from "@/interfaces/model/activity.type";
import { capitalize } from "@/utils/string";

const useGenerateColumns = () => {
  return useMemo<ColumnType<ActivityTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center",
      },

      {
        title: "User",
        dataIndex: "user",
        key: "user",
        render: (value) => {
          return <LongText text={value} />;
        },
      },
      {
        title: "Subscription",
        dataIndex: "subscription",
        key: "subscription",
        render: (value) => {
          return <LongText text={value} />;
        },
      },
      {
        title: "Subs Start Date",
        dataIndex: "subs_start_date",
        key: "subs_start_date",
      },
      {
        title: "Subs End Date",
        dataIndex: "subs_end_date",
        key: "subs_end_date",
      },
      {
        title: "Pricing Plan",
        dataIndex: "pricing_plan",
        key: "pricing_plan",
        render: (value) => {
          return <LongText text={capitalize(value)} />;
        },
      },
      {
        title: "Feature",
        dataIndex: "feature",
        key: "feature",
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
      {
        title: "Description",
        dataIndex: "description",
        key: "description",

        render: (value) => {
          return <LongText text={value} />;
        },
      },
    ],
    [],
  );
};

export default useGenerateColumns;
