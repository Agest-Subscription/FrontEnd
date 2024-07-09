import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider as AntdConfigProvider } from "antd";

import themeCustom from "@/config/theme/themeConfig";
import { ReduxProvider } from "@/redux/provider";
import { QueryClientProvider } from "@/HOC/QueryClientProvider";
type Props = {};

const Config: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider>
    <ReduxProvider>
      <AntdRegistry>
        <AntdConfigProvider theme={themeCustom}>{children}</AntdConfigProvider>
      </AntdRegistry>
    </ReduxProvider>
  </QueryClientProvider>
);

export default Config;
