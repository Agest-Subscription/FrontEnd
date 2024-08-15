import React, { useMemo } from "react";
import { Flex, Table, Typography } from "antd";
import {
  FeaturePlanFee,
  OverrateFeeAssociation,
} from "@/interfaces/model/pricingplan.type";
import { capitalize } from "@/utils/string";
import { ColumnType } from "antd/es/table";
import TableTag from "@/components/tag/TableTag";
import { Permission } from "@/interfaces/model/permission.type";

type Props = {
  FeaturePlanList: FeaturePlanFee[] | null;
};

type FeaturePlanItem = {
  id: number;
  key: number;
  no: number;
  feature_name: string;
  fee_name: string | undefined;
  price: number | undefined;
  new_price: number | null;
  permissions: Permission[];
  children?: OverrateFeeAssociation[];
};

const PricingPlanFeaturesView: React.FC<Props> = ({
  FeaturePlanList,
}) => {

  const dataSource = FeaturePlanList?.map((feature_plan, index) => (
  {
    id: feature_plan.id,
    key: feature_plan.id,
    no: index + 1,
    feature_name: feature_plan.feature.name,
    fee_name: feature_plan.fee?.name,
    price: feature_plan.fee?.price,
    new_price: feature_plan.new_price,
    permissions: feature_plan.feature.permissions,
    children: feature_plan.overrate_fees,
  })) ?? []


  
  const filterDataSource: FeaturePlanItem[] = [];

  for(const item of dataSource){
    if(item.children !== null){
      const childrenData = item.children;
      const newChildrenData = childrenData.map(item => {
        return {...item, new_price: item.new_overrate_price}
      })
      filterDataSource.push({...item, children: [...newChildrenData]})
    }else{
      filterDataSource.push(item)
    }
  }

  const columns  = useMemo<ColumnType<FeaturePlanItem>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
      },
      {
        title: "Feature",
        dataIndex: "feature_name",
      },
      {
        title: "Permissions",
        dataIndex: "permissions",
        render: (_, record) => {
          return <TableTag permissions={record.permissions}></TableTag>;
        },
      },
      {
        title: "Fee name",
        dataIndex: "fee_name",
      },
      {
        title: "Threshold",
        dataIndex: "threshold",
      },
      {
        title: "Price",
        dataIndex: "price",
      },
      {
        title: "New Price",
        dataIndex: "new_price",
      }
    ],
    [],
  );

  return (
    <Flex
      style={{
        border: "1px solid #1E2128",
        padding: "12px",
        background: "#f5f5f5",
      }}
      vertical
      gap={12}
    >
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Typography style={{ fontSize: 18, fontWeight: 700, color: "#2F80ED" }}>
          {capitalize("list of features")}
        </Typography>
      </Flex>
      <Table
        columns={columns}
        dataSource={filterDataSource}
        scroll={{ x: "max-content" }}
        pagination={false}
      ></Table>
    </Flex>
  );
};

export default PricingPlanFeaturesView;
