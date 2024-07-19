import { array, boolean, object, ObjectSchema, string } from "yup";

import { FeatureFormValues } from "@/interfaces/model/feature.type";
import { Permission } from "@/interfaces/model/permission.type";

const featureFormValuesSchema: ObjectSchema<FeatureFormValues> = object({
  name: string()
    .required("Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  description: string()
    .nullable()
    .default(null)
    .max(255, "Description cannot exceed 255 characters"),
  permissions: array<Permission>()
    .default(null)
    .required("Permission is required")
    .min(1,"Must have at least 1 permisson"),
  fee_type: string().required("Fee type is required"),
  is_active: boolean().required("Validity status is required").default(false),
});

export default featureFormValuesSchema;
