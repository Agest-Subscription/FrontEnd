"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox, Flex, Input, Select, Table, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import { useGetInfiniteFee } from "@/hooks/fee";
import { Feature } from "@/interfaces/model/feature.type";
import { Fee } from "@/interfaces/model/fee.type";
import { capitalize } from "@/utils/string";

type Props = {
  FeatureList: Feature[];
  deleteFeature: (id: number | string) => void;
};

const PricingPlanFeatures: React.FC<Props> = ({
  FeatureList,
  deleteFeature,
}) => {
  const {
    data: feesPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useGetInfiniteFee({
    page_size: 10,
  });

  const mappedFeePages = useMemo(() => {
    if (!feesPage) return [];

    return feesPage.pages.flatMap((page) =>
      page.data.data.map((fee) => ({
        value: fee.id,
        label: fee.name,
        fee: { ...fee },
      })),
    );
  }, [feesPage]);

  const [dataSource, setDataSource] = useState<PricingPlanFeatures[]>([]);
  const [existingFeatureNames, setExistingFeatureNames] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    // Create a Set to track existing feature names
    const newExistingFeatureNames = new Set(
      dataSource.map((item) => item.name),
    );

    // Find new features that are not already in dataSource
    const newFeatures = FeatureList.filter(
      (feature) => !newExistingFeatureNames.has(feature.name),
    );

    if (newFeatures.length === 0) {
      return;
    }

    if (newExistingFeatureNames.size === 0) {
      setDataSource(
        FeatureList.map((feature, index) => ({
          id: feature.id,
          no: index + 1,
          name: feature.name,
          description: feature.description,
          fee_type: null,
          price: null,
          new_price: null,
          overrate: null,
        })),
      );
    } else {
      // Only update the state if there are new features
      if (newFeatures.length > 0) {
        setDataSource((prevDataSource) => [
          ...prevDataSource,
          ...newFeatures.map((feature, index) => ({
            id: feature.id,
            no: prevDataSource.length + index + 1,
            name: feature.name,
            description: feature.description,
            fee_type: null,
            price: null,
            new_price: null,
            overrate: null,
          })),
        ]);
      }
    }
    setExistingFeatureNames(newExistingFeatureNames);
  }, [FeatureList, dataSource]);

  const updateFeeType = (
    value: string | number,
    record: PricingPlanFeatures,
  ) => {
    const newDataSource = dataSource.map((item) => {
      if (item.no === record.no) {
        const selectedFee = mappedFeePages.find(
          (fee) => fee.value === value,
        )?.fee;
        return {
          ...item,
          fee_type: selectedFee || null, // Ensure fee_type is either Fee or null
          price: selectedFee?.fee_price || null,
          overrate: selectedFee?.is_overrate || null,
        };
      }
      return item;
    });
    setDataSource(newDataSource);
  };

  const handleDelete = (record: PricingPlanFeatures) => {
    deleteFeature(record.id);
    const newDataSource = dataSource.filter((item) => item.id !== record.id);
    setDataSource(newDataSource);
    setExistingFeatureNames(new Set(newDataSource.map((item) => item.name)));
  };

  const columns = useMemo<ColumnType<PricingPlanFeatures>[]>(
    () => [
      {
        title: "No",
        dataIndex: "no",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Fee type",
        dataIndex: "fee_type",
        width: "150px",
        render: (_, record) => {
          return (
            <Select
              options={mappedFeePages}
              onChange={(value) => updateFeeType(value, record)}
              style={{ width: "150px" }}
            />
          );
        },
      },
      {
        title: "Threshold",
        dataIndex: "threshold",
      },
      {
        title: "New Threshold",
        dataIndex: "new threshold",
        width: 150,
        render: () => <Input />,
      },
      {
        title: "Price",
        dataIndex: "price",
        width: 200,
      },
      {
        title: "New Price",
        dataIndex: "new_price",
        width: 150,
        render: () => <Input />,
      },
      {
        title: "Overrate",
        dataIndex: "overrate",
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
        width: 150,
        render: (_, record) => {
          return <DeleteOutlined onClick={() => handleDelete(record)} />;
        },
      },
    ],
    [handleDelete, mappedFeePages, updateFeeType],
  );

  type PricingPlanFeatures = {
    id: string | number;
    no: number;
    name: string;
    description: string | null;
    fee_type: Fee | null;
    price: number | null;
    new_price: number | null;
    overrate: boolean | null;
  };

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
        <Link href="#" style={{ color: "black" }}>
          <DeleteOutlined style={{ fontSize: 24 }} />
        </Link>
      </Flex>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content" }}
        pagination={false}
      ></Table>
    </Flex>
  );
};

export default PricingPlanFeatures;
