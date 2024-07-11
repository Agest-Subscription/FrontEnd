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
      PermissionTableData?.data.map((permission) => ({
        ...permission,
        key: permission.id,
      })) ?? []
    );
  }, [PermissionTableData]);

  // Dummy data
  const dummyPermissions = [
    {
      permission_id: "1",
      name: "read_user",
      display_name: "Read User",
      description: "Allows reading user information.",
    },
    {
      permission_id: "2",
      name: "write_user",
      display_name: "Write User",
      description: "Allows modifying user information.",
    },
    {
      permission_id: "3",
      name: "delete_user",
      display_name: "Delete User",
      description: "Allows deleting a user.",
    },
    {
      permission_id: "4",
      name: "read_permission",
      display_name: "Read Permission",
      description: "Allows reading permission information.",
    },
    {
      permission_id: "5",
      name: "write_permission",
      display_name: "Write Permission",
      description: "Allows modifying permission information.",
    },
    {
      permission_id: "6",
      name: "delete_permission",
      display_name: "Delete Permission",
      description: "Allows deleting a permission.",
    },
    {
      permission_id: "7",
      name: "read_role",
      display_name: "Read Role",
      description: "Allows reading role information.",
    },
    {
      permission_id: "8",
      name: "write_role",
      display_name: "Write Role",
      description: "Allows modifying role information.",
    },
    {
      permission_id: "9",
      name: "delete_role",
      display_name: "Delete Role",
      description: "Allows deleting a role.",
    },
    {
      permission_id: "10",
      name: "read_settings",
      display_name: "Read Settings",
      description: "Allows reading system settings.",
    },
    {
      permission_id: "11",
      name: "write_settings",
      display_name: "Write Settings",
      description: "Allows modifying system settings.",
    },
    {
      permission_id: "12",
      name: "delete_settings",
      display_name: "Delete Settings",
      description: "Allows deleting system settings.",
    },
  ];

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
