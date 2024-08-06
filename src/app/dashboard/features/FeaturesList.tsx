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

type Props = {};

const FeaturesList: React.FC<Props> = () => {
  const router = useRouter();
  const { searchQuery, handleSearch } = useSearchSync(resetPagination);
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
  function resetPagination() {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  }

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
  }, [FeatureTableData, params.page, params?.page_size]);

  return (
    <div>
      <TableV1
        scroll={{ x: "max-content" }}
        loading={isFetching}
        tableTitle="feature"
        showSearchBar={true}
        columns={columns}
        dataSource={dataSource}
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
