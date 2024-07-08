import { ObjectSchema, object } from "yup";
import { string, number, boolean } from "yup";
// testschema for yup
export type testType = {
  name: string;
  age: number;
  isStudent: boolean;
};
export const testschema: ObjectSchema<testType> = object({
  name: string().required("requried name").default(null),
  age: number().required("requried age"),
  isStudent: boolean().required("312").default(false),
});
