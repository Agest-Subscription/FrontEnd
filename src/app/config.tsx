"use client";
import React, { useEffect } from "react";
import { getSession, SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import { initHttpClient } from "@/config/axios/interceptor";
import { QueryClientProvider } from "@/HOC/QueryClientProvider";
import { ReduxProvider } from "@/redux/provider";

export const getAccessToken = async () => {
  const session = await getSession();
  return session?.user.accessToken || null;
};

const InitializeHttpClient: React.FC = () => {
  useEffect(() => {
    initHttpClient(getAccessToken);
  }, []);

  return null;
};
const Config: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider>
      <ReduxProvider>
        <AntdRegistry>
          <SessionProvider>
            <InitializeHttpClient />
            {children}
          </SessionProvider>
        </AntdRegistry>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default Config;
