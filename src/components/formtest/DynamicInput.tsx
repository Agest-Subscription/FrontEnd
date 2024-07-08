// components/DynamicInput.js
import React from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import { Checkbox, DatePicker, Input, InputNumber, Select } from "antd";
import styled from "styled-components";

const { Option } = Select;
type InputProp = {
  name: string;
  label: string;
  type?: "date" | "number" | "select" | "text" | "checkbox";
  options?: any[];
  style?: React.CSSProperties;
  id?: number;
};

type InputPropV2<T> = {
  name: keyof T;
  label: string;
  type?: "date" | "number" | "select" | "text" | "checkbox";
  options?: any[];
  style?: React.CSSProperties;
  id?: number;
};
const DatePickerField = ({ name, label, style }: InputProp) => (
  <div style={style}>
    <label>{label}</label>
    <Controller name={name} render={({ field }) => <DatePicker {...field} />} />
  </div>
);

const NumberInputField = ({ name, label, style }: InputProp) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <div style={style}>
      <label>{label}</label>
      <Controller
        name={name}
        render={({ field }) => <InputNumber {...field} />}
      />
      <p style={{ color: "red" }}>{errors[name]?.message as string}</p>
    </div>
  );
};
const TextInputField = ({ name, label, style }: InputProp) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <div style={style}>
      <label>{label}</label>
      <Controller name={name} render={({ field }) => <Input {...field} />} />
      <p style={{ color: "red" }}>{errors[name]?.message as string}</p>
    </div>
  );
};
const CheckBoxField = ({ name, label, style }: InputProp) => (
  <div style={style}>
    <Controller
      name={name}
      render={({ field }) => (
        <Checkbox {...field} checked={field.value}>
          {label}
        </Checkbox>
      )}
    />
  </div>
);

const SelectField = ({ name, label, options, style }: InputProp) => (
  <div style={style}>
    <label>{label}</label>
    <Controller
      name={name}
      render={({ field }) => (
        <Select {...field}>
          {options?.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      )}
    />
  </div>
);

const DynamicInput = ({ type, name, label, options, style }: InputProp) => {
  switch (type) {
    case "date":
      return <DatePickerField name={name} label={label} style={style} />;
    case "number":
      return <NumberInputField name={name} label={label} style={style} />;
    case "text":
      return <TextInputField name={name} label={label} style={style} />;
    case "checkbox":
      return <CheckBoxField name={name} label={label} style={style} />;
    case "select":
      return (
        <SelectField
          name={name}
          label={label}
          options={options}
          style={style}
        />
      );
    default:
      return null;
  }
};

export default DynamicInput;
