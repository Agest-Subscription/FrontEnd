import React, { useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import LandingPageComponent from "./LandingPageComponent";

import { LandingPageItem } from "@/interfaces/model/landingPage.type";

const AddMultipleItems = () => {
  const methods = useFormContext();
  const { fields, append, remove } = useFieldArray({
    ...methods.control,
    name: "landing_page_items",
  });

  const watchedFields = useWatch({
    control: methods.control,
    name: "landing_page_items",
  });

  const usedPeriods = useMemo(() => {
    return (watchedFields || [])
      .map((field: LandingPageItem) => field?.period)
      .filter(Boolean);
  }, [watchedFields]);

  return (
    <>
      {fields.map((item, index) => (
        <LandingPageComponent
          key={item.id}
          control={methods.control}
          index={index}
          remove={remove}
          usedPeriods={usedPeriods}
        />
      ))}
      {fields.length < 4 && (
        <div
          style={{
            display: "inline-block",
            color: "#379AE6",
            fontSize: "14px",
            lineHeight: "22px",
            cursor: "pointer",
          }}
          onClick={() =>
            append({ period: "", basic: "", pro: "", premium: "" })
          }
        >
          + Add more
        </div>
      )}
    </>
  );
};

export default AddMultipleItems;
