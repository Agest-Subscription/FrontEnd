import { useMemo } from "react";
import { Spin } from "antd";
import { debounce } from "lodash";

import { useGetInfiniteIsOverrateFee } from "@/hooks/overrateFee";
import { FieldsData } from "@/interfaces/form";
import {
  IsOverrateFee,
  OverrateFeeFormValues,
} from "@/interfaces/model/overrateFee.type";
import { mergeAndMapInfiniteData } from "@/utils/infiniteFetch";

export const useGenerateFields = (initialSelectedFees?: IsOverrateFee) => {
  const {
    data: feesPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  } = useGetInfiniteIsOverrateFee({
    page_size: 10,
  });

  const fields = useMemo<FieldsData<OverrateFeeFormValues>>(() => {
    const mappedFeesPages =
      feesPage?.pages.map((fee) => ({
        data: fee.data.data.map((fee) => ({
          valueKey: fee.id,
          labelKey: fee.name,
        })),
      })) ?? [];
    const mergedFees =
      mergeAndMapInfiniteData<IsOverrateFee>(
        initialSelectedFees ?? [],
        "id",
        "name",
        mappedFeesPages,
      ) ?? [];
    return {
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
          style: { height: "40px" },
        },
      },
      fee_id: {
        label: "Fee name",
        type: "select",
        options: mergedFees,
        componentProps: {
          isRequired: true,
          showSearch: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: debounce((value) => setSearchTerm(value), 500),
          onChange: () => setSearchTerm(""),
          allowClear: true,
          style: { height: "40px" },
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
      threshold: {
        label: "Threshold",
        type: "text",
        componentProps: {
          isRequired: true,
          style: { height: "40px" },
        },
      },
      price: {
        label: "price",
        type: "text",
        componentProps: {
          isRequired: true,
          style: { height: "40px" },
        },
      },
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          style: { width: "100%" },
          rows: 3,
        },
      },
    };
  }, [
    feesPage?.pages,
    fetchNextPage,
    initialSelectedFees,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  ]);
  return fields;
};
