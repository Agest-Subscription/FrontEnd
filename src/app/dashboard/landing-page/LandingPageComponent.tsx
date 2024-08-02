import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Flex, Form, FormInstance, FormListFieldData, Select } from "antd";

import { useGetPricingPlanGroupByPeriod } from "@/hooks/landingPage";

interface LandingPageComponentProps {
  form: FormInstance<any>;
  field: FormListFieldData;
  remove: (index: number | number[]) => void;
  data: any;
  selectedPeriods: string[];
  onPeriodChange: (value: string) => void;
}

const LandingPageComponent: React.FC<LandingPageComponentProps> = ({
  form,
  field,
  remove,
  data,
  selectedPeriods,
  onPeriodChange,
}) => {
  const pricingPlanGroupByPeriod = useGetPricingPlanGroupByPeriod();
  const mappedPricingPlanGroupByPeriod =
    pricingPlanGroupByPeriod?.data?.map((plan) => ({
      value: plan.recurrence_period,
      label: plan.recurrence_period,
    })) ?? [];

  const [disabledFields, setDisabledFields] = useState(true);
  const [filteredPlans, setFilteredPlans] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState({
    basic: null,
    pro: null,
    premium: null,
  });

  useEffect(() => {
    const period = form.getFieldValue([field.name, "period"]);
    setDisabledFields(!period);

    const initialBasic = form.getFieldValue([field.name, "basic"]);
    const initialPro = form.getFieldValue([field.name, "pro"]);
    const initialPremium = form.getFieldValue([field.name, "premium"]);

    setSelectedValues({
      basic: initialBasic,
      pro: initialPro,
      premium: initialPremium,
    });

    if (period) {
      const selectedPeriodPlans =
        pricingPlanGroupByPeriod?.data?.find(
          (plan) => plan.recurrence_period === period,
        )?.pricing_plans || [];
      setFilteredPlans(selectedPeriodPlans);
    }
  }, [form, field.name, pricingPlanGroupByPeriod]);

  const handlePeriodChange = (value: string) => {
    setDisabledFields(!value);
    const selectedPeriodPlans =
      pricingPlanGroupByPeriod?.data?.find(
        (plan) => plan.recurrence_period === value,
      )?.pricing_plans || [];
    setFilteredPlans(selectedPeriodPlans);

    setSelectedValues({
      basic: null,
      pro: null,
      premium: null,
    });

    form.setFieldsValue({
      [field.name]: {
        ...form.getFieldValue(field.name),
        basic: null,
        pro: null,
        premium: null,
      },
    });

    onPeriodChange(value);
  };

  const mapPlansToOptions = (plans: any[]) => {
    return plans.map((plan) => ({
      value: plan.id,
      label: plan.name,
    }));
  };

  const filterSelectedOptions = (
    plans: any[],
    selectedValue: number | null,
  ) => {
    return plans.filter((plan) => plan.id !== selectedValue);
  };

  const filteredPeriodOptions = mappedPricingPlanGroupByPeriod.filter(
    (option) => !selectedPeriods.includes(option.value),
  );

  return (
    <Flex gap={24} style={{ width: "100%" }} vertical key={field.key}>
      <Flex justify="space-between" align="center">
        <Form.Item
          style={{ paddingTop: "24px" }}
          {...field}
          label="Period"
          name={[field.name, "period"]}
          rules={[{ required: true, message: "Please select a period" }]}
        >
          <Select
            style={{ width: 200 }}
            onChange={handlePeriodChange}
            options={filteredPeriodOptions}
            allowClear
          />
        </Form.Item>
        <div style={{ width: 16, height: 18 }}>
          <DeleteOutlined
            style={{ fontSize: 18, color: "#263e56" }}
            onClick={() => remove(field.name)}
          />
        </div>
      </Flex>
      <Flex gap={24}>
        <Form.Item {...field} label="Basic" name={[field.name, "basic"]}>
          <Select
            style={{ width: 200 }}
            disabled={disabledFields}
            value={selectedValues.basic}
            options={mapPlansToOptions(
              filterSelectedOptions(filteredPlans, selectedValues.pro).filter(
                (plan) => plan.id !== selectedValues.premium,
              ),
            )}
            onChange={(value) => {
              setSelectedValues((prev) => ({ ...prev, basic: value }));
              form.setFieldValue([field.name, "basic"], value);
            }}
            allowClear
          />
        </Form.Item>
        <Form.Item {...field} label="Pro" name={[field.name, "pro"]}>
          <Select
            style={{ width: 200 }}
            disabled={disabledFields}
            value={selectedValues.pro}
            options={mapPlansToOptions(
              filterSelectedOptions(filteredPlans, selectedValues.basic).filter(
                (plan) => plan.id !== selectedValues.premium,
              ),
            )}
            onChange={(value) => {
              setSelectedValues((prev) => ({ ...prev, pro: value }));
              form.setFieldValue([field.name, "pro"], value);
            }}
            allowClear
          />
        </Form.Item>
        <Form.Item {...field} label="Premium" name={[field.name, "premium"]}>
          <Select
            style={{ width: 200 }}
            disabled={disabledFields}
            value={selectedValues.premium}
            options={mapPlansToOptions(
              filterSelectedOptions(filteredPlans, selectedValues.basic).filter(
                (plan) => plan.id !== selectedValues.pro,
              ),
            )}
            onChange={(value) => {
              setSelectedValues((prev) => ({ ...prev, premium: value }));
              form.setFieldValue([field.name, "premium"], value);
            }}
            allowClear
          />
        </Form.Item>
      </Flex>
    </Flex>
  );
};

export default LandingPageComponent;
