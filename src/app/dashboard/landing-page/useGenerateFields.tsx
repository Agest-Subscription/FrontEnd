import { useMemo } from "react";
import { Spin } from "antd";

import { useGetInfinitePricingPlans } from "@/hooks/pricingPlan";
import { FieldsData } from "@/interfaces/form";
import {
  LandingPageFormValues,
  PricingPlan,
} from "@/interfaces/model/landingPage.type";
import { mergeAndMapInfiniteData } from "@/utils/infiniteFetch";
import { capitalize } from "@/utils/string";

export const useGenerateFields = (
  initialSelectedRecurrentFees?: PricingPlan[],
) => {
  const {
    data: pricingPlansPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  } = useGetInfinitePricingPlans({
    page_size: 10,
    is_active: true,
  });
  const fields = useMemo<FieldsData<LandingPageFormValues>>(() => {
    const mappedPricingPlansPages =
      pricingPlansPage?.pages.map((page) => ({
        data: page.data.data.map((pricingPlan) => ({
          valueKey: pricingPlan.id,
          labelKey: pricingPlan.name,
        })),
      })) ?? [];

    const mergedRecurrentFees =
      mergeAndMapInfiniteData<PricingPlan>(
        initialSelectedRecurrentFees ?? [],
        "id",
        "name",
        mappedPricingPlansPages,
      ) ?? [];
    return {
      "landing_page_items.[].period": {
        label: capitalize("period"),
        type: "select",
        options: mergedRecurrentFees,
        componentProps: {
          isRequired: true,
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
        options: mergedRecurrentFees,
        componentProps: {
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

      "landing_page_items.[].pro_plan_id": {
        label: capitalize("pro"),
        type: "select",
        options: mergedRecurrentFees,
        componentProps: {
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
      "landing_page_items.[].premium_plan_id": {
        label: capitalize("premium"),
        type: "select",
        options: mergedRecurrentFees,
        componentProps: {
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
    };
  }, [
    fetchNextPage,
    initialSelectedRecurrentFees,
    isFetchingNextPage,
    isInitialLoading,
    pricingPlansPage?.pages,
    setSearchTerm,
  ]);
  return fields;
};
