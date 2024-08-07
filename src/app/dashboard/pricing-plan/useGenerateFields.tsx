import { useMemo } from "react";
import { Spin } from "antd";
import dayjs from "dayjs";
import { debounce } from "lodash";

import { useGetInfiniteFee } from "@/hooks/fee";
import { FieldsData } from "@/interfaces/form";
import {
  FreeTrialPeriodEnum,
  PricingPlanFormValues,
} from "@/interfaces/model/pricingplan.type";
import { enumToSelectOptions } from "@/utils/enum";

export const useGenerateFields = (start_date: string) => {
  const {
    data: feePages,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  } = useGetInfiniteFee({
    page_size: 10,
    is_active: true,
    is_recurrence: true,
  });
  const mappedFeePages = useMemo(() => {
    if (!feePages) return [];

    return feePages.pages.flatMap((page) =>
      page.data.data.map((fee) => ({
        value: fee.id,
        label: fee.name,
        fee: { ...fee },
      })),
    );
  }, [feePages]);

  const fields = useMemo<FieldsData<PricingPlanFormValues>>(() => {
    return {
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      recurrence_fee_id: {
        label: "Recurrence fee name",
        type: "select",
        options: mappedFeePages,
        componentProps: {
          isRequired: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: debounce((value) => setSearchTerm(value), 500),
          allowClear: true,
          style: { height: "40px" },
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
      start_date: {
        label: "Start date",
        type: "datepicker",
        componentProps: {
          isRequired: true,
          minDate: dayjs(),
        },
      },
      end_date: {
        label: "End date",
        type: "datepicker",
        componentProps: {
          isRequired: true,
          minDate: dayjs(start_date).add(1, "day"),
        },
      },
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          rows: 4,
        },
      },
      free_trial_period: {
        label: "Free trial period",
        type: "select",
        options: enumToSelectOptions(FreeTrialPeriodEnum),
        componentProps: {
          isRequired: true,
          style: {
            height: "40px",
          },
        },
      },
      free_trial_period_count: {
        label: "Free trial cycle count",
        type: "text",
        componentProps: {
          isRequired: true,
          style: {
            height: "40px",
          },
          type: "number",
          min: 0,
        },
      },
      is_active: {
        label: "Is active",
        type: "singleCheckbox",
      },
      has_free_trial: {
        label: "Has free trial",
        type: "singleCheckbox",
      },
    };
  }, [
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    mappedFeePages,
    setSearchTerm,
    start_date,
  ]);
  return fields;
};
