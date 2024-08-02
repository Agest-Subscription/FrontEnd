import { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";

import { PRICING_PlANS } from "@/constants/routes";
import { PricingPlanTableData } from "@/interfaces/model/pricingplan.type";

const useGenerateColumns = () => {
  return useMemo<ColumnType<PricingPlanTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center",
      },
      {
        title: "Start date",
        dataIndex: "start_date",
        key: "start_date",
      },
      {
        title: "End date",
        dataIndex: "end_date",
        key: "end_date",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Feature",
        dataIndex: "features",
        key: "features",
      },
      {
        title: "Active",
        dataIndex: "is_active",
        key: "is_active",
        align: "center",
        render: (is_active: boolean) => {
          return <Checkbox checked={is_active}></Checkbox>;
        },
      },
      {
        title: "Free trial",
        dataIndex: "has_free_trial",
        key: "has_free_trial",
        align: "center",
        render: (is_overrate: boolean) => {
          return <Checkbox checked={is_overrate}></Checkbox>;
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 150,
        align: "center",
        render: (_, record) => {
          return (
            <Link href={`${PRICING_PlANS}/${record.id}`}>
              <EditOutlined size={100} />
            </Link>
          );
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 150,
        align: "center",
        fixed: "right",
        render: (_, record) => {
          return (
            <Link href={`${PRICING_PlANS}/${record.id}`}>
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
