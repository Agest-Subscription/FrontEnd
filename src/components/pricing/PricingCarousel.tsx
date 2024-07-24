"use client";
import React, { useEffect, useRef, useState } from "react";
import { Flex } from "antd";
import styled, { css, keyframes } from "styled-components";

import PricingCard from "./PricingCard";

import { PricingPlan } from "@/interfaces/model/pricingplan.type";

type Props = {
  PricingList: PricingPlan[];
  pricingPeriod: string;
};

// Step 1: Define keyframes for animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

//Create a styled component with conditional animation
const AnimatedFlex = styled(Flex)<{ animate: boolean }>`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 1s ease-in-out forwards;
    `}
`;

const PricingCarousel = ({ PricingList, pricingPeriod }: Props) => {
  const [mapPeriod, setMapPeriod] = useState<PricingPlan[]>([]);
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0 },
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [pricingPeriod]);

  useEffect(() => {
    const filterList = PricingList.filter(
      (plan) => plan.recurrence_fee_name === pricingPeriod,
    );
    setMapPeriod(filterList);
    setAnimate(true);
    setAnimate(false);
  }, [pricingPeriod, PricingList]);

  return (
    <div ref={containerRef}>
      <AnimatedFlex animate={animate}>
        <Flex justify={"center"} align={"center"}>
          {mapPeriod.map((plan) =>
            plan.name === "Premium" ? (
              <PricingCard isPrimary key={plan.id} PricingPlan={plan} />
            ) : (
              <PricingCard key={plan.id} PricingPlan={plan} />
            ),
          )}
        </Flex>
      </AnimatedFlex>
    </div>
  );
};

export default PricingCarousel;
