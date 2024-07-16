import { useMemo, useState } from "react";
import { FieldsData } from "@/interfaces/form";
import { FeatureFormValues } from "@/interfaces/model/feature.type";
import { useGetListPermission } from "@/hooks/permission";

export const useGenerateFields = () => {

  const { data: permissions } = useGetListPermission({
    page: 1,
    page_size: 5,
  })

  const mapAllPermission = permissions?.data?.map(permission => ({
    value: permission.id,
    label: permission.display_name
  })) ?? [];

  const fields = useMemo<FieldsData<FeatureFormValues>>(() => {
    return {
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
          style: { width: "250px", height: "40px" }
        },
      },
      fee_type: {
        label: "Fee type",
        type: 'select',
        options: [
          { value: 'recurrence', label: 'Recurrence' },
          { value: 'transaction', label: 'Transaction' },
          { value: 'onetime', label: 'One-time' },
        ],
        componentProps: {
          isRequired: true,
          style: { width: "250px", height: "40px" }
        },
      },
      permissions: {
        label: "Permission",
        type: 'select',
        options: mapAllPermission,
        componentProps: {
          mode: "multiple",
          isRequired: true,
          style: { width: "250px", height: "40px" },
          maxTagCount: 'responsive',
        },
      },
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          style: { width: "500px", height: "95px" },
        },
      },
      is_valid: {
        label: "Is Valid",
        type: "singleCheckbox",
      },
    };
  }, [mapAllPermission]);
  return fields;
};
