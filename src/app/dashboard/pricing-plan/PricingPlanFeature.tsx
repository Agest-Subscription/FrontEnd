import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";
import { Flex, Input, Select, Spin, Table, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import debounce from "lodash/debounce";

import { useGetInfiniteFee } from "@/hooks/fee";
import { Feature } from "@/interfaces/model/feature.type";
import { OverrateFee } from "@/interfaces/model/overrateFee.type";
import {
  OverrateFeeWithNewPrice,
  PricingPlanFeaturesType,
} from "@/interfaces/model/pricingplan.type";
import { capitalize } from "@/utils/string";

type Props = {
  FeatureList: Feature[];
  deleteFeature: (id: number | string) => void;
  dataSource: PricingPlanFeaturesType[];
  setDataSource: React.Dispatch<
    React.SetStateAction<PricingPlanFeaturesType[]>
  >;
  deleteAllFeatures: () => void;
};

const PricingPlanFeatures: React.FC<Props> = ({
  FeatureList,
  deleteFeature,
  dataSource,
  setDataSource,
  deleteAllFeatures,
}) => {
  const {
    data: feesPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  } = useGetInfiniteFee({
    page_size: 10,
    is_recurrence: false,
    is_active: true,
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
          key: feature.id,
          no: index + 1,
          name: feature.name,
          description: feature.description,
          fee: null,
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
            key: feature.id,
            id: feature.id,
            no: prevDataSource.length + index + 1,
            name: feature.name,
            description: feature.description,
            fee: null,
            price: null,
            new_price: null,
            overrate: null,
          })),
        ]);
      }
    }
  }, [FeatureList, dataSource, setDataSource]);

  function mapOverrateFee(overrateFees: OverrateFee[], fee_id: string) {
    return overrateFees.map((fee) => ({
      ...fee,
      new_price: null,
      fee_id: fee_id,
    }));
  }

  const columns = useMemo<ColumnType<PricingPlanFeaturesType>[]>(() => {
    const updateFeeType = (
      value: number | string,
      record: PricingPlanFeaturesType,
    ) => {
      setSearchTerm("");
      const newDataSource = dataSource.map((item) => {
        if (item.no === record.no) {
          const selectedFee = mappedFeePages.find(
            (fee) => fee.value === value,
          )?.fee;
          return {
            ...item,
            fee: selectedFee || null, // Ensure fee is either Fee or null
            price: selectedFee?.price || null,
            children: selectedFee?.overrate_fees?.length
              ? mapOverrateFee(selectedFee.overrate_fees, selectedFee.id)
              : null,
          };
        }
        return item;
      });
      setDataSource(newDataSource);
    };
    const onChangeNewPrice = (
      value: string,
      record: PricingPlanFeaturesType,
    ) => {
      const newDataSource = dataSource.map((item) => {
        if (item.no === record.no) {
          return {
            ...item,
            new_price: Number(value),
          };
        }
        return item;
      });
      setDataSource(newDataSource);
    };

    const onChangeNewPriceOverrateFee = (
      value: string,
      record: OverrateFeeWithNewPrice,
    ) => {
      const newDataSource = dataSource.map((item) => {
        if (item.fee?.id === record.fee_id) {
          return {
            ...item,
            children: item.children?.map((child) =>
              child.id === record.id
                ? { ...child, new_price: Number(value) }
                : child,
            ),
          };
        }
        return item;
      });
      setDataSource(newDataSource);
    };
    const handleDelete = (record: PricingPlanFeaturesType) => {
      deleteFeature(record.id);
      const newDataSource = dataSource
        .filter((item) => item.no !== record.no)
        .map((item) => {
          if (item.no > record.no) {
            return {
              ...item,
              no: item.no - 1,
            };
          }
          return item;
        });

      setDataSource(newDataSource);
    };

    const onScroll = async (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      if (
        !isFetchingNextPage &&
        target.scrollTop + target.offsetHeight === target.scrollHeight
      ) {
        target.scrollTo(0, target.scrollHeight);
        fetchNextPage();
      }
    };

    return [
      {
        title: "No",
        dataIndex: "no",
        align: "center",
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
        dataIndex: "fee",
        width: "150px",
        render: (_, record) => {
          return (
            record.no && (
              <Select
                value={record.fee?.id ?? null}
                options={mappedFeePages}
                onChange={(value) => updateFeeType(value, record)}
                style={{ width: "150px" }}
                onPopupScroll={onScroll}
                showSearch
                optionFilterProp="label"
                onSearch={debounce((value) => setSearchTerm(value), 500)}
                loading={isFetchingNextPage || isInitialLoading}
                dropdownRender={(menu) => (
                  <Spin spinning={isFetchingNextPage || isInitialLoading}>
                    {menu}
                  </Spin>
                )}
              />
            )
          );
        },
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
        render: (_, record) => {
          if (record.no) {
            return record.fee ? (
              <Input
                value={record.new_price ?? ""}
                onChange={(event) =>
                  onChangeNewPrice(event.target.value, record)
                }
              />
            ) : (
              ""
            );
          } else {
            return (
              <Input
                defaultValue={record.new_price ?? ""}
                onChange={(event) =>
                  onChangeNewPriceOverrateFee(event.target.value, record as any)
                }
              />
            );
          }
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        render: (_, record) =>
          record.no && <DeleteOutlined onClick={() => handleDelete(record)} />,
      },
    ];
  }, [
    setSearchTerm,
    dataSource,
    setDataSource,
    mappedFeePages,
    deleteFeature,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  ]);

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
        <Link href="#" style={{ color: "black" }} onClick={deleteAllFeatures}>
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
