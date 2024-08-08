import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useGenerateColumns from "./useGenerateColumns";

import TableV1 from "@/components/table/TableV1";
import { SUBSCRIPTIONS } from "@/constants/routes";
import { useGetListSubscription } from "@/hooks/subscription";
import useSearchSync from "@/hooks/useSearchSync";
import {
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  SubscriptionFilterParams,
  SubscriptionTableData,
} from "@/interfaces/model/subscription.type";

type Props = {};

const SubscriptionList: React.FC<Props> = () => {
  const router = useRouter();
  const { searchQuery, handleSearch } = useSearchSync(resetPagination);
  const [tableParams, setTableParams] = useState<
    TableParams<SubscriptionTableData>
  >({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });

  const params = useMemo<SubscriptionFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
      search: searchQuery,
    }),
    [searchQuery, tableParams.pagination],
  );

  const { data: SubscriptionTableData, isFetching } =
    useGetListSubscription(params);
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<SubscriptionTableData>) => {
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
    if (!SubscriptionTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: SubscriptionTableData?.total,
          current:
            current > 1 &&
            SubscriptionTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [SubscriptionTableData]);

  const dataSource = useMemo<DataSourceItem<SubscriptionTableData>[]>(() => {
    return (
      SubscriptionTableData?.data.map((Subscription, index) => ({
        ...Subscription,
        key: Subscription.id,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [SubscriptionTableData?.data, params.page, params?.page_size]);
  
  return (
    <div>
      <TableV1
        scroll={{ x: "max-content" }}
        loading={isFetching}
        tableTitle="Subscription"
        showSearchBar={true}
        columns={columns}
        dataSource={dataSource}
        onChange={(pagination, filters) =>
          handleTableChange({ pagination, filters })
        }
        pagination={tableParams.pagination}
        addItem={() => router.push(`${SUBSCRIPTIONS}/add`)}
        onSearch={handleSearch}
        searchValue={searchQuery}
      />
    </div>
  );
};

export default SubscriptionList;
