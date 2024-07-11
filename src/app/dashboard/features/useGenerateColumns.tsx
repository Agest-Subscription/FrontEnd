import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

import { FEATURES } from "@/constants/routes";
import { FeatureTableData } from "@/interfaces/model/feature.type";

const useGenerateColumns = () => {
  return useMemo<ColumnType<FeatureTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Display Name",
        dataIndex: "display_name",
        key: "display_name",
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
        width: 150,
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
