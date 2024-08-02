import { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox, Tag } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

import { DATE_FORMAT } from "@/constants/date";
import { PRICING_PLANS } from "@/constants/routes";
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
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Start date",
        dataIndex: "start_date",
        key: "start_date",
        width: 120,
        render: (value) => <p>{dayjs(value).format(DATE_FORMAT)}</p>,
      },
      {
        title: "End date",
        dataIndex: "end_date",
        key: "end_date",
        width: 120,
        render: (value) => <p>{dayjs(value).format(DATE_FORMAT)}</p>,
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
        render: (_, record) => {
          return (
            <div>
              {record.features?.slice(0, 3).map((feature) => (
                <Tag
                  style={{
                    textAlign: "center",
                    color: "#15ABFF",
                    borderRadius: 14,
                    fontSize: 12,
                    borderColor: "transparent",
                    fontWeight: 400,
                    background: "#F0F9FF",
                    padding: "4px 8px",
                  }}
                  key={feature.id}
                >
                  {feature.name}
                </Tag>
              ))}
            </div>
          );
        },
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
        align: "center",
        render: (_, record) => {
          return (
            <Link href={`${PRICING_PLANS}/${record.id}`}>
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
