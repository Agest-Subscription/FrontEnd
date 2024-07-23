"use client";
import { useEffect, useRef } from "react";
import type { TableColumnsType } from "antd";
import { Flex, Spin, Table, Typography } from "antd";
import Search from "antd/es/input/Search";

import ButtonV1 from "@/components/button/CustomButton";
import { useGetInfiniteFeatures } from "@/hooks/feature";
import { FeatureTableData } from "@/interfaces/model/feature.type";
import { capitalize } from "@/utils/string";

type Props = {
  handleCancel?: () => void;
};

const AddFeature: React.FC<Props> = ({ handleCancel }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const {
    data: featuresPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useGetInfiniteFeatures({
    page_size: 10,
    is_active: true,
  });

  const columns: TableColumnsType<FeatureTableData> = [
    {
      title: "Feature",
      dataIndex: "name",
      key: "name",
      width: "75%",
    },
  ];
  const dataSource =
    featuresPage?.pages.flatMap((features) =>
      features.data.data.map((feature) => ({
        key: feature.id,
        name: feature.name,
      })),
    ) ?? [];
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

  useEffect(() => {
    const node = tableRef.current;
    const handleScroll = () => {
      if (node) {
        const { scrollTop, scrollHeight, clientHeight } = node;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          fetchNextPage();
        }
      }
    };
    if (node) {
      node.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (node) {
        node.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchNextPage]);

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
        <div ref={tableRef} style={{ height: 360, overflow: "auto" }}>
          <Spin spinning={isFetchingNextPage || isInitialLoading}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </Spin>
        </div>
        <Flex gap={24} justify="end">
          <ButtonV1 title="Cancel" customType="cancel" onClick={handleCancel} />
          <ButtonV1 title="Save" />
        </Flex>
      </Flex>
    </>
  );
};

export default AddFeature;
