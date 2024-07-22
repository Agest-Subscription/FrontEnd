"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button, Flex, Layout, MenuProps, theme, Typography } from "antd";

import MenuCustom from "@/components/Menu/MenuCustom";
import {
  FEATURES,
  FEE_OVERATE,
  FEES,
  PERMISSIONS,
  PRICING_PlANS,
  SUBSCRIPTIONS,
  USERS,
} from "@/constants/routes";

const { Content } = Layout;

const DashboardLayout: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const urlParams = usePathname();

  const [current, setCurrent] = useState<string>(`${urlParams}`);

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
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e.key);
    setCurrent(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", padding: "24px" }}>
      <Flex vertical gap={24}>
        <Flex justify="space-between" align="center">
          <Typography
            style={{
              color: "#2F80ED",
              fontSize: 32,
              fontWeight: 400,
            }}
          >
            Subscription
          </Typography>

          <Button
            type="primary"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        </Flex>
        <Content>
          <MenuCustom
            mode="horizontal"
            selectedKeys={[current]}
            items={items}
            onClick={onClick}
          />
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
