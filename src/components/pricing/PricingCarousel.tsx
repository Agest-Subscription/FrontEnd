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

function convertToSmallestPeriod(
  pricingList: LandingPage[],
  smallestPeriod: string,
): LandingPage[] {
  const [smallestAmount, smallestUnit] = smallestPeriod.split(" ");
  const smallestDays = convertToDays(parseInt(smallestAmount), smallestUnit);

  return pricingList.map((item) => {
    const { recurrence_period, recurrence_fee } = item.pricing_plan;
    const [amount, unit] = recurrence_period.split(" ");
    const numericAmount = parseInt(amount);
    const daysInPeriod = convertToDays(numericAmount, unit);

    const conversionFactor = smallestDays / daysInPeriod;
    const convertedPrice = recurrence_fee.price * conversionFactor;

    return {
      ...item,
      pricing_plan: {
        ...item.pricing_plan,
        recurrence_fee: {
          ...recurrence_fee,
          price: Number(convertedPrice.toFixed(2)),
        },
      },
    };
  });
}

function findSmallestPeriod(pricingList: LandingPage[]): string {
  let smallestDays = Infinity;
  let smallestPeriod = "";

  pricingList.forEach((item) => {
    const [amount, unit] = item.pricing_plan.recurrence_period.split(" ");
    const days = convertToDays(parseInt(amount), unit);
    if (days < smallestDays) {
      smallestDays = days;
      smallestPeriod = item.pricing_plan.recurrence_period;
    }
  });

  return smallestPeriod;
}

function convertToDays(amount: number, unit: string): number {
  switch (unit) {
    case "day":
      return amount;
    case "week":
      return amount * 7;
    case "month":
      return amount * 30;
    case "year":
      return amount * 365;
    default:
      return 0;
  }
}

const PricingCarousel = ({ PricingList, pricingPeriod }: Props) => {
  const [mapPeriod, setMapPeriod] = useState<LandingPage[]>([]);
  const [smallestPeriod, setSmallestPeriod] = useState("");
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
    const smallestPeriod = findSmallestPeriod(PricingList);
    const PricingListConvert = convertToSmallestPeriod(
      PricingList,
      smallestPeriod,
    );
    const filterList = PricingListConvert.filter(
      (plan) => plan.pricing_plan.recurrence_period === pricingPeriod,
    );

    const priorities = ["basic", "pro", "premium"];

    const sortPlans = (plans: { priority: string }[]) => {
      if (plans.length === 3) {
        const basic = plans.find((plan) => plan.priority === "basic");
        const premium = plans.find((plan) => plan.priority === "premium");
        const pro = plans.find((plan) => plan.priority === "pro");
        return [basic, premium, pro].filter(Boolean);
      } else {
        return plans.sort(
          (a, b) =>
            priorities.indexOf(a.priority) - priorities.indexOf(b.priority),
        );
      }
    };

    const sortedList =
      (sortPlans(filterList)?.filter(Boolean) as LandingPage[]) || [];

    setMapPeriod(sortedList);
    setSmallestPeriod(smallestPeriod);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 0);
  }, [pricingPeriod, PricingList]);

  return (
    <div ref={containerRef}>
      <AnimatedFlex animate={animate}>
        <Flex justify={"center"} align={"center"}>
          {mapPeriod.map((plan) => {
            if (plan.priority === "premium") {
              return (
                <PricingCard
                  isPrimary
                  key={plan.id}
                  PricingPlan={plan}
                  smallestPeriod={smallestPeriod}
                />
              );
            } else if (mapPeriod.length === 1) {
              return (
                <PricingCard
                  isPrimary
                  key={plan.id}
                  PricingPlan={plan}
                  smallestPeriod={smallestPeriod}
                />
              );
            } else if (mapPeriod.length === 2 && plan.priority === "pro") {
              return (
                <PricingCard
                  isPrimary
                  key={plan.id}
                  PricingPlan={plan}
                  smallestPeriod={smallestPeriod}
                />
              );
            } else {
              return (
                <PricingCard
                  key={plan.id}
                  PricingPlan={plan}
                  smallestPeriod={smallestPeriod}
                />
              );
            }
          })}
        </Flex>
      </AnimatedFlex>
    </div>
  );
};

export default PricingCarousel;
