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
  isSecondButton?: boolean;
  secondButonLabel?: string;
  secondButonColor?: string;
  secondButonOnClick?: () => void;
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
  isSecondButton = false,
  secondButonLabel = "Invoice",
  secondButonColor = "#17A948",
  secondButonOnClick,
  ...rest
}: CustomTableProps<T>) => {
  return (
    <Flex vertical gap={24} style={{ padding: 20, width: "100%" }}>
      {addItem && (
        <Flex justify="space-between">
          <Typography
            style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}
          >
            {capitalize(tableTitle ?? "")}
          </Typography>
          <Flex gap={32}>
            {isSecondButton && (
              <ButtonV1
                onClick={secondButonOnClick}
                customSize="small"
                customBackgroundColor={secondButonColor}
              >
                {secondButonLabel}
              </ButtonV1>
            )}
            <ButtonV1 onClick={addItem} customSize="small">
              {addButtonLabel}
            </ButtonV1>
          </Flex>
        </Flex>
      )}
      {showSearchBar && (
        <Flex align="center" justify={addItem ? "end" : "space-between"}>
          {!addItem && (
            <Typography
              style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}
            >
              {capitalize(tableTitle ?? "")}
            </Typography>
          )}
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
