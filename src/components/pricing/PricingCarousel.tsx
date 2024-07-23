import React from "react";
import { Flex } from "antd";

import PricingCard from "./PricingCard";

import { PricingPlan } from "@/interfaces/model/pricingplan.type";

type Props = {
  PricingList: PricingPlan[];
};

const PricingCarousel = ({ PricingList }: Props) => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      style={{ minHeight: "0px", minWidth: "0px" }}
    >
      {PricingList.map((plan) =>
        plan.name === "Premium" ? (
          <PricingCard isPrimary key={plan.id} PricingPlan={plan} />
        ) : (
          <PricingCard key={plan.id} PricingPlan={plan} />
        ),
      )}
    </Flex>
  );
};

export default PricingCarousel;
