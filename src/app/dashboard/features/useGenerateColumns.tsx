import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";

import TableTag from "@/components/tag/tableTag";
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
      },
      {
        title: "Permission",
        dataIndex: "permission",
        key: "permission",
        render: (_, record) => {
          return <TableTag permissions={record.permissions}></TableTag>;
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Valid",
        dataIndex: "valid",
        key: "valid",
        align: "center" as const,
        render: (_, record) => {
          return <Checkbox checked={record.is_valid}></Checkbox>;
        },
      },
      {
        title: "Fee type",
        dataIndex: "fee_type",
        key: "fee_type",
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
