import { array, boolean, object, ObjectSchema, string } from "yup";

import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";

const landingPageFormValuesSchema: ObjectSchema<LandingPageFormValues> = object(
  {
    landing_page_items: array(
      object({
        period: string().required(),
        basic_plan_id: string().required(),
        pro_plan_id: string().required(),
        premium_plan_id: string().required(),
      }),
    ),
  },
);

export default landingPageFormValuesSchema;
