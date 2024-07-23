"use client";
import ButtonV1 from "@/components/button/CustomButton";
import TableV1 from "@/components/table/TableV1";
import { capitalize } from "@/utils/string";
import { Typography, Flex, Table } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox",
  );
  const columns = [
    { title: "Feature", dataIndex: "name", key: "name" },
    { title: "Fee type", dataIndex: "fee_type", key: "fee_type" },
  ];
  const data = [
    { key: '1', name: 'Feature 1', fee_type: 'Type A' },
    { key: '2', name: 'Feature 2', fee_type: 'Type B' },
    { key: '3', name: 'Feature 3', fee_type: 'Type C' },
    { key: '4', name: 'Feature 4', fee_type: 'Type D' },
    { key: '5', name: 'Feature 5', fee_type: 'Type E' },
    { key: '6', name: 'Feature 6', fee_type: 'Type F' },
    { key: '7', name: 'Feature 7', fee_type: 'Type G' },
    { key: '8', name: 'Feature 8', fee_type: 'Type H' },
    { key: '9', name: 'Feature 9', fee_type: 'Type I' },
    { key: '10', name: 'Feature 10', fee_type: 'Type J' },
    { key: '11', name: 'Feature 11', fee_type: 'Type K' },
    { key: '12', name: 'Feature 12', fee_type: 'Type L' },
    { key: '13', name: 'Feature 13', fee_type: 'Type M' },
    { key: '14', name: 'Feature 14', fee_type: 'Type N' },
    { key: '15', name: 'Feature 15', fee_type: 'Type O' },
    { key: '16', name: 'Feature 16', fee_type: 'Type P' },
    { key: '17', name: 'Feature 17', fee_type: 'Type Q' },
    { key: '18', name: 'Feature 18', fee_type: 'Type R' },
    { key: '19', name: 'Feature 19', fee_type: 'Type S' },
    { key: '20', name: 'Feature 20', fee_type: 'Type T' },
  ];
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <>
      <Flex vertical gap={24} style={{ padding: "16px" }}>
        <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
          {capitalize("add feature")}
        </Typography>
        <Flex gap={32} align="center">
          <Search
            placeholder="Search"
            enterButton
            style={{ width: "50%", paddingBottom: "8px", paddingTop: "8px" }}
          />
          <ButtonV1 title="Refresh" customSize="small" />
        </Flex>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          scroll={{ y: 240 }}
          pagination={false}
        />
        <Flex gap={24} justify="end">
          <ButtonV1 title="Cancel" customType="cancel" />
          <ButtonV1 title="Save" />
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
