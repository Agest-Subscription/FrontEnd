"use client";
import { Key, useEffect, useMemo, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Flex, Input, Modal, Spin, Table, Typography } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import TableTag from "@/components/tag/TableTag";
import { useGetInfiniteFeatures } from "@/hooks/feature";
import useSearchSync from "@/hooks/useSearchSync";
import { Feature } from "@/interfaces/model/feature.type";
import { capitalize } from "@/utils/string";

type Props = {
  onCancel: () => void;
  onSave: (selectedRows: Feature[]) => void;
  isModalOpen: boolean;
  selectedRows?: Feature[];
};

const AddFeature: React.FC<Props> = ({
  onCancel,
  onSave,
  isModalOpen,
  selectedRows = [],
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const {
    searchQuery,
    handleSearch: _,
    setSearchQuery,
  } = useSearchSync(() => {});
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
  const [savedRowKeys, setSavedRowKeys] = useState<Key[]>(
    selectedRows.map((row) => row.id),
  );
  const [tempSelectedRows, setTempSelectedRows] =
    useState<Feature[]>(selectedRows);
  const [tempSelectedRowKeys, setTempSelectedRowKeys] =
    useState<Key[]>(savedRowKeys);

  const columns: TableColumnsType<Feature> = [
    {
      title: "Feature",
      dataIndex: "name",
      key: "name",
      width: "25%",
      align: "center",
    },
    {
      title: "Permission",
      dataIndex: "permissions",
      key: "permissions",
      width: "65%",
      render: (_, record) => {
        return (
          <TableTag permissions={record.permissions} width="100%"></TableTag>
        );
      },
    },
  ];

  const dataSource = useMemo(
    () =>
      featuresPage?.pages.flatMap((features) =>
        features.data.data.map((feature) => ({
          ...feature,
          key: feature.id,
        })),
      ) ?? [],
    [featuresPage],
  );

  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys: tempSelectedRowKeys,
    onChange: (selectedKeys: Key[], selectedRows: Feature[]) => {
      setTempSelectedRowKeys(selectedKeys);
      setTempSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: Feature) => ({
      disabled: savedRowKeys.includes(record.id),
    }),
    hideSelectAll: true,
  };

  useEffect(() => {
    if (!isModalOpen) {
      setTempSelectedRowKeys(selectedRows.map((item) => item.id));
      setSavedRowKeys(selectedRows.map((item) => item.id));
    }
  }, [isModalOpen, selectedRows]);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          fetchNextPage();
        }
      }
    };
    tableRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tableRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, isModalOpen]);

  const handleCancel = () => {
    setTempSelectedRowKeys(savedRowKeys);
    onCancel();
  };

  const handleSave = () => {
    setSavedRowKeys((prevKeys) => [...prevKeys, ...tempSelectedRowKeys]);
    onSave(tempSelectedRows);
  };

  const handleReset = () => {
    setSearchQuery("");
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSearchQuery((e.target as HTMLInputElement).value);
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
          <ButtonV1 title="Refresh" customSize="small" onClick={handleReset} />
        </Flex>
        <Flex>
          <Typography
            style={{ fontSize: 14, fontWeight: 400, color: "#9095A1" }}
          >
            {`You've selected ${tempSelectedRowKeys.length}/${
              totalItemsRef.current ?? 0
            }`}
          </Typography>
        </Flex>
        <div
          ref={tableRef}
          style={{ height: 360, overflow: "auto", width: "100%" }}
        >
          <Spin spinning={isFetchingNextPage || isInitialLoading}>
            <Table
              rowSelection={{ type: "checkbox", ...rowSelection }}
              style={{ width: "100%" }}
              scroll={{ x: "max-content" }}
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
