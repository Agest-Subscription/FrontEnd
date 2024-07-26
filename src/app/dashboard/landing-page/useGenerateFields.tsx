import { useMemo } from "react";

import { FieldsData } from "@/interfaces/form";
import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";
import { capitalize } from "@/utils/string";

export const useGeneratePurchaseFields =
  (): FieldsData<LandingPageFormValues> => {
    return useMemo<FieldsData<LandingPageFormValues>>(
      () => ({
        "landing_page_items.[].period": {
          label: capitalize(""),
          type: "text",
        },
        "landing_page_items.[].basic_plan_id": {
          label: capitalize(""),
          type: "text",
        },
        "landing_page_items.[].pro_plan_id": {
          label: capitalize(""),
          type: "text",
        },
        "landing_page_items.[].premium_plan_id": {
          label: capitalize(""),
          type: "text",
        },
      }),
      [],
    );
  };
