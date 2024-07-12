import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useGenerateColumns from "./useGenerateColumns";

import TableV1 from "@/components/table/TableV1";
import { FEATURES } from "@/constants/routes";
import { useGetListFeature } from "@/hooks/feature";
import useSearchSync from "@/hooks/useSearchSync";
import {
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  FeatureFilterParams,
  FeatureTableData,
} from "@/interfaces/model/feature.type";
import { Permission } from "@/interfaces/model/permission.type";

type Props = {};

const FeaturesList: React.FC<Props> = () => {
  const router = useRouter();
  const { searchQuery, handleSearch } = useSearchSync();
  const [tableParams, setTableParams] = useState<TableParams<FeatureTableData>>(
    {
      pagination: {
        current: 1,
        pageSize: 5,
        showSizeChanger: false,
      },
    },
  );

  const params = useMemo<FeatureFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
      search: searchQuery,
    }),
    [searchQuery, tableParams.pagination],
  );

  const { data: FeatureTableData, isFetching } = useGetListFeature(params);
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<FeatureTableData>) => {
    if (Array.isArray(sorter)) return;
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  useEffect(() => {
    if (!FeatureTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: FeatureTableData?.total,
          current:
            current > 1 && FeatureTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [FeatureTableData]);

  const dataSource = useMemo<DataSourceItem<FeatureTableData>[]>(() => {
    return (
      FeatureTableData?.data.map((feature, index) => ({
        ...feature,
        key: feature.id,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [FeatureTableData]);

  const samplePermissions: Permission[] = [
    {
      id: "perm-1",
      name: "read",
      display_name: "Read",
      description: null,
      is_valid: false,
    },
    {
      id: "perm-2",
      name: "write",
      display_name: "Write",
      description: null,
      is_valid: false,
    },
  ];

  // Dummy data
  const dummydata = [
    {
      no: 1,
      id: "feature-1",
      name: "Feature 1",
      description: "Description for feature 1",
      permissions: samplePermissions,
      fee_type: "fixed",
      is_valid: true,
    },
    {
      no: 2,
      id: "feature-2",
      name: "Feature 2",
      description: "Description for feature 2",
      permissions: samplePermissions,
      fee_type: "variable",
      is_valid: true,
    },
    {
      no: 3,
      id: "feature-3",
      name: "Feature 3",
      description: "Description for feature 3",
      permissions: samplePermissions,
      fee_type: "fixed",
      is_valid: false,
    },
    {
      no: 4,
      id: "feature-4",
      name: "Feature 4",
      description: "Description for feature 4",
      permissions: samplePermissions,
      fee_type: "variable",
      is_valid: true,
    },
    {
      no: 5,
      id: "feature-5",
      name: "Feature 5",
      description: "Description for feature 5",
      permissions: samplePermissions,
      fee_type: "fixed",
      is_valid: true,
    },
    {
      no: 6,
      id: "feature-6",
      name: "Feature 6",
      description: "Description for feature 6",
      permissions: samplePermissions,
      fee_type: "variable",
      is_valid: false,
    },
    {
      no: 7,
      id: "feature-7",
      name: "Feature 7",
      description: "Description for feature 7",
      permissions: samplePermissions,
      fee_type: "fixed",
      is_valid: true,
    },
    {
      no: 8,
      id: "feature-8",
      name: "Feature 8",
      description: "Description for feature 8",
      permissions: samplePermissions,
      fee_type: "variable",
      is_valid: true,
    },
    {
      no: 9,
      id: "feature-9",
      name: "Feature 9",
      description: "Description for feature 9",
      permissions: samplePermissions,
      fee_type: "fixed",
      is_valid: false,
    },
    {
      no: 10,
      id: "feature-10",
      name: "Feature 10",
      description: "Description for feature 10",
      permissions: samplePermissions,
      fee_type: "variable",
      is_valid: true,
    },
  ];

  return (
    <div>
      <TableV1
        tableTitle="feature"
        showSearchBar={true}
        columns={columns}
        dataSource={dummydata}
        onChange={(pagination, filters) =>
          handleTableChange({ pagination, filters })
        }
        pagination={tableParams.pagination}
        addItem={() => router.push(`${FEATURES}/add`)}
        onSearch={handleSearch}
        searchValue={searchQuery}
      />
    </div>
  );
};

export default FeaturesList;
