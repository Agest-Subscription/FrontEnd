import { ObjectSchema, object } from "yup";
import { string, number, boolean } from "yup";
// testschema for yup
export type Test = {
  firstName: string;
  lastName: string;
};
export type testType = {
  name: Test;
  age: number;
  isStudent: boolean;
};
export const testschema: ObjectSchema<testType> = object({
  name: string().required("requried name").default(null),

  age: number().required("requried age"),
  isStudent: boolean().required("312").default(false),
});
