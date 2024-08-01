import { useEffect, useMemo, useState } from "react";

import useGenerateColumns from "./useGenerateColumns";

import TableV1 from "@/components/table/TableV1";
import { useGetListLandingPage } from "@/hooks/landingPage";
import useSearchSync from "@/hooks/useSearchSync";
import {
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  LandingPageFilterParams,
  LandingPageTableData,
} from "@/interfaces/model/landingPage.type";

type Props = {};

const LandingPageList: React.FC<Props> = () => {
  const { searchQuery, handleSearch } = useSearchSync();
  const [tableParams, setTableParams] = useState<
    TableParams<LandingPageTableData>
  >({
    pagination: {
      current: 1,
      pageSize: 12,
      showSizeChanger: false,
    },
  });

  const params = useMemo<LandingPageFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
      search: searchQuery,
    }),
    [searchQuery, tableParams.pagination],
  );

  const { data: LandingPageTableData, isFetching } =
    useGetListLandingPage(params);
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<LandingPageTableData>) => {
    if (Array.isArray(sorter)) return;
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  useEffect(() => {
    if (!LandingPageTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: LandingPageTableData?.total,
          current:
            current > 1 &&
            LandingPageTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [LandingPageTableData]);

  const dataSource = useMemo<DataSourceItem<LandingPageTableData>[]>(() => {
    return (
      LandingPageTableData?.data.map((landingPage, index) => ({
        ...landingPage,
        key: landingPage.id,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [LandingPageTableData?.data, params.page, params?.page_size]);

  return (
    <div>
      <TableV1
        scroll={{ x: "max-content" }}
        loading={isFetching}
        tableTitle="Landing Page"
        showSearchBar={true}
        showButton={false}
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

export default LandingPageList;
