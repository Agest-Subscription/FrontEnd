import { useMemo, useState } from "react";
import { Spin } from "antd";

import { useGetInfinitePricingPlanGroupByPeriod } from "@/hooks/landingPage";
import { FieldsData } from "@/interfaces/form";
import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";
import { capitalize } from "@/utils/string";

export const useGenerateFields = () => {
  const {
    data: pricingPlansPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  } = useGetInfinitePricingPlanGroupByPeriod({
    page_size: 10,
  });
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const groupedPricingPlans = useMemo(() => {
    const grouped: { [key: string]: Array<{ id: number; name: string }> } = {};
    pricingPlansPage?.pages?.forEach((page) => {
      page.data.data.forEach((item) => {
        grouped[item.recurrence_period] = item.pricing_plans;
      });
    });
    return grouped;
  }, [pricingPlansPage]);

  const fields = useMemo<FieldsData<LandingPageFormValues>>(() => {
    const recurrencePeriods =
      Object.keys(groupedPricingPlans).map((period) => ({
        value: period,
        label: period,
      })) ?? [];

    const planOptions = selectedPeriod
      ? (groupedPricingPlans[selectedPeriod]?.map((plan) => ({
          value: plan.id,
          label: plan.name,
        })) ?? [])
      : [];

    return {
      "landing_page_items.[].recurrence_period": {
        label: capitalize("period"),
        type: "select",
        options: recurrencePeriods,
        componentProps: {
          isRequired: true,
          showSearch: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: (searchTerm) => {
            setSearchTerm(searchTerm);
          },
          onChange: (value) => {
            setSearchTerm("");
            setSelectedPeriod(value as string);
          },
          allowClear: true,
          style: { width: "250px" },
          maxTagCount: "responsive",
          onPopupScroll: (event: React.UIEvent<HTMLDivElement>) => {
            const target = event.target as HTMLDivElement;
            if (
              !isFetchingNextPage &&
              target.scrollTop + target.offsetHeight === target.scrollHeight
            ) {
              target.scrollTo(0, target.scrollHeight);
              fetchNextPage();
            }
          },
          dropdownRender: (menu) => (
            <Spin spinning={isFetchingNextPage || isInitialLoading}>
              {menu}
            </Spin>
          ),
        },
      },

      "landing_page_items.[].basic_plan_id": {
        label: capitalize("basic"),
        type: "select",
        options: planOptions,
        componentProps: {
          disabled: !selectedPeriod,
          showSearch: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: (searchTerm) => {
            setSearchTerm(searchTerm);
          },
          onChange: () => setSearchTerm(""),
          allowClear: true,
          style: { width: "250px" },
          maxTagCount: "responsive",
        },
      },

      "landing_page_items.[].pro_plan_id": {
        label: capitalize("pro"),
        type: "select",
        options: planOptions,
        componentProps: {
          disabled: !selectedPeriod,
          showSearch: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: (searchTerm) => {
            setSearchTerm(searchTerm);
          },
          onChange: () => setSearchTerm(""),
          allowClear: true,
          style: { width: "250px" },
          maxTagCount: "responsive",
        },
      },

      "landing_page_items.[].premium_plan_id": {
        label: capitalize("premium"),
        type: "select",
        options: planOptions,
        componentProps: {
          disabled: !selectedPeriod,
          showSearch: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: (searchTerm) => {
            setSearchTerm(searchTerm);
          },
          onChange: () => setSearchTerm(""),
          allowClear: true,
          style: { width: "250px" },
          maxTagCount: "responsive",
        },
      },
    };
  }, [
    groupedPricingPlans,
    selectedPeriod,
    setSearchTerm,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  ]);

  return fields;
};
