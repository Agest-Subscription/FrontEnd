import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import { OverrateFeeFormValues } from "@/interfaces/model/overrateFee.type";
import { useGetListFees } from "@/hooks/fee";

export const useGenerateFields = () => {
  const { data: fees } = useGetListFees({
    page: 1,
    page_size: 5,
  });

  const fields = useMemo<FieldsData<OverrateFeeFormValues>>(() => {
    const mapAllFee =
      fees?.data?.map((fee) => ({
        value: fee.id,
        label: fee.name,
      })) ?? [];

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
        options: mapAllFee,
        componentProps: {
          isRequired: true,
          style: { width: "250px", height: "40px" },
          maxTagCount: "responsive",
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
  }, [fees?.data]);
  return fields;
};
