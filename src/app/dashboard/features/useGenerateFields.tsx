import { useMemo } from "react";
import { Spin } from "antd";

import { useGetInfinitePermission } from "@/hooks/permission";
import { FieldsData } from "@/interfaces/form";
import { FeatureFormValues } from "@/interfaces/model/feature.type";
import { Permission } from "@/interfaces/model/permission.type";
import { mergeAndMapInfiniteData } from "@/utils/infiniteFetch";

export const useGenerateFields = (
  initialSelectedPermissions?: Permission[],
) => {
  const {
    data: permissionsPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  } = useGetInfinitePermission({
    page_size: 10,
    is_active: true,
  });
  const fields = useMemo<FieldsData<FeatureFormValues>>(() => {
    const mappedPermissionsPages =
      permissionsPage?.pages.map((page) => ({
        data: page.data.data.map((permission) => ({
          valueKey: permission.id,
          labelKey: permission.display_name,
        })),
      })) ?? [];

    const mergedPermissions =
      mergeAndMapInfiniteData<Permission>(
        initialSelectedPermissions ?? [],
        "id",
        "display_name",
        mappedPermissionsPages,
      ) ?? [];
    return {
      name: {
        label: "Name",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      permissions: {
        label: "Permission",
        type: "select",
        options: mergedPermissions,
        componentProps: {
          mode: "multiple",
          isRequired: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: (searchTerm) => {
            setSearchTerm(searchTerm);
          },
          onChange: () => setSearchTerm(""),
          allowClear: true,
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
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          rows: 3,
        },
      },
      is_active: {
        label: "Is Active",
        type: "singleCheckbox",
      },
    };
  }, [
    permissionsPage?.pages,
    initialSelectedPermissions,
    setSearchTerm,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  ]);
  return fields;
};
