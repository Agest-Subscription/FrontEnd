import { FilterBase } from "../base";

export type Permission = {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  is_valid: boolean;
};

export type PermissionTableData = Omit<Permission, "is_valid"> & {
  no: number;
};

export type PermissionResponseItem = Permission;

export type PermissionFilterParams = FilterBase<PermissionResponseItem>;

export type PermissionFormValues = Omit<Permission, "id">;

export type AddPermissionPayload = PermissionFormValues;

export type UpdatePermissionPayload = Permission;
