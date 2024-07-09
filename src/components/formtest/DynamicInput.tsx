// components/DynamicInput.js
import React, { ReactNode, useMemo } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  InputProps,
  Select,
} from "antd";
import { FormItemProps as AntdFormItemProps } from "antd";

import { includeIndexToName } from "@/utils/form";
const { Option } = Select;

export type FormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<AntdFormItemProps, "name"> &
  InputPropV2 & {
    render: (
      props: Omit<ControllerRenderProps<TFieldValues, TName>, "ref">,
    ) => ReactNode;
  };
type InputProp = {
  name: string;
  label: string;
  type?: "date" | "number" | "select" | "text" | "checkbox";
  options?: any[];
  style?: React.CSSProperties;
  id?: number;
};

type InputPropV2 = {
  name: string;
  label: string;
  type?: "date" | "number" | "select" | "text" | "checkbox";
  options?: any[];
  style?: React.CSSProperties;
  id?: number;
  index?: number[];
} & Omit<InputProps, "onChange"> & {
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement>,
      ...event: any[]
    ) => void;
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
const TextInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  style,
  index,
  ...rest
}: FormItemProps<TFieldValues, TName>) => {
  const render = rest.render;

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const finalName = useMemo(() => {
    return (
      Array.isArray(index) && index.length > 0
        ? includeIndexToName(name, index)
        : name
    ) as TName;
  }, [index, name]);
  console.log("finalName: ", finalName);

  return (
    <div style={style}>
      <label>{label}</label>
      <Controller
        name={finalName}
        control={control}
        render={({ field: { ref: _ref, ...field } }) => {
          // return <Input {...field} />;
          return <>{render(field)}</>;
        }}
      />
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

const DynamicInput = ({
  type,
  name,
  label,
  options,
  index,
  style,
  ...rest
}: InputPropV2) => {
  switch (type) {
    case "date":
      return <DatePickerField name={name} label={label} style={style} />;
    case "number":
      return <NumberInputField name={name} label={label} style={style} />;
    case "text":
      return (
        <TextInputField
          render={({ onChange, onBlur, ...field }) => {
            return <Input {...field} {...rest} />;
          }}
          name={name}
          label={label}
          style={style}
        />
      );
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
