"use client";

import { signOut, useSession } from "next-auth/react";

import { axiosClient } from "@/config/axios/client";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axiosClient.post("/auth/refresh", {
      refresh: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
    else signOut();
  };
  return refreshToken;
};
