"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button, Flex, Layout, MenuProps, Spin, theme, Typography } from "antd";

import MenuCustom from "@/components/Menu/MenuCustom";
import { axiosClient } from "@/config/axios/client";
import {
  FEATURES,
  FEES,
  OVERRATE_FEE,
  PERMISSIONS,
  PRICING_PlANS,
  SUBSCRIPTIONS,
  USERS,
} from "@/constants/routes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserMe } from "@/redux/Me/slice";

const { Content } = Layout;

const DashboardLayout: FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { dataMe } = useAppSelector((state) => state.getMeReducer);
  const dispatch = useAppDispatch();
  const urlParams = usePathname();

  const getMeApi = useCallback(() => {
    const actionAsync = getUserMe();
    dispatch(actionAsync);
  }, [dispatch]);

  useEffect(() => {
    getMeApi();
  }, [getMeApi]);

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
          <Link href={OVERRATE_FEE}>Overrate Fee</Link>
        </>
      ),
      key: OVERRATE_FEE,
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
            Subscription, Hi {dataMe?.email || <Spin spinning={true}></Spin>}
          </Typography>

          <Button
            type="primary"
            onClick={() => {
              axiosClient.delete("/auth/logout");
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
