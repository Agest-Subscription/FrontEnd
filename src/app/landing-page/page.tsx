"use client";

import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { ConfigProvider, Flex, Radio, Typography } from "antd";

import { DummyData } from "./DummyData";

import PricingCarousel from "@/components/pricing/PricingCarousel";

const LandingPage = () => {
  const [value, setValue] = useState("Monthly");
  const Options = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Yearly", value: "Yearly" },
  ];

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
  };

  return (
    <div>
      <Flex vertical align="center">
        <Typography
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: "black",
          }}
        >
          Pricing
        </Typography>
        <Typography style={{ fontSize: 16, fontWeight: 400 }}>
          Officia exercitation quis voluptate elit consequat nostrud
        </Typography>
        <br />
        <Flex
          style={{
            backgroundColor: "#15ABFF",
            padding: "3px",
            height: "fit-content",
            borderRadius: 8,
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Radio: {
                  buttonBg: "#15ABFF",
                  buttonColor: "white",
                  borderRadius: 8,
                  colorBorder: "#15ABFF",
                },
              },
            }}
          >
            <Radio.Group
              options={Options}
              value={value}
              onChange={onChange}
              optionType="button"
            />
          </ConfigProvider>
        </Flex>

        <br />
        <PricingCarousel PricingList={DummyData} pricingPeriod={value} />
      </Flex>
    </div>
  );
};

export default LandingPage;
