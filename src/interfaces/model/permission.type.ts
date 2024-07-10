import { FilterBase } from "../base";

export type Permission = {
  permission_id: string;
  name: string;
  display_name: string;
  description: string | null;
  is_valid: boolean;
};

export type PermissionTableData = Omit<Permission, "is_valid">;

export type PermissionResponseItem = Permission;

export type PermissionFilterParams = FilterBase<PermissionResponseItem>;

export type PermissionFormValues = Omit<Permission, "permission_id"> & {
  is_valid: boolean;
};

export type AddPermissionPayload = PermissionFormValues;

export type UpdatePermissionPayload = Permission;