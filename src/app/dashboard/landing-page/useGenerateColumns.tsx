import React, { useMemo } from "react";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

import LongText from "@/components/table/LongText";
import { DATE_FORMAT } from "@/constants/date";
import { LandingPageTableData } from "@/interfaces/model/landingPage.type";

const useGenerateColumns = () => {
  return useMemo<ColumnType<LandingPageTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center",
        width: 100,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 350,
        render: (_, record) => {
          return <LongText text={record?.pricing_plan?.name} width={350} />;
        },
      },
      {
        title: "Start Date",
        dataIndex: "start_date",
        key: "start_date",
        render: (_, record) => {
          return dayjs(record?.pricing_plan?.start_date).format(DATE_FORMAT);
        },
      },
      {
        title: "End Date",
        dataIndex: "end_date",
        key: "end_date",
        render: (_, record) => {
          return dayjs(record?.pricing_plan?.end_date).format(DATE_FORMAT);
        },
      },
      {
        title: "Fee",
        dataIndex: "price",
        key: "price",
        render: (_, record) => {
          return record?.pricing_plan?.recurrence_fee?.price;
        },
      },
      {
        title: "Period",
        dataIndex: "recurrence_period",
        key: "recurrence_period",
        render: (_, record) => {
          return record?.pricing_plan?.recurrence_period;
        },
      },
      {
        title: "Level",
        dataIndex: "priority",
        key: "priority",
        render: (_, record) => {
          return record?.priority;
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 350,
        render: (_, record) => {
          return (
            <LongText
              text={record?.pricing_plan?.description ?? ""}
              width={350}
            />
          );
        },
      },
    ],
    [],
  );
};

export default useGenerateColumns;
