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
        title: "Display Name",
        dataIndex: "display_name",
        key: "display_name",
        width: 350,
        render: (value) => {
          return <LongText text={value} width={350} />;
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 350,
        render: (value) => {
          return <LongText text={value} width={350} />;
        },
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
