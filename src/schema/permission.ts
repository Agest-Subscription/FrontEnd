import { boolean, object, ObjectSchema, string } from "yup";

import { PermissionFormValues } from "@/interfaces/model/permission.type";

const permissionFormValuesSchema: ObjectSchema<PermissionFormValues> = object({
  name: string().required("Name is required"),
  display_name: string().required("Display name is required"),
  description: string().nullable().default(null),
  is_active: boolean().required("Validity status is required").default(false),
});

export default permissionFormValuesSchema;
