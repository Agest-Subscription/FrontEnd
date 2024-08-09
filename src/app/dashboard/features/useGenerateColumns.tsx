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
        align: "center",
        width: "50px",
      },

      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "100px",

        render: (value) => {
          return <LongText wrap={false} text={value} width={250} />;
        },
      },
      {
        title: "Permission",
        dataIndex: "permissions",
        key: "permissions",
        width: "700px",
        render: (_, record) => {
          return <TableTag permissions={record.permissions}></TableTag>;
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "400px",
        render: (value) => {
          return <LongText wrap={false} text={value} width={300} />;
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
        width: "1px",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        fixed: "right",
        width: "20px",
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
