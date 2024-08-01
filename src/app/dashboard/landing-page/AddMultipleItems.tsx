import * as React from "react";
import { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { Flex } from "antd";

import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { LandingPageFormValues } from "@/interfaces/model/landingPage.type";
import { LandingPageItem } from "@/interfaces/model/landingPage.type";

type LandingPageItemProps = {
  onDelete: () => void;
  index: number;
};

export const defaultLandingPageItem: LandingPageItem = {
  period: "",
  basic_plan_id: "",
  pro_plan_id: "",
  premium_plan_id: "",
};

const LandingPageItemField: FC<LandingPageItemProps> = ({
  onDelete,
  index,
}) => {
  const { FormField } = useFormWrapperCtx<LandingPageFormValues>();

  return (
    <Flex align="center" style={{ width: "100%" }}>
      <Flex
        vertical
        gap={24}
        style={{ width: "100%", backgroundColor: "#F3F4F6", padding: "16px" }}
      >
        <Flex justify="space-between">
          <FormField
            name={"landing_page_items.[].period"}
            index={[index]}
            key={index + "period"}
          />
          {
            <div
              style={{
                width: 16,
                height: 18,
              }}
            >
              <DeleteOutlined
                style={{
                  fontSize: 18,
                  color: "#263e56",
                }}
                onClick={onDelete}
              />
            </div>
          }
        </Flex>
        <Flex gap={24}>
          <FormField
            name="landing_page_items.[].basic_plan_id"
            index={[index]}
            key={index + "basic_plan_id"}
          />

          <FormField
            name="landing_page_items.[].pro_plan_id"
            index={[index]}
            key={index + "pro_plan_id"}
          />
          <FormField
            name="landing_page_items.[].premium_plan_id"
            index={[index]}
            key={index + "premium_plan_id"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default function AddMultipleItems() {
  const methods = useFormContext<LandingPageFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "landing_page_items",
  });
  const showAddMore = fields.length < 4;

  return (
    <>
      <Flex vertical gap={40}>
        {fields.map((item, index) => (
          <LandingPageItemField
            key={item.id}
            index={index}
            onDelete={() => remove(index)}
          />
        ))}

        {showAddMore && (
          <div
            style={{
              display: "inline-block",
              color: "#379AE6",
              fontSize: "14px",
              lineHeight: "22px",
              cursor: "pointer",
            }}
            onClick={() => append(defaultLandingPageItem)}
          >
            + Add more
          </div>
        )}
      </Flex>
    </>
  );
}
