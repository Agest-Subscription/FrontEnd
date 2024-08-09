import { boolean, object, ObjectSchema, string } from "yup";

import { UserFormValues } from "@/interfaces/model/user";

const userFormValuesSchema: ObjectSchema<UserFormValues> = object({
  email: string().required("Email is required"),
  password: string().required("Password is required"),
  is_admin: boolean().default(false),
  is_active: boolean().default(true),
});

export default userFormValuesSchema;
