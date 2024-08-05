import React, { useMemo } from "react";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import {DATE_FORMAT} from "@/constants/date";
import LongText from "@/components/table/LongText";
import { SUBSCRIPTIONS } from "@/constants/routes";
import { SubscriptionTableData } from "@/interfaces/model/subscription.type";

const useGenerateColumns = () => {
  return useMemo<ColumnType<SubscriptionTableData>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center",
        width: 100,
      },
      {
        title: "User ID",
        dataIndex: "users",
        key: "users",
        width: 200,
        render: (value) => {
          return <LongText text={value.id} width={200} />;
        },
      },
      {
        title: "Email",
        dataIndex: "users",
        key: "email",
        width: 200,
        render: (value) => {
          return <LongText text={value.email} width={200} />;
        },
      },
      {
        title: "Pricing plan",
        dataIndex: "pricing_plan",
        key: "pricing_plan",
        width: 200,
        render: (_,record) => {
          return <LongText text={record.pricing_plan?.name || ""} width={200} />;
        },
      },
      {
        title: "Cancelled",
        dataIndex: "is_cancelled",
        key: "is_cancelled",
        align: "center",
        width: 150,
        render: (is_cancelled: boolean) => {
          return <Checkbox checked={is_cancelled}></Checkbox>;
        },
      },
      {
        title: "Start date",
        dataIndex: "start_date",
        key: "start_date",
        width: 200,
        render: (value) => {
            return <LongText text={dayjs(value).format(DATE_FORMAT)} width={200} />;
          },
      },
      {
        title: "End date",
        dataIndex: "end_date",
        key: "end_date",
        width: 200,
        render: (value) => {
            return <LongText text={value? dayjs(value).format(DATE_FORMAT) : ""} width={200} />;
          },
      },
      {
        title: "Suspended date",
        dataIndex: "suspended_date",
        key: "suspended_date",
        width: 200,
        render: (value) => {
            return <LongText text={value? dayjs(value).format(DATE_FORMAT) : ""} width={200} />;
          },
      },
      {
        title: "Due date free trial",
        dataIndex: "due_date_free_trial",
        key: "due_date_free_trial",
        width: 200,
        render: (value) => {
            return <LongText text={value? dayjs(value).format(DATE_FORMAT) : ""} width={200} />;
          },
      },
      {
        title: "Auto renew",
        dataIndex: "auto_renew",
        key: "auto_renew",
        align: "center",
        width: 100,
        render: (auto_renew: boolean) => {
            return <Checkbox checked={auto_renew}></Checkbox>;
        },
      },
      {
        title: "Next billing date",
        dataIndex: "next_billing_date",
        key: "next_billing_date",
        width: 200,
        render: (value) => {
            return <LongText text={value? dayjs(value).format(DATE_FORMAT) : ""} width={200} />;
          },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 150,
        fixed: "right",
        render: (_, record) => {
          return (
            <Link href={`${SUBSCRIPTIONS}/${record.id}`}>
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
