import { FilterBase, TimeTracking } from "../../base";

export type Permission = {
  permission_id: string;
  name: string;
  display_name: string;
  description: string;
};

export type PermissionTableData = Permission;

export type PermissionResponseItem = Permission;

export type PermissionFilterParams = FilterBase<PermissionResponseItem>;

export type PermissionFormValues = Omit<Permission, "permission_id"> & {
  is_valid: boolean;
};
