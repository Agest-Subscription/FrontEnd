import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useGenerateColumns from "./useGenerateColumns";

import TableV1 from "@/components/table/TableV1";
import { PRICING_PlANS } from "@/constants/routes";
import { useGetListPricingPlans } from "@/hooks/pricingPlan";
import useSearchSync from "@/hooks/useSearchSync";
import { TableChangeParams, TableParams } from "@/interfaces/base";
import {
  PricingPlanFilterParams,
  PricingPlanTableData,
} from "@/interfaces/model/pricingplan.type";

type Props = {};

const PermissionList: React.FC<Props> = () => {
  const router = useRouter();
  const { searchQuery, handleSearch } = useSearchSync();
  const [tableParams, setTableParams] = useState<
    TableParams<PricingPlanTableData>
  >({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });

  const params = useMemo<PricingPlanFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
      search: searchQuery,
    }),
    [searchQuery, tableParams.pagination],
  );

  const { data: PricingPlanTableData, isFetching } =
    useGetListPricingPlans(params);
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<PricingPlanTableData>) => {
    if (Array.isArray(sorter)) return;
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  useEffect(() => {
    if (!PricingPlanTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: PricingPlanTableData?.total,
          current:
            current > 1 &&
            PricingPlanTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [PricingPlanTableData]);

  // const dataSource = useMemo<DataSourceItem<PricingPlanTableData>[]>(() => {
  //   return (
  //     PricingPlanTableData?.data.map((pricingPlan, index) => ({
  //       ...pricingPlan,
  //       key: pricingPlan.id,
  //       no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
  //     })) ?? []
  //   );
  // }, [PricingPlanTableData?.data, params.page, params?.page_size]);

  return (
    <div>
      <TableV1
        loading={isFetching}
        tableTitle="pricing plan"
        showSearchBar={true}
        columns={columns}
        dataSource={[]}
        onChange={(pagination, filters) =>
          handleTableChange({ pagination, filters })
        }
        pagination={tableParams.pagination}
        addItem={() => router.push(`${PRICING_PlANS}/add`)}
        onSearch={handleSearch}
        searchValue={searchQuery}
      />
    </div>
  );
};

export default PermissionList;
