"use client";
import type { Key } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Flex, Input, Modal, Spin, Table, Typography } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import { useGetInfiniteFeatures } from "@/hooks/feature";
import useSearchSync from "@/hooks/useSearchSync";
import { Feature } from "@/interfaces/model/feature.type";
import { capitalize } from "@/utils/string";

type Props = {
  onCancel: () => void;
  selectedRows?: Feature[];
  onSave: (selectedRows: Feature[]) => void;
  isModalOpen: boolean;
};

const AddFeature: React.FC<Props> = ({
  onCancel,
  selectedRows = [],
  onSave,
  isModalOpen,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { searchQuery, handleSearch } = useSearchSync();
  const {
    data: featuresPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useGetInfiniteFeatures({
    page_size: 10,
    is_active: true,
    search: searchQuery,
  });
  const totalItemsRef = useRef<number | null>(null);
  const [tempSelectedRowKeys, setTempSelectedRowKeys] = useState<Key[]>(
    selectedRows.map((row) => row.id),
  );
  const [tempSelectedRows, setTempSelectedRows] =
    useState<Feature[]>(selectedRows);

  const columns: TableColumnsType<Feature> = [
    {
      title: "Feature",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
    },
  ];

  const dataSource =
    featuresPage?.pages.flatMap((features) =>
      features.data.data.map((feature) => ({
        ...feature,
        key: feature.id,
      })),
    ) ?? [];

  const rowSelection = {
    selectedRowKeys: tempSelectedRowKeys,
    onChange: (selectedKeys: Key[], selectedRows: Feature[]) => {
      setTempSelectedRowKeys(selectedKeys);
      setTempSelectedRows(selectedRows);
    },
  };

  const handleScroll = useCallback(() => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage]);

  useEffect(() => {
    if (tableRef.current) {
      console.log("hahaha")
      tableRef.current.addEventListener("scroll", handleScroll);
    }
    const node = tableRef.current;
    return () => {
      if (node) {
        node.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, tableRef]);

  const handleCancel = () => {
    setTempSelectedRowKeys(selectedRows.map((row) => row.id));
    setTempSelectedRows(selectedRows);
    onCancel();
  };

  const handleSave = () => {
    onSave(tempSelectedRows);
  };
  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    handleSearch(value);
  };
  useEffect(() => {
    if (
      featuresPage &&
      featuresPage.pages.length > 0 &&
      totalItemsRef.current === null
    ) {
      totalItemsRef.current = featuresPage.pages[0].data.total;
    }
  }, [featuresPage]);
  return (
    <Modal
      open={isModalOpen}
      width={1408}
      footer={null}
      closable={false}
      centered
    >
      <Flex vertical gap={24} style={{ padding: "16px" }}>
        <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
          {capitalize("add feature")}
        </Typography>
        <Flex gap={32} align="center">
          <Input
            placeholder="Search"
            style={{ width: "50%", paddingBottom: "8px", paddingTop: "8px" }}
            prefix={<SearchOutlined />}
            onPressEnter={handlePressEnter}
          />
          <ButtonV1 title="Refresh" customSize="small" />
        </Flex>
        <Flex>
          <Typography
            style={{ fontSize: 14, fontWeight: 400, color: "#9095A1" }}
          >
            {`You've selected ${tempSelectedRowKeys.length}/${totalItemsRef.current}`}
          </Typography>
        </Flex>
        <div
          ref={tableRef}
          style={{ height: 360, overflow: "auto", width: "50%" }}
        >
          <Spin spinning={isFetchingNextPage || isInitialLoading}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              style={{ width: "100%" }}
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </Spin>
        </div>
        <Flex gap={24} justify="end">
          <ButtonV1 title="Cancel" customType="cancel" onClick={handleCancel} />
          <ButtonV1 title="Save" onClick={handleSave} />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AddFeature;
