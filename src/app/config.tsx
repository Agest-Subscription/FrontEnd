import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import { QueryClientProvider } from "@/HOC/QueryClientProvider";
import { ReduxProvider } from "@/redux/provider";

const Config: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider>
    <ReduxProvider>
      <AntdRegistry>{children}</AntdRegistry>
    </ReduxProvider>
  </QueryClientProvider>
);

export default Config;
