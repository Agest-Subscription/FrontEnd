import { array, object, ObjectSchema, string } from "yup";

import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";

const landingPageFormValuesSchema: ObjectSchema<LandingPageFormValues> = object(
  {
    landing_page_items: array()
      .of(
        object({
          period: string().required("Period is required"),
          basic_plan_id: string().nullable().default(null),
          pro_plan_id: string().nullable().default(null),
          premium_plan_id: string().nullable().default(null),
        }).test(
          "at-least-one-plan",
          "At least one plan must be selected",
          (item) =>
            !!item.basic_plan_id ||
            !!item.pro_plan_id ||
            !!item.premium_plan_id,
        ),
      )
      .required("At least one landing page item is required"),
  },
);

export default landingPageFormValuesSchema;
