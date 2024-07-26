import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

import LongText from "@/components/table/LongText";
import { LANDING_PAGE } from "@/constants/routes";
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
        render: (value) => {
          return <LongText text={value} width={350} />;
        },
      },
      {
        title: "Start Date",
        dataIndex: "start_date",
        key: "start_date",
      },
      {
        title: "End Date",
        dataIndex: "end_date",
        key: "end_date",
      },
      {
        title: "Fee",
        dataIndex: "fee_price",
        key: "fee_price",
      },
      {
        title: "Period",
        dataIndex: "period",
        key: "period",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 150,
        render: (_, record) => {
          return (
            <Link href={`${LANDING_PAGE}/${record.id}`}>
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
