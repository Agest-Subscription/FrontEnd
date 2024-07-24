"use client";

import { getSession, signOut, useSession } from "next-auth/react";

import { axiosClient } from "@/config/axios/client";

const UseRefreshToken = () => {
  console.log("trigger useRefreshToken");
  const { data: session } = useSession();

  console.log("session?.user?.accessToken: ", session);

  const refreshToken = async () => {
    try {
      // Fetch the latest session to ensure up-to-date tokens
      const currentSession = await getSession();

      console.log(
        "currentSession?.user?.accessToken in try block: ",
        currentSession?.user?.accessToken as string,
      );

      const res = await axiosClient.post("/auth/refresh", {
        access_token: currentSession?.user?.accessToken.toString(),
        refresh_token: currentSession?.user?.refreshToken.toString(),
      });
      console.log("res refresh: ", res?.data);
      // console.log("currentSession: ", currentSession?.user?.accessToken);

      if (session) session.user.accessToken = res?.data?.access_token;
      console.log("session: ", session);
    } catch (error) {
      console.error("Failed to refresh token, signing out...", error);
      signOut();
    }
  };
  return refreshToken;
};
export default UseRefreshToken;
