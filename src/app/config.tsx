import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider as AntdConfigProvider } from "antd";

import themeCustom from "@/config/theme/themeConfig";
import { ReduxProvider } from "@/redux/provider";
type Props = {};

const Config: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ReduxProvider>
    <AntdRegistry>
      <AntdConfigProvider theme={themeCustom}>{children}</AntdConfigProvider>
    </AntdRegistry>
  </ReduxProvider>
);

export default Config;
