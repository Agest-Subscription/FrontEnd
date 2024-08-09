import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { ConfigProvider, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

import LongText from "@/components/table/LongText";
import { DATE_FORMAT } from "@/constants/date";
import { USERS } from "@/constants/routes";
import { UserTableData } from "@/interfaces/model/user";

const useGenerateColumns = () => {
  return useMemo<ColumnType<UserTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        width: 100,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
        render: (value) => {
          return <LongText text={value} width={250} />;
        },
      },
      {
        title: "Status",
        dataIndex: "is_active",
        key: "is_active",
        width: 120,
        align: "center" as const,
        render: (_, record) => {
          return (
            <ConfigProvider
              theme={{
                token: {
                  borderRadiusSM: 14,
                  fontSize: 20,
                },
              }}
            >
              <Tag
                bordered={false}
                color={record.is_active ? "success" : "error"}
              >
                {record.is_active ? "Active" : "Inactive"}
              </Tag>
            </ConfigProvider>
          );
        },
      },
      {
        title: "Last login date",
        dataIndex: "last_login_date",
        key: "last_login_date",
        width: 200,
        render: (value) => {
          return (
            <LongText
              text={
                value !== null ? dayjs(value).format(DATE_FORMAT) : "Not Login"
              }
              width={450}
            />
          );
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 150,
        align: "center" as const,
        render: (_, record) => {
          return (
            <Link href={`${USERS}/${record.id}`}>
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
