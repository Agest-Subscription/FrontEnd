import { boolean, object, ObjectSchema, string } from "yup";

import { PermissionFormValues } from "@/interfaces/model/permission.type";

const permissionFormValuesSchema: ObjectSchema<PermissionFormValues> = object({
  name: string()
    .required("Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  display_name: string()
    .required("Display name is required")
    .max(100, "Display name cannot exceed 100 characters"),
  description: string()
    .nullable()
    .default(null)
    .max(255, "Description cannot exceed 255 characters"),
  is_active: boolean().default(false),
});

export default permissionFormValuesSchema;
