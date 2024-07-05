import React, { CSSProperties, useMemo } from "react";
import { Flex } from "antd";

type Props = {
  amount: number;
  suffix?: string;
  prefix?: string;
  style?: CSSProperties;
};

const Currency: React.FC<Props> = ({ amount, prefix, style, suffix }) => {
  const transformedAmount = useMemo(() => {
    let result = amount;
    let unit = "";
    if (amount < 1000000000 && amount >= 1000000) {
      result = +(amount / 1000000).toFixed(2);
      unit = "M";
    }
    if (amount >= 1000000000) {
      result = +(amount / 1000000000).toFixed(2);
      unit = "B";
    }

    return `${result?.toLocaleString("en-US")} ${unit}`;
  }, [amount]);
  return (
    <Flex style={style}>
      <div>{prefix && prefix}</div>
      <div>{transformedAmount}</div>
      <div>{suffix && suffix}</div>
    </Flex>
  );
};

export default Currency;
