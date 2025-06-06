import React, { CSSProperties, FC } from "react";
import { Button } from "antd";
import styled from "styled-components";

import { capitalize } from "../../utils/string";

type ButtonProps = {
  title?: string;
  customSize?: "small" | "normal" | "medium" | "large";
  customType?: "primary" | "danger" | "secondary" | "cancel";
  customDisabled?: boolean;
  customBackgroundColor?: string;
} & React.ComponentProps<typeof Button>;

const hoverColor = {
  primary: "#0f78b3",
  secondary: "#b27945",
  danger: "#b11c1c",
  cancel: "#FFFFFFF",
};

const activeColor = {
  primary: "#0b69a3",
  secondary: "#8a5c19",
  danger: "#8a1c1c",
  cancel: "#FFFFFFF",
};

const baseButtonStyle: CSSProperties = {
  width: "fit-content",
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "22.4px",
  color: "#F5F5F5",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  borderRadius: 4,
};

const getButtonStyle = (
  size: string,
  type: string,
  customDisabled: boolean,
  customBackgroundColor?: string,
): CSSProperties => {
  const buttonStyle: CSSProperties = { ...baseButtonStyle };

  buttonStyle.backgroundColor =
    customBackgroundColor ||
    (customDisabled
      ? {
          primary: "#AFD7F5",
          danger: "#f5afaf",
          secondary: "#f7c394",
          cancel: "#FFFFFF",
        }[type]
      : {
          primary: "#2F80ED",
          danger: "#f33f34",
          secondary: "#F2994A",
          cancel: "#FFFFFF",
        }[type]);

  switch (size) {
    case "small":
      buttonStyle.fontSize = 14;
      buttonStyle.lineHeight = "19.6px";
      break;
    case "normal":
      buttonStyle.fontSize = 16;
      buttonStyle.lineHeight = "22.4px";
      break;
    case "medium":
      buttonStyle.fontSize = 18;
      buttonStyle.lineHeight = "25.2px";
      break;
    case "large":
      buttonStyle.fontSize = 20;
      buttonStyle.lineHeight = "28px";
      break;
    default:
      buttonStyle.fontSize = 16;
      buttonStyle.lineHeight = "22.4px";
      break;
  }
  buttonStyle.padding = `${buttonStyle.fontSize * 1.25}px ${buttonStyle.fontSize * 1.5}px`;
  if (type === "cancel") {
    buttonStyle.color = "#9095A1";
    buttonStyle.border = "1px solid #9095A1";
  }
  return buttonStyle;
};

const CustomButton: FC<ButtonProps> = ({
  children,
  title,
  customSize = "normal",
  customType = "primary",
  customDisabled = false,
  customBackgroundColor,
  style,
  ...props
}) => {
  return (
    <Button
      type="primary"
      style={{
        ...getButtonStyle(
          customSize,
          customType,
          customDisabled,
          customBackgroundColor,
        ),
        ...style,
      }}
      disabled={customDisabled}
      {...props}
    >
      {title ? capitalize(title) : children}
    </Button>
  );
};

const StyledButton = styled(CustomButton)<ButtonProps>`
  &:hover {
    background-color: ${(props) =>
      !props.customDisabled
        ? hoverColor[props.customType ?? "primary"]
        : ""} !important;
  }
  &:active {
    background-color: ${(props) =>
      !props.customDisabled
        ? activeColor[props.customType ?? "primary"]
        : ""} !important;
  }
`;

const ButtonV1: FC<ButtonProps> = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export default ButtonV1;
