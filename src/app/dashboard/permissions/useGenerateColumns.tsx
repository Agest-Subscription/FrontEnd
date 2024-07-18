import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

import { PERMISSIONS } from "@/constants/routes";
import { PermissionTableData } from "@/interfaces/model/permission.type";
import LongText from "@/components/table/LongText";

const useGenerateColumns = () => {
  return useMemo<ColumnType<PermissionTableData>[]>(
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
        title: "Display Name",
        dataIndex: "display_name",
        key: "display_name",
        render: (value) => {
          return <LongText text={value} />;
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 150,
        render: (_, record) => {
          return (
            <Link href={`${PERMISSIONS}/${record.id}`}>
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
