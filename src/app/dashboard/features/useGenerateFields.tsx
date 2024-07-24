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
          style: { width: "250px", height: "40px" },
        },
      },
      permissions: {
        label: "Permission",
        type: "select",
        options: mergedPermissions,
        componentProps: {
          mode: "multiple",
          isRequired: true,
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
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          style: { width: "500px", height: "95px" },
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
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,
  ]);
  return fields;
};
