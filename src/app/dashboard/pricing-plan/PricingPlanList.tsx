import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useGenerateColumns from "./useGenerateColumns";

import TableV1 from "@/components/table/TableV1";
import { PRICING_PlANS } from "@/constants/routes";
import { useGetListPricingPlans } from "@/hooks/pricingPlan";
import useSearchSync from "@/hooks/useSearchSync";
import {
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  PricingPlanFilterParams,
  PricingPlanTableData,
} from "@/interfaces/model/pricingplan.type";

type Props = {};

const PermissionList: React.FC<Props> = () => {
  const dataSource: PricingPlanTableData[] = [
    {
      no: 1,
      id: "plan1",
      name: "Basic Plan",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      price: 9.99,
      description: "A basic plan for individuals.",
      features: ["Feature A", "Feature B"],
      is_free_trial: true,
      free_period: "days",
      free_period_count: 14,
      is_active: true,
    },
    {
      no: 2,
      id: "plan2",
      name: "Standard Plan",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      price: 19.99,
      description: "A standard plan for small teams.",
      features: ["Feature A", "Feature B", "Feature C"],
      is_free_trial: true,
      free_period: "days",
      free_period_count: 30,
      is_active: true,
    },
    {
      no: 3,
      id: "plan3",
      name: "Pro Plan",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      price: 49.99,
      description: "A professional plan for businesses.",
      features: ["Feature A", "Feature B", "Feature C", "Feature D"],
      is_free_trial: false,
      free_period: null,
      free_period_count: null,
      is_active: true,
    },
    {
      no: 4,
      id: "plan4",
      name: "Enterprise Plan",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      price: 99.99,
      description: "An enterprise plan with all features.",
      features: [
        "Feature A",
        "Feature B",
        "Feature C",
        "Feature D",
        "Feature E",
      ],
      is_free_trial: false,
      free_period: null,
      free_period_count: null,
      is_active: false,
    },
    {
      no: 5,
      id: "plan5",
      name: "Student Plan",
      start_date: "2023-01-01",
      end_date: "2023-06-30",
      price: 4.99,
      description: "A discounted plan for students.",
      features: ["Feature A", "Feature B"],
      is_free_trial: true,
      free_period: "weeks",
      free_period_count: 2,
      is_active: true,
    },
    {
      no: 6,
      id: "plan6",
      name: "Annual Plan",
      start_date: "2023-01-01",
      end_date: "2024-01-01",
      price: 199.99,
      description: "A yearly plan with additional savings.",
      features: ["Feature A", "Feature B", "Feature C"],
      is_free_trial: true,
      free_period: "months",
      free_period_count: 1,
      is_active: true,
    },
  ];

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
        dataSource={dataSource}
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
