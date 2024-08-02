import React, { useEffect, useState } from "react";
import { Form } from "antd";

import LandingPageComponent from "./LandingPageComponent";

import { useGetListLandingPage } from "@/hooks/landingPage";

interface Props {
  onSave: (items: PricingItem[]) => void;
}

interface PricingItem {
  period: string;
  basic: string;
  pro: string;
  premium: string;
}

const LandingPageForm: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const { data: initialData } = useGetListLandingPage({ page_size: 12 });

  const transformData = (data: any) => {
    const periodMap = new Map<string, any>();

    data.forEach((item: any) => {
      const period = item.pricing_plan.recurrence_period;
      const priority = item.priority;

      if (!periodMap.has(period)) {
        periodMap.set(period, {
          period,
          basic: null,
          pro: null,
          premium: null,
        });
      }

      const periodData = periodMap.get(period);
      periodData[priority] = item.pricing_plan.id;
    });

    return Array.from(periodMap.values());
  };

  const initialValues = {
    items: transformData(initialData?.data ?? []),
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
    setSelectedPeriods(initialValues.items.map((item: any) => item.period));
  }, [initialData, form]);

  const handlePeriodChange = (index: number, value: string) => {
    setSelectedPeriods((prev) => {
      const newPeriods = [...prev];
      newPeriods[index] = value;
      return newPeriods.filter((period) => period);
    });
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#F3F4F6", padding: "16px" }}>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <LandingPageComponent
                form={form}
                field={field}
                key={field.key}
                remove={remove}
                data={initialValues.items}
                selectedPeriods={selectedPeriods}
                onPeriodChange={(value) => handlePeriodChange(index, value)}
              />
            ))}
            {fields.length < 4 && (
              <div
                style={{
                  padding: "24px 0px 0px 0px",
                  display: "inline-block",
                  color: "#379AE6",
                  fontSize: "14px",
                  lineHeight: "22px",
                  cursor: "pointer",
                }}
                onClick={() => add()}
              >
                + Add more
              </div>
            )}
          </>
        )}
      </Form.List>
    </div>
  );
};

export default LandingPageForm;
