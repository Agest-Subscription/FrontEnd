"use client";

import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Flex, Radio, Typography } from "antd";

import { DummyData } from "./DummyData";

import PricingCard from "@/components/pricing/PricingCard";

const LandingPage = () => {
  const [value, setValue] = useState("Weekly");
  const Options = [
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Yearly", value: "Yearly" },
  ];

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio checked", value);
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

        <Radio.Group
          options={Options}
          value={value}
          onChange={onChange}
          optionType="button"
          buttonStyle="solid"
          style={{ padding: "25px" }}
        />

        <Flex justify={"center"} align={"center"}>
          {DummyData.map((plan) =>
            plan.name === "Premium" ? (
              <PricingCard isPrimary key={plan.id} PricingPlan={plan} />
            ) : (
              <PricingCard key={plan.id} PricingPlan={plan} />
            ),
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default LandingPage;
