import React from "react";
import { Input, InputProps, Tooltip } from "antd";
import { isNil } from "lodash";
import styled from "styled-components";

import { CommonFormItemProps, FormItem } from "./FormItem";
import { StyledInput } from "./StyleComponents";

import isTextTruncated from "@/utils/textTruncated";

// TODO: will replace the function renderValue to renderReadOnlyValue

export type TextFieldProps = CommonFormItemProps &
  Omit<InputProps, "onChange"> & {
    renderValue?: (value: any) => React.ReactNode;
    onChange?: (
      e: React.ChangeEvent<HTMLInputElement>,
      ...event: any[]
    ) => void;
  };

let TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  onChange: customChange,
  onBlur: customBlur,
  isRequired = false,
  direction,
  labelMinWidth,
  labelPosition,
  readOnly = false,
  disabled,
  renderValue,
  index,
  styleLabel = {},
  className,
  addonBefore,
  ...rest
}) => {
  return (
    <FormItem
      className={className}
      label={label}
      name={name}
      isRequired={isRequired}
      direction={direction}
      labelMinWidth={labelMinWidth}
      labelPosition={labelPosition}
      index={index}
      styleLabel={styleLabel}
      render={({ onChange, onBlur, ...field }) => {
        return (
          <Input
            onChange={(e) => {
              let value: string | number = e.target.value;
              if (rest.type === "number") {
                value = +e.target.value; // force convert to Number when type is Number
              }
              onChange(value);
              customChange?.(e, index);
            }}
            onBlur={(...e) => {
              onBlur();
              customBlur?.(...e);
            }}
            readOnly={readOnly}
            disabled={readOnly ? false : disabled}
            {...field}
            {...rest}
            className="form-textfield"
            addonBefore={addonBefore}
          />
        );
      }}
    />
  );
};

TextField = styled(TextField)`
    .form-textfield {
      color: #06417c;
    }
  }
`;

export { TextField };
