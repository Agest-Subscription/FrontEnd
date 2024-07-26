import React from "react";
import { Flex, Input, TableColumnsType, Typography } from "antd";
import Table, { TableProps } from "antd/es/table";

import ButtonV1 from "../button/CustomButton";

import { capitalize } from "@/utils/string";

interface CustomTableProps<T> extends TableProps<T> {
  tableTitle?: string;
  columns: TableColumnsType<T>;
  dataSource: T[];
  addItem?: () => void;
  onSearch?: (value: string) => void;
  searchValue?: string;
  showSearchBar?: boolean;
  addButtonLabel?: string;
}
const { Search } = Input;

const TableV1 = <T extends Record<string, any>>({
  columns,
  dataSource,
  addItem,
  tableTitle,
  showSearchBar = false,
  onSearch,
  searchValue = "",
  addButtonLabel = "Add New",
  ...rest
}: CustomTableProps<T>) => {
  return (
    <Flex vertical gap={24} style={{ padding: 20, width: "100%" }}>
      <Flex justify="space-between">
        <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
          {capitalize(tableTitle ?? "")}
        </Typography>
        <ButtonV1 onClick={addItem} customSize="small">
          {addButtonLabel}
        </ButtonV1>
      </Flex>
      {showSearchBar && (
        <Flex justify="end">
          <Search
            placeholder="Search"
            enterButton
            style={{ width: "25%" }}
            onSearch={onSearch}
            defaultValue={searchValue}
          />
        </Flex>
      )}
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        {...rest}
        rowClassName="editable-row"
      ></Table>
    </Flex>
  );
};

export default TableV1;
