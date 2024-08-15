import { useMemo } from "react";
import { EditOutlined, EyeOutlined, DashOutlined } from "@ant-design/icons";
import { Checkbox, Dropdown, MenuProps, Tag } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

import { DATE_FORMAT } from "@/constants/date";
import { PRICING_PLANS } from "@/constants/routes";
import { PricingPlanTableData } from "@/interfaces/model/pricingplan.type";
import { useRouter } from "next/navigation";

const useGenerateColumns = () => {
  const router = useRouter();

  const onClick = (record: PricingPlanTableData) => (info: MenuInfo) => {
    const { key } = info;
    if (key === '1') {
      router.push(`${PRICING_PLANS}/${record.id}`);
    } else {
      router.push(`${PRICING_PLANS}/${record.id}/view`);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <p><EditOutlined size={100} /> Edit</p>
    },
    {
      key: '2',
      label:  <p><EyeOutlined size={100} /> View</p>
    },
  ];

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
        width: 150,
        align: "center",
        fixed: "right",
        render: (_, record) => {
          return (
            <Dropdown menu={{ items, onClick: onClick(record) }}>
              <a onClick={(e) => e.preventDefault()}>
              <DashOutlined />
              </a>
            </Dropdown>
          );
        },
      },
    ],
    [],
  );
};

export default useGenerateColumns;
