import { useEffect, useMemo, useState } from "react";

import useGenerateColumns from "./useGenerateColumns";

import TableV1 from "@/components/table/TableV1";
import { useGetListOverrateFee } from "@/hooks/overrateFee";
import useSearchSync from "@/hooks/useSearchSync";
import {
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  OverrateFeeFilterParams,
  OverrateFeeTableData,
} from "@/interfaces/model/overrateFee.type";

type Props = {};

const OverrateFeeList: React.FC<Props> = () => {
  const { searchQuery, handleSearch } = useSearchSync(resetPagination);
  const [tableParams, setTableParams] = useState<
    TableParams<OverrateFeeTableData>
  >({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });

  const params = useMemo<OverrateFeeFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
      search: searchQuery,
    }),
    [searchQuery, tableParams.pagination],
  );

  const { data: OverrateFeeTableData, isFetching } =
    useGetListOverrateFee(params);
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<OverrateFeeTableData>) => {
    if (Array.isArray(sorter)) return;
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  useEffect(() => {
    if (!OverrateFeeTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: OverrateFeeTableData?.total,
          current:
            current > 1 &&
            OverrateFeeTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [OverrateFeeTableData]);

  function resetPagination() {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  }

  const dataSource = useMemo<DataSourceItem<OverrateFeeTableData>[]>(() => {
    return (
      OverrateFeeTableData?.data.map((overrateFee, index) => ({
        ...overrateFee,
        key: overrateFee.id ?? 0,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [OverrateFeeTableData?.data, params.page, params?.page_size]);

  return (
    <div>
      <TableV1
        scroll={{ x: "max-content" }}
        loading={isFetching}
        tableTitle="Overrate Fee"
        showSearchBar={true}
        columns={columns}
        dataSource={dataSource}
        onChange={(pagination, filters) =>
          handleTableChange({ pagination, filters })
        }
        pagination={tableParams.pagination}
        onSearch={handleSearch}
        searchValue={searchQuery}
      />
    </div>
  );
};

export default OverrateFeeList;
