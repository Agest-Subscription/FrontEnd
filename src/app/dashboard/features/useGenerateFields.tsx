import { useMemo } from "react";
import { FieldsData } from "@/interfaces/form";
import { FeatureFormValues } from "@/interfaces/model/feature.type";
import { Permission } from "@/interfaces/model/permission.type";

export const useGenerateFields = () => {
  const dummy: Permission[] = [
    {
      id: "perm-1",
      name: "read",
      display_name: "Read",
      description: null,
      is_valid: false,
    },
    {
      id: "perm-2",
      name: "write",
      display_name: "Write",
      description: null,
      is_valid: false,
    },
  ];
  const mapPermission = dummy.map(permission => ({
    value: permission.id,
    label: permission.display_name
  }));

const fields = useMemo<FieldsData<FeatureFormValues>>(() => {
  return {
    name: {
      label: "Name",
      type: "text",
      componentProps: {
        isRequired: true,
      },
    },
    fee_type: {
      label: "Fee type",
      type: 'select',
      options: [
        { value: 'recurrence', label: 'Recurrence' },
        { value: 'transaction', label: 'Transaction' },
        { value: 'one-time', label: 'One-time' },
      ],
        componentProps: {
        isRequired: true,
      },
    },
    permissions: {
      label: "Permission",
      type: 'select',
      options: mapPermission,
      componentProps: {
        mode: "multiple",
        isRequired: true,
      },
    },
    description: {
      label: "Description",
      type: "textarea",
      componentProps: {
        style: { width: "100%" },
      },
    },
    is_valid: {
      label: "Is Valid",
      type: "singleCheckbox",
    },
  };
}, []);
return fields;
};
