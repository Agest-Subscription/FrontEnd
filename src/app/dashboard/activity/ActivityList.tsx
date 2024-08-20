import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useGenerateColumns from "./useGenerateColumns";

import TableV1 from "@/components/table/TableV1";
import { ACTIVITY } from "@/constants/routes";
import { useGetListActivity } from "@/hooks/activity";
import useSearchSync from "@/hooks/useSearchSync";
import {
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  ActivityFilterParams,
  ActivityTableData,
} from "@/interfaces/model/activity.type";

type Props = {};

const ActivityList: React.FC<Props> = () => {
  const router = useRouter();
  const { searchQuery, handleSearch } = useSearchSync(resetPagination);
  const [tableParams, setTableParams] = useState<
    TableParams<ActivityTableData>
  >({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });

  const params = useMemo<ActivityFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
      search: searchQuery,
    }),
    [searchQuery, tableParams.pagination],
  );

  const { data: ActivityTableData, isFetching } = useGetListActivity(params);
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<ActivityTableData>) => {
    if (Array.isArray(sorter)) return;
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  useEffect(() => {
    if (!ActivityTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: ActivityTableData?.total,
          current:
            current > 1 && ActivityTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [ActivityTableData]);

  function resetPagination() {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  }

  const dataSource = useMemo<DataSourceItem<ActivityTableData>[]>(() => {
    return (
      ActivityTableData?.data.map((activity, index) => ({
        ...activity,
        key: activity.id,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [ActivityTableData?.data, params.page, params?.page_size]);

  return (
    <div>
      <TableV1
        scroll={{ x: "max-content" }}
        loading={isFetching}
        tableTitle="activity"
        showSearchBar={true}
        columns={columns}
        dataSource={dataSource}
        onChange={(pagination, filters) =>
          handleTableChange({ pagination, filters })
        }
        pagination={tableParams.pagination}
        addItem={() => router.push(`${ACTIVITY}/add`)}
        onSearch={handleSearch}
        searchValue={searchQuery}
        isSecondButton={true}
        secondButonLabel="Invoice"
        secondButonColor="#17A948"
        secondButonOnClick={() => router.push(`${ACTIVITY}/invoice`)}
      />
    </div>
  );
};

export default ActivityList;
