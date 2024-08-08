"use client";

import React, { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { ConfigProvider, Radio, Spin, Typography } from "antd";
import Flex from "antd/lib/flex";
import styled from "styled-components";

import PricingCarousel from "@/components/pricing/PricingCarousel";
import { useGetListLandingPage } from "@/hooks/landingPage";
import { capitalize } from "@/utils/string";

const CustomRadio = styled(Radio.Group)`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-radio-button-wrapper {
    height: 44px;
    min-width: 113px;
    border-radius: 8px !important;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
    }

    &::before {
      content: none;
    }
  }
`;

const LandingPage = () => {
  const params = {
    page_size: 12,
  };

  const {
    data: landingPage,
    isError,
    isLoading,
  } = useGetListLandingPage(params);

  const [options, setOption] = useState<{ label: string; value: string }[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (landingPage?.data) {
      const recurrencePeriods = Array.from(
        new Set(
          landingPage.data.map((item) => item.pricing_plan.recurrence_period),
        ),
      );

      const labelMapping: { [key: string]: string } = {
        "1 day": "Daily",
        "1 week": "Weekly",
        "1 month": "Monthly",
        "1 year": "Yearly",
      };

      const options = recurrencePeriods.map((period) => ({
        label: labelMapping[period] || capitalize(period + "s"),
        value: period,
      }));

      setOption(options);
      setValue(options[0]?.value || "");
    }
  }, [landingPage]);

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
  };

  return (
    <Spin spinning={isLoading}>
      <Flex vertical align="center" style={{ padding: "3rem" }}>
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
          {capitalize(
            "Select the plan that best fits your needs and start enjoying our features!",
          )}
        </Typography>
        <br />
        {(isError || landingPage?.data.length === 0) && !isLoading ? (
          <p
            style={{
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "68px",
              color: "#008AD9",
              paddingTop: "12rem",
            }}
          >
            Coming soon!
          </p>
        ) : (
          <>
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
                <CustomRadio
                  options={options}
                  value={value}
                  onChange={onChange}
                  optionType="button"
                />
              </ConfigProvider>
            </Flex>
            <br />
            <PricingCarousel
              PricingList={landingPage?.data ?? []}
              pricingPeriod={value}
            />
          </>
        )}
      </Flex>
    </Spin>
  );
};

export default LandingPage;
