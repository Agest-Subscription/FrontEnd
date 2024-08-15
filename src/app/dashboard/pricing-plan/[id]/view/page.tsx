"use client";
import React from "react";

import { Checkbox, Col, Flex, Row, Typography } from "antd";
import NotFound from "@/app/not-found";
import { DATE_FORMAT } from "@/constants/date";
import dayjs from "dayjs";
import { useGoToDashboardTab } from "@/utils/navigate";
import { capitalize, formatDuration } from "@/utils/string";
import { useGetPricingPlanById } from "@/hooks/pricingPlan";
import { usePathname } from "next/navigation";
import PricingPlanFeaturesView from "./PricingPlanFeaturesView";

type Props = {};

const Page: React.FC<Props> = () => {
  const goToPricingPlan = useGoToDashboardTab("pricing-plan");
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[segments.length - 2];

  const { data: PricingPlan, isError } = useGetPricingPlanById(id);

  if (isError) {
    return <NotFound previousPage="pricing-plan" />;
  }

  return (
    <Flex vertical gap={24}>
      <Typography style={{ fontSize: 24, fontWeight: 600, color: "#2F80ED" }}>
        {capitalize("Pricing plan Detail")}
      </Typography>
      <Flex gap={24} style={{margin: 40, padding: 40, borderStyle: 'solid'}} vertical>
        <Flex justify="space-between">
          <p><b>Name:</b> {PricingPlan?.name}</p>
          <p><b>Recurrence fee name:</b> {PricingPlan?.recurrence_fee?.name}</p>
          <p><b>Recurrence fee:</b> ${PricingPlan?.recurrence_fee?.price}/
          {formatDuration(PricingPlan?.recurrence_period ?? "")}</p>
          <p><b>Start date:</b> {dayjs(PricingPlan?.start_date).format(DATE_FORMAT)}</p>
          <p><b>End date:</b> {dayjs(PricingPlan?.end_date).format(DATE_FORMAT)}</p>
        </Flex>
        <div>
          <b>Description:</b> 
          {PricingPlan?.description? " "+PricingPlan?.description : " No description"}
        </div>
        <Row gutter={30}>
          <Col span={5}><Checkbox checked={PricingPlan?.has_free_trial}>Has Free trial</Checkbox></Col>
          <Col span={5}><b>Free trial period:</b> {PricingPlan?.free_trial_period ?? "None"}</Col>
          <Col span={8}><b>Free trial cycle count:</b> {PricingPlan?.free_trial_period_count ?? "None"}</Col>
        </Row>
        <Checkbox checked={PricingPlan?.has_free_trial}>Active</Checkbox>
        <PricingPlanFeaturesView FeaturePlanList={PricingPlan?.feature_plan_fees ?? null} />
      </Flex>
    </Flex>
  );
};

export default Page;

