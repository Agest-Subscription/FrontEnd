"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flex, Layout, Menu, MenuProps, theme, Typography } from "antd";
import styled from "styled-components";

import {
  FEATURES,
  FEE_OVERATE,
  FEES,
  PERMISSIONS,
  PRICING_PlANS,
  SUBSCRIPTIONS,
  USERS,
} from "@/constants/routes";

const { Header, Content } = Layout;

const items = [
  {
    label: <Link href={PRICING_PlANS}>Pricing Plan</Link>,
    key: PRICING_PlANS,
  },
  {
    label: (
      <>
        <Link href={SUBSCRIPTIONS}>Subscriptions</Link>
      </>
    ),
    key: SUBSCRIPTIONS,
  },
  {
    label: (
      <>
        <Link href={FEES}>Fee</Link>
      </>
    ),
    key: FEES,
  },
  {
    label: (
      <>
        <Link href={FEE_OVERATE}>Fee Overate</Link>
      </>
    ),
    key: FEE_OVERATE,
  },
  {
    label: (
      <>
        <Link href={FEATURES}>Features</Link>
      </>
    ),
    key: FEATURES,
  },
  {
    label: (
      <>
        <Link href={PERMISSIONS}>Permissions</Link>
      </>
    ),
    key: PERMISSIONS,
  },
  {
    label: (
      <>
        <Link href={USERS}>Users</Link>
      </>
    ),
    key: USERS,
  },
];
const MenuCustom = styled(Menu)`
  &.ant-menu {
    .ant-menu-item-selected {
      background: #fff;
      color: red !important;
      display: flex;
      height: inherit;
      align-items: center;
    }
    .ant-menu-item-selected:after {
      border-bottom-color: white;
    }
  }
`;
const DashboardLayout: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const urlParams = usePathname();
  // console.log("urlParams: ", urlParams);

  const [current, setCurrent] = useState<string>(`${urlParams}`);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e.key);
    setCurrent(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Flex vertical>
        <Typography
          style={{
            color: "#2F80ED",
            fontSize: 32,
            fontWeight: 400,
          }}
        >
          Subscription
        </Typography>
        <Content style={{ padding: "0 48px" }}>
          <div
            style={{
              height: "49px",
            }}
          >
            <Header
              style={{
                display: "flex",
                alignItems: "center",
                background: "#2F80ED",
                height: "100%",
              }}
            >
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[current]}
                items={items}
                onClick={onClick}
                style={{
                  flex: 1,
                  minWidth: 0,
                  backgroundColor: "#2F80ED",
                  fontWeight: 700,
                  height: "inherit",
                  alignItems: "center",
                }}
              />
            </Header>
          </div>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Flex>
    </Layout>
  );
};

export default DashboardLayout;
