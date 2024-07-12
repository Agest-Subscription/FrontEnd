import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useGenerateColumns from "./useGenerateColumns";

import TableV1 from "@/components/table/TableV1";
import { PERMISSIONS } from "@/constants/routes";
import { useGetListPermission } from "@/hooks/permission";
import useSearchSync from "@/hooks/useSearchSync";
import {
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  PermissionFilterParams,
  PermissionTableData,
} from "@/interfaces/model/permission.type";

type Props = {};

const PermissionList: React.FC<Props> = () => {
  const router = useRouter();
  const { searchQuery, handleSearch } = useSearchSync();
  const [tableParams, setTableParams] = useState<
    TableParams<PermissionTableData>
  >({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });

  const params = useMemo<PermissionFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
      search: searchQuery,
    }),
    [searchQuery, tableParams.pagination],
  );

  const { data: PermissionTableData, isFetching } =
    useGetListPermission(params);
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<PermissionTableData>) => {
    if (Array.isArray(sorter)) return;
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  useEffect(() => {
    if (!PermissionTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: PermissionTableData?.total,
          current:
            current > 1 &&
            PermissionTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [PermissionTableData]);

  const dataSource = useMemo<DataSourceItem<PermissionTableData>[]>(() => {
    return (
      PermissionTableData?.data.map((permission, index) => ({
        ...permission,
        key: permission.id,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [PermissionTableData?.data, params.page, params?.page_size]);

  return (
    <div>
      <TableV1
        loading={isFetching}
        tableTitle="permission"
        showSearchBar={true}
        columns={columns}
        dataSource={dataSource}
        onChange={(pagination, filters) =>
          handleTableChange({ pagination, filters })
        }
        pagination={tableParams.pagination}
        addItem={() => router.push(`${PERMISSIONS}/add`)}
        onSearch={handleSearch}
        searchValue={searchQuery}
      />
    </div>
  );
};

export default PermissionList;
