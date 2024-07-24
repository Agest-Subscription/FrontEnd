import { useMemo } from "react";
import { Spin } from "antd";

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
        initialSelectedFees ?? [],yan
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
          style: { width: "250px", height: "40px" },
        },
      },
      fee_id: {
        label: "Fee name",
        type: "select",
        options: mergedFees,
        componentProps: {
          isRequired: true,
          style: { width: "250px", height: "40px" },
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
          style: { width: "250px", height: "40px" },
        },
      },
      price: {
        label: "price",
        type: "text",
        componentProps: {
          isRequired: true,
          style: { width: "250px", height: "40px" },
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
  ]);
  return fields;
};
