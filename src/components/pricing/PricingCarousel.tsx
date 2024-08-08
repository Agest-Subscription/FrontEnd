"use client";
import React, { useEffect, useRef, useState } from "react";
import { Flex } from "antd";
import styled, { css, keyframes } from "styled-components";

import PricingCard from "./PricingCard";

import { LandingPage } from "@/interfaces/model/landingPage.type";

type Props = {
  PricingList: LandingPage[];
  pricingPeriod: string;
};

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

const AnimatedFlex = styled(Flex)<{ animate: boolean }>`
  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 1s ease-in-out forwards;
    `}
`;

const PricingCarousel = ({ PricingList, pricingPeriod }: Props) => {
  const [mapPeriod, setMapPeriod] = useState<LandingPage[]>([]);
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
      (plan) => plan.pricing_plan.recurrence_period === pricingPeriod,
    );

    if (filterList.length === 3) {
      const premiumIndex = filterList.findIndex(
        (item) => item.priority === "premium",
      );

      if (premiumIndex !== -1) {
        const [premiumItem] = filterList.splice(premiumIndex, 1);
        filterList.splice(1, 0, premiumItem);
      }
    }

    setMapPeriod(filterList);
    setAnimate(true);
    setAnimate(false);
  }, [pricingPeriod, PricingList]);

  return (
    <div ref={containerRef}>
      <AnimatedFlex animate={animate}>
        <Flex justify={"center"} align={"center"}>
          {mapPeriod.map((plan) =>
            plan.priority === "premium" ? (
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
