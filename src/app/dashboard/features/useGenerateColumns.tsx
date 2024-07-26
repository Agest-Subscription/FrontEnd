import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";

import LongText from "@/components/table/LongText";
import TableTag from "@/components/tag/TableTag";
import { FEATURES } from "@/constants/routes";
import { FeatureTableData } from "@/interfaces/model/feature.type";

const useGenerateColumns = () => {
  return useMemo<ColumnType<FeatureTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 250,
        render: (value) => {
          return <LongText text={value} width={250} />;
        },
      },
      {
        title: "Permission",
        dataIndex: "permissions",
        key: "permissions",
        width: 250,
        render: (_, record) => {
          return <TableTag permissions={record.permissions}></TableTag>;
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 450,
        render: (value) => {
          return <LongText text={value} width={450} />;
        },
      },
      {
        title: "Active",
        dataIndex: "is_active",
        key: "is_active",
        align: "center" as const,
        render: (_, record) => {
          return <Checkbox checked={record.is_active}></Checkbox>;
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
            <Link href={`${FEATURES}/${record.id}`}>
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
