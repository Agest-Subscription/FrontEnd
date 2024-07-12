import { FilterBase } from "../base";
import { FilterBase } from "../base";
import { Permission } from "./permission.type";

export type Feature = {
export type Feature = {
  id: string;
  name: string;
  description: string | null;
  permissions: Permission[];
  fee_type: string;
  is_valid: boolean;
  created_at: string;
  updated_at: string;
};

export type FeatureTableData = Omit<Feature, "created_at" | "updated_at"> & {
  no: number;
};

export type FeatureResponseItem = Feature;

export type FeatureFilterParams = FilterBase<FeatureResponseItem>;

export type FeatureFormValues = Omit<Feature, "id" | "created_at" | "updated_at" | "permissions"> & {
  is_valid: boolean;
  permissions: string[];
};
export type AddFeaturePayload = FeatureFormValues;

export type UpdateFeaturePayload = Feature;
