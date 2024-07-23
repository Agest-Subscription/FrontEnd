import React from "react";
import { PricingPlan } from "@/interfaces/model/pricingplan.type";
import PricingCard from "./PricingCard";
import { Flex } from "antd";

type Props = {
    PricingList: PricingPlan[];
};

const PricingCarousel = ({ PricingList }: Props) => {

    return (
        <Flex justify={"center"} align={"center"} style={{ minHeight: '0px', minWidth: '0px' }}>
            {PricingList.map((plan) =>
                plan.name === "Premium" ? (
                    <PricingCard isPrimary key={plan.id} PricingPlan={plan} />
                ) : (
                    <PricingCard key={plan.id} PricingPlan={plan} />
                ),
            )}
        </Flex>
    )
}

export default PricingCarousel;