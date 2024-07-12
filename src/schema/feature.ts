import { array, boolean, object, ObjectSchema, string } from "yup";
import { FeatureFormValues } from "@/interfaces/model/feature.type";

const featureFormValuesSchema: ObjectSchema<FeatureFormValues> = object({
  name: string().required("Name is required"),
  description: string().nullable().default(null),
  permissions: array<any>().default(null).min(1),
  fee_type: string().required("Fee type is required"),
  is_valid: boolean().required("Validity status is required").default(false),
});

export default featureFormValuesSchema;
