"use client";
import React, { useEffect } from "react";
import { getSession, SessionProvider } from "next-auth/react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import { initHttpClient } from "@/config/axios/interceptor";
import { QueryClientProvider } from "@/HOC/QueryClientProvider";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { ReduxProvider } from "@/redux/provider";

export const getAccessToken = async () => {
  const session = await getSession();
  return session?.user.accessToken || null;
};

export const InitializeHttpClient = () => {
  const refreshToken = useRefreshToken();

  initHttpClient(getAccessToken, refreshToken);
};
const Config: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    InitializeHttpClient();
  }, []);
  return (
    <QueryClientProvider>
      <ReduxProvider>
        <AntdRegistry>
          <SessionProvider>{children}</SessionProvider>
        </AntdRegistry>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default Config;
