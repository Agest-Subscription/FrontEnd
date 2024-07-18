import { array, boolean, object, ObjectSchema, string } from "yup";
import { FeatureFormValues } from "@/interfaces/model/feature.type";
import { Permission } from "@/interfaces/model/permission.type";

const featureFormValuesSchema: ObjectSchema<FeatureFormValues> = object({
  name: string().required("Name is required"),
  description: string().nullable().default(null),
  permissions: array<Permission>().default(null).required("Permission is required"),
  fee_type: string().required("Fee type is required"),
  is_active: boolean().required("Validity status is required").default(false),
});

export default featureFormValuesSchema;
