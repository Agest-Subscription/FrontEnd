import themeCustom from "@/config/theme/themeConfig";
import { ConfigProvider as AntdConfigProvider } from "antd";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
type Props = {};

const Config: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AntdRegistry>
    <AntdConfigProvider theme={themeCustom}>{children}</AntdConfigProvider>
  </AntdRegistry>
);

export default Config;
