import { FilterBase } from "../base";
import { Permission } from "./permission.type";

export type Feature = {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  fee_type: string;
  is_valid: boolean;
  created_at: string;
  updated_at: string;
};

export type FeatureTableData = Omit<Feature, "created_at" | "updated_at">


export type FeatureResponseItem = Feature;

export type FeatureFilterParams = FilterBase<FeatureResponseItem>;

export type FeatureFormValues = Omit<Feature, "feature_id"> & {
  is_valid: boolean;
};

export type AddFeaturePayload = FeatureFormValues;

export type UpdateFeaturePayload = Feature;