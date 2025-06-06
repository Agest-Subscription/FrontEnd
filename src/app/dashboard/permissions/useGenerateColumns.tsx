import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";

import LongText from "@/components/table/LongText";
import { PERMISSIONS } from "@/constants/routes";
import { PermissionTableData } from "@/interfaces/model/permission.type";

const useGenerateColumns = () => {
  return useMemo<ColumnType<PermissionTableData>[]>(
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
        title: "Active",
        dataIndex: "is_active",
        key: "is_active",
        align: "center",
        width: 150,
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
